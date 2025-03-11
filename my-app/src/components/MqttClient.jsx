import { useState, useEffect } from "react";
import mqtt from "mqtt";

const MQTT_BROKER = "ws://localhost:9001"; // Change this if using a remote broker
const MQTT_TOPIC = "sensor/data"; // Change this based on your topic

export default function MqttClient() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const client = mqtt.connect(MQTT_BROKER);

    client.on("connect", () => {
      console.log("Connected to MQTT Broker");
      client.subscribe(MQTT_TOPIC);
    });

    client.on("message", (topic, message) => {
      setMessages((prev) => [...prev, message.toString()]);
    });

    return () => client.end();
  }, []);

  return (
    <div>
      <h2>MQTT React Client</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
