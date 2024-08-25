const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Appointment = require('./Appointment');

const Service = sequelize.define('Service', {
  service_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'service'
});

// Define many-to-many relationship with Appointment
Service.belongsToMany(Appointment, {
  through: 'appointment_service',
  foreignKey: 'service_id',
  otherKey: 'appointment_id'
});

Appointment.belongsToMany(Service, {
  through: 'appointment_service',
  foreignKey: 'appointment_id',
  otherKey: 'service_id'
});

module.exports = Service;