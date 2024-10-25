const {DataTypes} = require('sequelize');
const sequelize = require('../config/db.config');
const {Master} = require('./Relations.js');

const Portfolio = sequelize.define('Portfolio', {
    portfolio_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    headline: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING(255),
        allowNull: false
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
    tableName: 'portfolio'
});

Portfolio.belongsTo(Master, {
    foreignKey: 'master_id'
});

module.exports = Portfolio;