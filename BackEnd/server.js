const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json())
// Define a route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/login',  async (req, res)  => {
    const body =  req.body
    // TODO : buscar al usuario en la base de datos
    // TODO : confirmar contraseña
    if (body.username === 'admin' && body.password === 'admin'){
    res.send("logged in");
    }
    else{
        res.send('Invalid Credentials')
    }
});

app.post("/registro" , async (req, res) =>{
    // sacar el body
    // crear al usuario en la db en base al body
})


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});