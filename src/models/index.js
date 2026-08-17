
const sequelize = require('../config/database');
const User = require('./user.model');
const Product = require('./product.model');
const Order = require('./order.model');
const Order_Details = require('./order_details.model');
const Category = require('./category.model');


//relacion entre usuario y orden (de uno a muchos)
User.hasMany(Order,{foreignKey: 'userId', as: 'orders'});
Order.belongsTo(User,{foreignKey:'userId', as:'owner'});

//relacion entre categoria y producto(de uno a muchos por el enfoque de la empresa)
Category.hasMany(Product,{foreignKey: 'categoryId', as: 'products'});
Product.belongsTo(Category,{foreignKey: 'categoryId', as: 'category'});

//relacion entre producto y ordenes (de muchos a muchos con order details como tabla intermedia)
Product.belongsToMany(Order,{ through: Order_Details, foreignKey: 'productId', as: 'orders'});

Order.belongsToMany(Product,{through: Order_Details, foreignKey: 'orderId', as: 'products'});

module.exports = {sequelize,User,Product,Order,Order_Details,Category}