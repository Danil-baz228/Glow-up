const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');
const masterRoutes = require('./routes/masterRoutes');
const occupationRoutes = require('./routes/occupationRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const cityRoutes = require('./routes/cityRoutes');
const salonRoutes = require('./routes/salonRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const saleRoutes = require('./routes/saleRoutes');

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/clients', clientRoutes);
app.use('/masters', masterRoutes);
app.use('/occupations', occupationRoutes);
app.use('/services', serviceRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/cities', cityRoutes);
app.use('/salons', salonRoutes);
app.use('/reviews', reviewRoutes);
app.use('/sales', saleRoutes);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
