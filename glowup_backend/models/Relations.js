const sequelize = require('../config/db.config');
const Appointment = require('./Appointment');
const Service = require('./Service');

Appointment.belongsToMany(Service, {
    through: 'appointment_service',
    foreignKey: 'appointment_id',
    otherKey: 'service_id'
});

Service.belongsToMany(Appointment, {
    through: 'appointment_service',
    foreignKey: 'service_id',
    otherKey: 'appointment_id'
});

module.exports = {
    sequelize,
    Appointment,
    Service
};
