require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const cors = require("cors");
const app = express();
const path = require('path');

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Configurar body-parser para parsear solicitudes con cuerpo de formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
;
// Routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Homepage.html'));
});

app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);
// Sync database and start the server
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
