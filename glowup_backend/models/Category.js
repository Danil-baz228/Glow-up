const {DataTypes} = require('sequelize');
const sequelize = require('../config/db.config');

const Category = sequelize.define('Category', {
    category_id: {
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
    tableName: 'category'
});

module.exports = Category;