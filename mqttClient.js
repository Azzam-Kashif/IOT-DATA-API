const mqtt = require("mqtt");
const SensorData = require("./models/SensorData");

// MQTT Broker URL (Replace with your actual broker address if needed)
const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || "mqtt://localhost"; 

// MQTT Topic for sensor data
const MQTT_TOPIC = "sensor/data";

// Connect to MQTT Broker
const client = mqtt.connect("ws://localhost:9001");

// Handle connection
client.on("connect", () => {
  console.log("✅ Connected to MQTT Broker");
  client.subscribe(MQTT_TOPIC, (err) => {
    if (err) {
      console.error("MQTT Subscribe Error:", err);
    } else {
      console.log(`📡 Subscribed to topic: ${MQTT_TOPIC}`);
    }
  });
});

// Handle incoming messages
client.on("message", async (topic, message) => {
  if (topic === MQTT_TOPIC) {
    try {
      const { temperature, humidity } = JSON.parse(message.toString());

      if (temperature !== undefined && humidity !== undefined) {
        const newData = new SensorData({ temperature, humidity });
        await newData.save();
        console.log("📥 Sensor Data Received & Saved:", newData);
      } else {
        console.error("⚠️ Invalid Sensor Data Format:", message.toString());
      }
    } catch (error) {
      console.error("Error Processing MQTT Message:", error.message);
    }
  }
});

// Handle errors
client.on("error", (err) => {
  console.error("MQTT Connection Error: ", err);
});

module.exports = client;
