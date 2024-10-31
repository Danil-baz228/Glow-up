const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Client = sequelize.define('Client', {
  client_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  middle_name: {
    type: DataTypes.STRING(255)
  },
  date_of_birth: {
    type: DataTypes.DATE
  },
  address: {
    type: DataTypes.STRING(255)
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'user_id'
    }
  }
}, {
  timestamps: false,
  tableName: 'client'
});

module.exports = Client;