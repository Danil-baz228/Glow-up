const express = require('express');
const { getAllAppointments, createAppointment, deleteAppointment, getAppointmentById, updateAppointment, getAppointmentsForClient } = require('../controllers/AppointmentController');

const router = express.Router();

router.get('/', getAllAppointments);
router.post('/', createAppointment);
router.delete('/:id', deleteAppointment);
router.get('/:id', getAppointmentById);
router.put('/:id', updateAppointment);
router.get('/client/:client_id', getAppointmentsForClient);

router.post('/', async (req, res) => {
    const { date_start, date_end, status, client_id, service_id } = req.body;
    try {
        const newAppointment = await Appointment.create({
            date_start,
            date_end,
            status,
            client_id,
            service_id
        });
        res.status(201).json(newAppointment);
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ message: 'Failed to create appointment' });
    }
});

module.exports = router;
