const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require("./routes/auth");
const cookieParser = require('cookie-parser');
const cors = require("cors");
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'https://life-developers.vercel.app' // Solo permite solicitudes desde este origen
}));

app.use(express.json());
app.use(cookieParser());

// Define your routes
app.get('/', (req, res) => {
    res.send("backend funcionando");
});

app.use('/User', userRoutes);

// Sync the database
sequelize.sync().then(() => {
    console.log('Database synced');
}).catch(err => {
    console.error('Error syncing database:', err);
});

// Start the server
app.listen(4000, () => {
    console.log('Backend server listening on port 4000');
});
