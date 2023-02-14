const express = require('express');
const app = express();

const cors = require('cors');
var corsOptions = {
	origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

//Rotas
const index = require('./routes/index');
const formRoute = require('./routes/formRoute');
const adminUserRoute = require('./routes/adminUserRoute');
const statusRoute = require('./routes/statusRoute');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', index);
app.use('/form', formRoute);
app.use('/admin', adminUserRoute)
app.use('/status', statusRoute)

module.exports = app;