const {  DataTypes } = require('sequelize')

const sequelize = require('../ulti/database')

const CartItem = sequelize.define('cartItems', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: DataTypes.INTEGER
})

module.exports = CartItem