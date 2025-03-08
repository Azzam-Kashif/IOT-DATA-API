require("dotenv").config();
const mqtt = require("mqtt");
const mongoose = require("mongoose");
const dbConnect = require("./db");
const SensorData = require("./SensorData");

dbConnect();

const cleint = mqtt.connect("mqtt://localhost");

cleint.on("connect", () =>{
    console.log("Connected to MQTT Broker");
    cleint.subscribe("sensor/data");
});

cleint.on("message", async(topic, message) =>{
    try{
        const data = JSON.parse(message.toString());
        console.log("Received: ", data);

        const sensorEntry = new SensorData(data);
        await sensorEntry.save();
        console.log("Data saved to MongoDB");
    } catch(error){
        console.log("Error saving data: ", error);
    }
});