const express = require('express')
require('dotenv').config()
const cors = require('cors');
var bodyParser = require("body-parser");
const connectDB = require('./config/db')


const port = process.env.port || 5000
connectDB()

const app = express()
app.use(cors());

app.use(bodyParser.json());
app.use(express.static('src'));
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(cors({
    origin: ['http://localhost:3001']
}));

app.use("/api/register", require('./routes/goalRoutes.js'));
app.use("/api/login", require('./routes/login.js'))
app.use("/api/subgrediit",require('./routes/mysg.js'))
app.use("/api/profile",require('./routes/profile'))



app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('/home');
})

app.listen(port, () => console.log(`server started `))