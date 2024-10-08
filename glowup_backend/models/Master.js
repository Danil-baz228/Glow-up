const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Master = sequelize.define('Master', {
  master_id: {
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
  education: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  experience: {
    type: DataTypes.DATE,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'user_id'
    }
  },
  occupation_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'occupation',
      key: 'occupation_id'
    }
  }
}, {
  timestamps: false,
  tableName: 'master'
});

module.exports = Master;