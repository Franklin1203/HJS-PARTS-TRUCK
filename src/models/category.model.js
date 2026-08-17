const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');


//tabla de categorias
const Category = sequelize.define(
    'Category',
    {
        name:{
            type: DataTypes.STRING(80),
            allowNull: false
        },
          descontinuada:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        tableName: 'category',
        timestamps: true
    }
);

module.exports = Category;