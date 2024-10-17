const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const State = sequelize.define('State', {
    state_id: {
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
    tableName: 'state'
});

module.exports = State;