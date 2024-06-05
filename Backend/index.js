const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require("./routes/auth");
const cookieParser = require('cookie-parser');
const cors = require("cors");
require('dotenv').config();

const app = express();


app.get('/',(req,res)=>{
    res.send("backend funcionando")

})
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://life-developers.vercel.app"); // URL de tu frontend en Vercel
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
    next();
  });

//app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/User', userRoutes)
// Sincroniza la base de datos
sequelize.sync().then(() => {
    console.log('Database synced');
}).catch(err => {
    console.error('Error syncing database:', err);
});



app.listen(4000, () => {
    console.log('Backend server listening on port 4000');
});