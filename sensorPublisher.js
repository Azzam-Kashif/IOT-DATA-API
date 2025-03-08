const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://localhost");

client.on("connect", ()=> {
    console.log("Connected to MQTT Broker");

    setInterval(() => {
        const sensorData = {
            temperature: (Math.random() * 10 + 20).toFixed(2),
            humidity: (Math.random() * 20 + 40).toFixed(2),
        };

        client.publish("sensor/data", JSON.stringify(sensorData));
        console.log("Published:", sensorData);
    }, 5000);
})