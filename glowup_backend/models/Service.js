const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Master = require('./Master');

const Service = sequelize.define('Service', {
  service_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING(280)
  },
  benefits: {
    type: DataTypes.STRING(250)
  },
  contraindications: {
    type: DataTypes.STRING(280)
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'category',
      key: 'category_id'
    }
  },
  master_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'master',
      key: 'master_id'
    }
  }
}, {
  timestamps: false,
  tableName: 'service'
});

Service.belongsTo(Master, {foreignKey: 'master_id', as: 'master'});

module.exports = Service;
