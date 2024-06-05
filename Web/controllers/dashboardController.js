const { User } = require('../models');

exports.getDashboardData = async (req, res) => {
  try {
    const users = await User.findAll();
    const usersWithDuration = [];
    for (const user of users) {
      const session = await Session.findOne({
        attributes: ['duration_time'],
        where: { id_user: user.user_id },
      });
      console.log(session);
      user.duration_time = session ? session.duration_time.toString() : null;
      usersWithDuration.push(user);
    }
    res.render('dashboard', { users: usersWithDuration });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};