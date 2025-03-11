import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import mqtt from "mqtt";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const client = mqtt.connect("ws://localhost:9001"); // WebSocket connection
    client.on("connect", () => {
      console.log("Connected to MQTT");
      client.subscribe("sensor/data");
    });

    client.on("message", (topic, message) => {
      const payload = JSON.parse(message.toString());
      setData((prev) => [...prev, { time: new Date().toLocaleTimeString(), ...payload }]);
    });

    return () => client.end(); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h2>Live Sensor Data</h2>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
        <Line type="monotone" dataKey="humidity" stroke="#007bff" />
      </LineChart>
    </div>
  );
};

export default Dashboard;
