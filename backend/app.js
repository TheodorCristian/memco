const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Config = require("./configurations/config");

const userRoutes = require("./routes/userRoutes");
const operatorRoutes = require("./routes/operatorRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require('./routes/productRoutes');
const cookieParser = require("cookie-parser");

// Create an Express application
const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(
  cors({
    origin: Config.origin,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Origin"], // Add required headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Add allowed methods
  })
);

// Define a route

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/operator", operatorRoutes);
app.use("/auth", authRoutes);
app.use("/product", productRoutes);

// Start the server
const port = 5000; // You can choose any port number you prefer
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
