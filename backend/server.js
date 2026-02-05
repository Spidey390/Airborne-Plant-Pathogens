const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let sensorData = {
    temperature: 0,
    humidity: 0
};

app.post('/api/sensor', (req, res) => {
    sensorData = req.body;
    console.log("Received:", sensorData);

    res.send({
        message: "Data received"
    });
});

app.get('/api/sensor', (req, res) => {
    res.json(sensorData);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
