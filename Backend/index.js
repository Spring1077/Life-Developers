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

const whitelist = [
    'https://life-developers.vercel.app', // Reemplaza con la URL de tu frontend en Vercel
    'http://localhost:3000' // Mantén localhost para desarrollo local
  ];
  
  const corsOptions = {
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Permitir cookies y encabezados de autorización
  };
  
  app.use(cors(corsOptions));

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