const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Salon = sequelize.define('Salon', {
  salon_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  zip_code: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  city_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'city',
      key: 'city_id'
    }
  }
}, {
  timestamps: false,
  tableName: 'salon'
});

module.exports = Salon;