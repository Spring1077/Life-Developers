const User = require('../models/user');
const Progress = require('../models/progress');
const Session = require('../models/session');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signUp = async (req, res) => {
    const { first_name, last_name, username, birth_date, password, email, telephone, company } = req.body;
    try {
        const user = await User.create({
            first_name,
            last_name,
            username,
            birth_date,
            password,
            email,
            telephone,
            company
        });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error registering user' });
    }
};

exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log('Username:', username, 'Password:', password); // Registro de los datos recibidos
      const user = await User.findOne({ where: { username: username } });
    
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed, code 4' });
    }

    const match = await bcrypt.compare(password, user.password);
    
    if (!match) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

      
      // Si las credenciales son válidas, generamos un token JWT
      const token = jwt.sign({ userId: user.user_id, username: user.username }, 'aVeryLongRandomStringWithNumbers1234567890!@#$%^&*()_+', { expiresIn: '1h' });
      // Configuramos la cookie con el token JWT
      res.cookie('token', token, { httpOnly: true });
      console.log('Token set:', token); // Registro de la configuración de la cookie
      res.status(200).json({ message: 'Login exitoso', token });
    } catch (err) {
      // Manejar el error aquí
      console.error(err);
      res.status(500).send('Ha ocurrido un error en el servidor.');
    }
  };
  exports.DashboardData = async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ['user_id', 'first_name', 'last_name', 'username', 'birth_date', 'email', 'telephone', 'company']
      });
  
      res.json(users);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  exports.ProgressData = async (req, res) => {
    try {
      const { id_item, id_merchant, id_level, finish_date, percentage } = req.body;
  
      // Insertar los datos en la base de datos utilizando el modelo Progress
      const newProgress = await Progress.create({
        id_item,
        id_merchant,
        id_level,
        finish_date,
        percentage
      });
  
      res.json({ message: 'Datos insertados correctamente.', progress: newProgress });
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  exports.SessionData = async (req, res) => {
    try {
      const { id_user, id_progress, duration_time, start_date_time, finish_date_time, status_s } = req.body;
  
      // Insertar los datos en la base de datos utilizando el modelo Session
      const newSession = await Session.create({
        id_user,
        id_progress,
        duration_time,
        start_date_time,
        finish_date_time,
        status_s
      });
  
      res.json({ message: 'Datos de sesión insertados correctamente.', session: newSession });
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  

