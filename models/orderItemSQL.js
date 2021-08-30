const {  DataTypes } = require('sequelize')

const sequelize = require('../ulti/database')

const OrderItemSQL = sequelize.define('orderItems', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: DataTypes.INTEGER
})

module.exports = OrderItemSQL