require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(cors({
  origin: 'http://127.0.1:5500',
  credentials: true,
}));

app.use('/auth', authRoutes);

// Importar los modelos
const User = require('./models/user');
const Session = require('./models/session');
const Progress = require('./models/progress');
const Level = require('./models/level');

// Ruta para obtener los usuarios de la base de datos
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'leaderboard.html'));
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{
        model: Session,
        attributes: ['status_s', 'id_progress'],
        include: [{
          model: Progress,
          attributes: ['id_level'],
          include: [{
            model: Level,
            attributes: ['role']
          }]
        }]
      }]
    });

    const usersWithDetails = users.map(user => {
      let status = 'Inactivo';
      let role = 'N/A';

      if (user.Sessions.length > 0) {
        status = user.Sessions[0].status_s ? 'Activo' : 'Inactivo';
        if (user.Sessions[0].Progress && user.Sessions[0].Progress.Level) {
          role = user.Sessions[0].Progress.Level.role;
        }
      }

      return {
        ...user.toJSON(),
        status_s: status,
        role: role
      };
    });

    // Ordenar los usuarios por nivel de mayor a menor
    const rankOrder = { 'Plat': 4, 'Gold': 3, 'Silver': 2, 'Bronze': 1, 'N/A': 0 };
    usersWithDetails.sort((a, b) => rankOrder[b.role] - rankOrder[a.role]);

    res.json(usersWithDetails);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Sync database and start the server
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 5500;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
