const express = require('express');
const router = express.Router();
const { signUp, login, DashboardData, ProgressData, SessionData} = require('../controllers/auth');

router.post('/signup', signUp);
router.post('/login', login);
router.get('/dashboard', DashboardData);
router.post('/ProgressData', ProgressData);
router.post('/SessionData', SessionData);

module.exports = router;
