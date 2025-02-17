const express = require("express");
const helmet = require("helmet");
const env = require("dotenv");
const path = require("path");
const { userRoutes, productRoutes, addressRoutes, cartRoutes } = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { generalRateLimiter } = require("./middleware/auth");
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
app.use("/public/assets", express.static(path.join(__dirname, "public/assets")));

/* Routes */
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/cart", cartRoutes);

/* Server initialization */
app.listen(process.env.SERVER_PORT, () => console.log(`Server is running on Port: ${process.env.SERVER_PORT}`));