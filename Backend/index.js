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
app.use(
    cors({
        origin: "https://life-developers.vercel.app/",
        credentials: true,
    })
);

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