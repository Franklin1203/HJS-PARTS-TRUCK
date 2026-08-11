const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');



const Order = sequelize.define(
    'Order',
    {
        Order_Date:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        total:{
            type: DataTypes.DECIMAL(18,2),
            allowNull: false,
            valid: {min: 0.01, isDecimal: true },

        }

    },
    {
        tableName: 'orders',
        timestamps: true
    }
);

module.exports = Order;