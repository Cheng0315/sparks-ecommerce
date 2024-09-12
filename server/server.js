const express = require('express');
require("dotenv").config()

/* CONFIGURATIONS */
const app = express();

/* ROUTES */
app.get('/', (req, res) => {
  res.send('Hello from server');
})

/* Server Initialization */
app.listen(process.env.SERVER_PORT, () => console.log(`Sever is running on Port: ${process.env.SERVER_PORT}`));