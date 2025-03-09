const express = require("express");
const SensorData = require("../models/SensorData");

const router = express.Router();

router.post("/add", async(req,ers) =>{
    try{
        const {temperature, humidity} = req.body;

        if(temperature === undefined || humidity === undefined){
            return res.status(400).json({error: "Temperature and humidity are required"});
        }
        const newData = new SensorData({temperature, humidity});
        await newData.save();

        res.status(201).json({message: "Sensor data saved!", data: newData})
    } catch(error){
        res.status(500).json({error: error.message});
    }
});

router.get("/",async (req,res) => {
    try{
        const data = await SensorData.find().sort({timestamp: -1});
        res.json(data);

    } catch(error){
        res.status(500).json({error: error.message});
    }
});

module.exports = router;