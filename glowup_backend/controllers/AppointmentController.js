const { Appointment, Service, Category, Master, Review, Occupation } = require('../models/Relations');

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

const getAppointmentsForClient = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({
            where: { client_id: req.params.client_id },
            include: [
                {
                    model: Service,
                    include: [
                        {
                            model: Category,
                            attributes: ['name']
                        },
                        {
                            model: Master,
                            attributes: ['first_name', 'last_name', 'gender'], // Include gender here
                            include: [
                                {
                                    model: Occupation,
                                    attributes: ['name']
                                }
                            ]
                        }
                    ],
                    attributes: ['price']
                },
                {
                    model: Review,
                    attributes: ['rating']
                }
            ]
        });

        const formattedAppointments = appointments.map(appointment => {
            return {
                appointment_id: appointment.appointment_id,
                date_start: appointment.date_start,
                date_end: appointment.date_end,
                status: appointment.status,
                Master: {
                    first_name: appointment.Service.Master.first_name,
                    last_name: appointment.Service.Master.last_name,
                    gender: appointment.Service.Master.gender,
                    Occupation: {
                        name: appointment.Service.Master.Occupation.name
                    }
                },
                Review: appointment.Review ? { rating: appointment.Review.rating } : null,
                Service: {
                    Category: {
                        name: appointment.Service.Category.name
                    },
                    price: appointment.Service.price
                }
            };
        });

        res.status(200).json(formattedAppointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getAllAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsForClient
}