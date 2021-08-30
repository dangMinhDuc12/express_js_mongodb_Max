 const {  DataTypes } = require('sequelize')

 const sequelize = require('../ulti/database')

 const Product = sequelize.define('products', {
     id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         allowNull: false,
         primaryKey: true
     },
     title: {
         type: DataTypes.STRING,
     },
     price: {
         type: DataTypes.DOUBLE,
         allowNull: false
     },
     imageURL: {
         type: DataTypes.STRING,
         allowNull: false
     },
     description: {
         type: DataTypes.STRING,
         allowNull: false
     }
 })

 module.exports = Product