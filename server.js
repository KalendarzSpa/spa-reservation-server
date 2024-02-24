const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/spa_reservation', { useNewUrlParser: true, useUnifiedTopology: true });

const reservationSchema = new mongoose.Schema({
    userId: String,
    date: String,
    timeSlotId: String,
    roomNumber: String,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

app.use(express.json());

app.post('/api/reservations', async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        await reservation.save();
        res.status(201).send(reservation);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.send(reservations);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

