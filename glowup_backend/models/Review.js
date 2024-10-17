const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Client = require('./Client');

const Review = sequelize.define('Review', {
  review_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment: {
    type: DataTypes.STRING(1000)
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'client',
      key: 'client_id'
    }
  },
  appointment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'appointment',
      key: 'appointment_id'
    }
  }
}, {
  timestamps: false,
  tableName: 'review'
});

Review.belongsTo(Client, { foreignKey: 'client_id', as: 'client' });

module.exports = Review;