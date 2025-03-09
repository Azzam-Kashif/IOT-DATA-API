require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConnect = require("./db");
const SensorData = require("./SensorData");

const app = express();
app.use(express.json);
app.use(cors());

dbConnect();

app.get("/api/sensors", async (req,res) => {
    try{
        const data = await SensorData.find().sort({timestamp: -1});
        res.json(data);
    } catch(error){
        res.status(500).json({error: "Error ffetching sensor data"});
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,() =>{
    console.log(`Server running on http://localhost:${PORT}`);
})