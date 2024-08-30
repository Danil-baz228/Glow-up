const Appointment = require('../models/Appointment');

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllAppointments
}