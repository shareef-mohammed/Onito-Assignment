require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const connectdb = require('./config/connect');
const formRouter = require('./routes/formRouter');

connectdb();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/', formRouter);

app.listen(process.env.PORT, () => {
    console.log('Listening to the Server.')
})