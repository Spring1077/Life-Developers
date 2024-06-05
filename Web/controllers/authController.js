const jwt = require('jsonwebtoken');
const User = require('../models/user');
const path = require('path');

// Controlador de signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, birthDate, companyName, phoneNumber, termsAgreed } = req.body;

    // Lógica para crear el usuario
    const user = await User.create({
      username,
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      birth_date: birthDate,
      company: companyName,
      telephone: phoneNumber,
      terms_agreed: termsAgreed
    });
    res.status(201).json({ message: 'User created successfully', redirect: '/GameHomepage.html' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Username:', username, 'Password:', password); // Registro de los datos recibidos

    // Buscamos al usuario en la base de datos por su nombre de usuario
    const user = await User.findOne({ where: { username } });

    if (!user || user.password !== password) {
      // Renderizar nuevamente la página HTML con un mensaje de error
      return res.status(500).send('Credenciales inválidas. Inténtalo de nuevo.');
    }

    // Si las credenciales son válidas, generamos un token JWT
    const token = jwt.sign({ userId: user.user_id, username: user.username }, 'aVeryLongRandomStringWithNumbers1234567890!@#$%^&*()_+', { expiresIn: '1h' });

    // Configuramos la cookie con el token JWT
    res.cookie('token', token, { httpOnly: true });
    console.log('Token set:', token); // Registro de la configuración de la cookie

    // Redirigir al usuario a index.html después de un inicio de sesión exitoso
    if (username === 'Admin123' && password === 'Tec123') {
      return res.redirect('/leaderboard.html');
    } else {
      return res.redirect('/GameHomepage.html');
    }
  } catch (err) {
    // Manejar el error aquí
    console.error(err);
    res.status(500).send('Ha ocurrido un error en el servidor.');
  }
};

// Controlador de logout
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful', redirect: '/login.html' });
};
