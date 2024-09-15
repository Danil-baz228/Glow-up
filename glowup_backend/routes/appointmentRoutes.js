const express = require('express');
const { getAllAppointments, createAppointment, deleteAppointment, getAppointmentById, updateAppointment } = require('../controllers/appointmentController');

const router = express.Router();

router.get('/', getAllAppointments);
router.post('/', createAppointment);
router.delete('/:id', deleteAppointment);
router.get('/:id', getAppointmentById);
router.put('/:id', updateAppointment);

module.exports = router;
