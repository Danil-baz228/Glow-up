const express = require('express');
const { getAllAppointments, createAppointment, deleteAppointment, getAppointmentById, updateAppointment, getAppointmentsForClient } = require('../controllers/appointmentController');

const router = express.Router();

router.get('/', getAllAppointments);
router.post('/', createAppointment);
router.delete('/:id', deleteAppointment);
router.get('/:id', getAppointmentById);
router.put('/:id', updateAppointment);
router.get('/client/:client_id', getAppointmentsForClient);


module.exports = router;
