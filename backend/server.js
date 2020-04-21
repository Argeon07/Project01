const express = require("express");
const connectDB = require("./config/db");
const mongoose = require('mongoose');
const app = express();

//connectDB();
mongoose.connect('mongodb+srv://hernan123:hernan123@proyect01-ve8e0.mongodb.net/test?retryWrites=true&w=majority');

app.get('/', (req, res) => res.send('API Running'));

//Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/message', require('./routes/api/message'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
