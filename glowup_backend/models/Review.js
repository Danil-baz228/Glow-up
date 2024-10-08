const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

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
  tableName: 'review'
});

module.exports = Review;