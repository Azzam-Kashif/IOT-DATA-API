const mongoose = require("mongoose");

const SensorDataSchema = new mongoose.Schema({
    temperature: Number,
    humidity: Number,
    timestamp: {type: Date, default: Date.now},

});

const SensorData = mongoose.models.SensorData || mongoose.model("SensorData", SensorDataSchema);


module.exports = SensorData;