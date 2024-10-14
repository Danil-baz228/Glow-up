const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Post = sequelize.define('Post', {
    post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    order_index: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image_links: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
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
    tableName: 'post'
});

module.exports = Post;