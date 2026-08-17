const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Product = sequelize.define(
    'Product',
    {
        name: {
            type: DataTypes.STRING(120),
            allowNull: false
        },
        descripcion:{
            type: DataTypes.STRING
        },
        precio:{
            type: DataTypes.DECIMAL(18,2),
            allowNull: false,
            validate: {min: 0.01, isDecimal: true} //validamos que el precio no sea un numero negativo y que sea un decimal
        },
        stock:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {min: 0, isInt: true} //validamos que el stock no sea un numero negativo y que sea un entero
        },
        descontinuado:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }


    },
    {
        tableName: 'products',
        timestamps: true
    }

);

module.exports = Product