const express = require('express');
const router = express.Router();
const { signUp, login, DashboardData } = require('../controllers/auth');

router.post('/signup', signUp);
router.post('/login', login);
router.get('/dashboard', DashboardData);

module.exports = router;
