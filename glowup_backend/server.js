const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const multer = require('multer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

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

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/masters', masterRoutes);
app.use('/api/occupations', occupationRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/salons', salonRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/sales', saleRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

const sequelize = require('./config/db.config');  // Import Sequelize config

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Database & tables synced!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});