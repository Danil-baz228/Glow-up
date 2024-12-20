const { DataTypes, ENUM } = require('sequelize');
const sequelize = require('../config/db.config');
const Occupation = require('./Occupation');
const Salon = require('./Salon');

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
    type: DataTypes.STRING(20),
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
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull:false
  },
  date_of_birth: {
    type: DataTypes.DATE
  },
  background_url: {
    type: DataTypes.STRING(255)
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
  },
  salon_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'salon',
      key: 'salon_id'
    }
  }
}, {
  timestamps: false,
  tableName: 'master'
});

Master.belongsTo(Occupation, { foreignKey: 'occupation_id' });
Master.belongsTo(Salon, { foreignKey: 'salon_id' });

module.exports = Master;