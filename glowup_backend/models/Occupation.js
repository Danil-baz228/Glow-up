const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Occupation = sequelize.define('Occupation', {
  occupation_id: {
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
  tableName: 'occupation'
});

module.exports = Occupation;