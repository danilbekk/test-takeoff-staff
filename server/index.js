require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/index');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);


const { PORT, DB_URL } = process.env

const start = async () => {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => {
      console.log(`Server has been started on ${PORT} `)
    });
  } catch (e) {
    console.log(e.message);
  }
};


start();