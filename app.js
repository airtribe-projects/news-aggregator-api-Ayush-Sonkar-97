require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
// console.log(process.env.PORT)
const usersRoutes = require('./routes/usersRoutes')
const mongoose = require('mongoose')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', usersRoutes)


// health check
app.get('/', (req, res) => {
    res.send(`server is running in port ${port}`);
})
// console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('connected to atlas')
    app.listen(port, (err) => {
        if (err) {
            return console.log('Something bad happened', err);
        }
        console.log(`Server is listening on ${port}`);
    });
})

module.exports = app;