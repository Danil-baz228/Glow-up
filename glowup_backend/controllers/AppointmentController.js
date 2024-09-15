const Appointment = require('../models/Appointment');

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) {
            res.status(404).json({ message: 'Appointment not found' });
        } else {
            res.status(200).json(appointment);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.create(req.body);
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) {
            res.status(404).json({ message: 'Appointment not found' });
        } else {
            await appointment.update(req.body);
            res.status(200).json(appointment);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) {
            res.status(404).json({ message: 'Appointment not found' });
        } else {
            await appointment.destroy();
            res.status(204).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment
}