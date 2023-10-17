require('dotenv').config();
const express = require('express');
const cors = require('cors');

const {sequelize} = require('./models') 

const router = require('./routes/router');

const app = express();
const version = '/api/v1'

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

sequelize.authenticate().then((err) => {
    console.log('database connected')
}).catch((err) => console.log('Database not connected'+ err))

app.use(`${version}/`, router);

app.listen(process.env.SERVER_PORT, () => {console.log('Server Running')});
