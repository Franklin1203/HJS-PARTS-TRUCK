const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');


const Category = sequelize.define(
    'Category',
    {
        name:{
            type: DataTypes.STRING(80),
            allowNull: false
        }
    },
    {
        tableName: 'category',
        timestamps: true
    }
);

module.exports = Category;