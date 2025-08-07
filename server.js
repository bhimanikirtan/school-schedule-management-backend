const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const schoolRoute = require("./routes/schoolRoute");
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/school", schoolRoute);
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
