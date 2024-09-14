const express = require('express');
require("dotenv").config()

/* Configurations */
const app = express();

/* Routes */
app.get('/', (req, res) => {
  res.send('Hello from server');
})

/* Server initialization */
app.listen(process.env.SERVER_PORT, () => console.log(`Server is running on Port: ${process.env.SERVER_PORT}`));