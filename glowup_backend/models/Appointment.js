const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Service = require('./Service');

const Appointment = sequelize.define('Appointment', {
  appointment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date_start: {
    type: DataTypes.TIMESTAMP,
    allowNull: false
  },
  date_end: {
    type: DataTypes.TIMESTAMP,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'client',
      key: 'client_id'
    }
  }
}, {
  timestamps: false,
  tableName: 'appointment'
});

// Define many-to-many relationship with Service
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

module.exports = Appointment;