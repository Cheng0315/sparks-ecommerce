const express = require("express");
const helmet = require("helmet");
const env = require("dotenv");
const userRoutes = require("./routes/users");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const { generalRateLimiter } = require('./middleware/auth');
const corsOptions = {
  origin: [process.env.ORIGIN_SERVER],
  credentials: true
}

/* Configurations */
env.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors(corsOptions));
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(cookieParser());
app.use(generalRateLimiter);

/* Routes */
app.use("/api/users", userRoutes);

/* Server initialization */
app.listen(process.env.SERVER_PORT, () => console.log(`Server is running on Port: ${process.env.SERVER_PORT}`));