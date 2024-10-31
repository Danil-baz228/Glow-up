const sequelize = require('../config/db.config');
const Appointment = require('./Appointment');
const Service = require('./Service');
const Master = require('./Master');
const Post = require('./Post');
const Occupation = require('./Occupation');
const State = require('./State');
const City = require('./City');
const Salon = require('./Salon');
const Client = require('./Client');
const Category = require('./Category');
const Review = require('./Review');
const User = require('./User');
// User

User.hasOne(Client, {
    foreignKey: 'user_id'
});

Client.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasOne(Master, {
    foreignKey: 'user_id'
});

Master.belongsTo(User, {
    foreignKey: 'user_id'
});

//master
Master.belongsTo(Occupation, {
    foreignKey: 'occupation_id'
});

Occupation.hasMany(Master, {
    foreignKey: 'occupation_id'
});

Master.hasMany(Post, {
    foreignKey: 'master_id'
});

Post.belongsTo(Master, {
    foreignKey: 'master_id'
});

Master.belongsToMany(Salon, {
    through: 'master_salon',
    foreignKey: 'master_id',
    otherKey: 'salon_id',
    timestamps: false
});

Salon.belongsToMany(Master, {
    through: 'master_salon',
    foreignKey: 'salon_id',
    otherKey: 'master_id',
    timestamps: false
});

Master.belongsToMany(Client, {
    through: 'favorite_master',
    foreignKey: 'master_id',
    otherKey: 'client_id',
    timestamps: false
});

Client.belongsToMany(Master, {
    through: 'favorite_master',
    foreignKey: 'client_id',
    otherKey: 'master_id',
    timestamps: false
});

Master.hasMany(Service, {
    foreignKey: 'master_id'
});

Service.belongsTo(Master, {
    foreignKey: 'master_id'
});

//Service

Category.hasMany(Service, {
    foreignKey: 'category_id'
});

Service.belongsTo(Category, {
    foreignKey: 'category_id'
});

// Salon

City.hasMany(Salon, {
    foreignKey: 'city_id'
});

Salon.belongsTo(City, {
    foreignKey: 'city_id'
});

State.hasMany(City, {
    foreignKey: 'state_id'
});

City.belongsTo(State, {
    foreignKey: 'state_id'
});

// Appointment

Service.hasMany(Appointment, {
    foreignKey: 'service_id'
});

Appointment.belongsTo(Service, {
    foreignKey: 'service_id'
});

Client.hasMany(Appointment, {
    foreignKey: 'client_id'
});

Appointment.belongsTo(Client, {
    foreignKey: 'client_id'
});

// Review

Client.hasMany(Review, {
    foreignKey: 'client_id'
});

Review.belongsTo(Client, {
    foreignKey: 'client_id'
});

Appointment.hasOne(Review, {
    foreignKey: 'appointment_id'
});

Review.belongsTo(Appointment, {
    foreignKey: 'appointment_id'
});

module.exports = {
    sequelize,
    Appointment,
    Service,
    Master,
    Post,
    Occupation,
    State,
    City,
    Salon,
    Client,
    Category,
    Review,
    User
};
