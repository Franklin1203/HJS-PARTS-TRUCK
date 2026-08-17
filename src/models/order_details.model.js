
const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');


//tabla de detalles de ordenes
const Order_Details = sequelize.define(
    'Order_Details',{

        cantidad:{
            type: DataTypes.INTEGER,
            validate: {min:0, isInt:true}, //validamos que la cantidad no sea un numero negativo
            allowNull: false
        },
        precio:{
            type: DataTypes.DECIMAL(18,2),
            allowNull: false,
            validate: {min: 0.01, isDecimal: true} //validamos que el precio no sea negativo
        },
        descuento:{
            type: DataTypes.DECIMAL(18,2),
            allowNull: false,
            defaultValue: 0 
        }


    },
    {
        tableName: 'order_details',
        timestamps: false
    }


)

module.exports = Order_Details;
