
const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');



const Order_Details = sequelize.define(
    'Order_Details',{

        cantidad:{
            type: DataTypes.INTEGER,
            validate: {min:0, isInt:true},
            allowNull: false
        },
        precio:{
            type: DataTypes.DECIMAL(18,2),
            allowNull: false,
            validate: {min: 0.01, isDecimal: true}
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
