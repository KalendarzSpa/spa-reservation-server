// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let reservations = [];
let userIdCounter = 1;

app.get('/reservations', (req, res) => {
    res.json(reservations);
});

app.post('/reservations', (req, res) => {
    const newReservation = req.body;
    newReservation.userId = userIdCounter++;
    reservations.push(newReservation);
    res.json({ userId: newReservation.userId });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
