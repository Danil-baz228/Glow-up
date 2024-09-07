const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

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

module.exports = Service;
