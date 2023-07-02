const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017');


app.get('/', (req, res) => {
    res.send('Welcome');
})

app.listen(3000, () => console.log('Server Started on port 3000'));