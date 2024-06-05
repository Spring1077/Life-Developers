const User = require('../models/user');
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
  
  

