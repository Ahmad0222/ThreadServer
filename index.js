const ConnectToMongo = require('./config/db');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
ConnectToMongo();
const app = express()
const port = 5007;
app.use(express.json())
app.use(cors());
app.use(cookieParser());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('x-auth-token', '*')
    next();
});

app.get('/', (req, res) => {
    res.send("Welcome to Threads & Treasures");
})

app.use('/uploads/images', express.static('uploads/images'));
app.use('/uploads/files', express.static('uploads/files'));
app.use('/api/user', require('./routes/user'));
app.use('/api/file', require('./routes/file'));
app.use('/api/product', require('./routes/product'));
app.use('/api/category', require('./routes/category'));
app.use('/api/brand', require('./routes/brand'));
app.use('/api/model', require('./routes/model'));


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
