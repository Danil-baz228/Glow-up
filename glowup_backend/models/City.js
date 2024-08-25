const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const City = sequelize.define('City', {
  city_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false,
  tableName: 'city'
});

module.exports = City;