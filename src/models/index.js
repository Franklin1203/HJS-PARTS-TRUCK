
const sequelize = require('../config/database');
const User = require('./user.model');
const Product = require('./product.model');
const Order = require('./order.model');
const Order_Details = require('./order_details.model');
const Category = require('./category.model');


User.hasMany(Order,{foreignKey: 'userId', as: 'orders'});
Order.belongsTo(User,{foreignKey:'userId', as:'owner'});

Category.hasMany(Product,{foreignKey: 'categoryId', as: 'products'});
Product.belongsTo(Category,{foreignKey: 'categoryId', as: 'category'});

Product.belongsToMany(Order,{ through: Order_Details, foreignKey: 'productId', as: 'orders'});

Order.belongsToMany(Product,{through: Order_Details, foreignKey: 'orderId', as: 'products'});

module.exports = {sequelize,User,Product,Order,Order_Details,Category}