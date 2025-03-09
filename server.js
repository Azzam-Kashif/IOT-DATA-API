require("dotenv").config();
require("./mqttClient");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConnect = require("./db");
const SensorData = require("./SensorData");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json);
app.use(cors());

dbConnect();

app.use("/api/sensor", require("./routes/sensorRoutes"));

app.get("/", (req,res) =>{
    res.send("IOT Server is running");
});

app.listen(PORT,() =>{
    console.log(`Server running on http://localhost:${PORT}`);
})