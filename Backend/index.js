const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require("./routes/auth");
const cookieParser = require('cookie-parser');
const cors = require("cors");
require('dotenv').config();

const app = express();

// Define the whitelist
const whitelist = [
    'https://life-developers.vercel.app', // URL of your frontend in Vercel
    'http://localhost:3000' // Keep localhost for local development
];

// Configure CORS options
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies and authorization headers
};

// Apply the CORS middleware
app.use(cors(corsOptions));

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
