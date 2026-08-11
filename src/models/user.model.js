
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const User = sequelize.define(
    'User',
    {

        name:{
            type: DataTypes.STRING(80),
            allowNull: false
        },
        email:{
            type: DataTypes.STRING(120),
            unique: true,
            validate: {isEmail: true}
        },
        passwordHash:{
            type: DataTypes.STRING,
            allowNull: false
        },
        role:{
            type: DataTypes.ENUM('admin', 'member'),
            allowNull: false,
            defaultValue: 'member'
        }

    },
    {
        tableName: 'users',
        timestamps: true,
    }


);

module.exports = User;