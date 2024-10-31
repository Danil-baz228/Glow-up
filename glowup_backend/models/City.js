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
  },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'state',
        key: 'state_id'
      }
    }
}, {
  timestamps: false,
  tableName: 'city'
});

module.exports = City;