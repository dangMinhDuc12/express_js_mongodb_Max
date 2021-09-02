const getDb = require('../ulti/database').getDb
const { ObjectId } = require('mongodb')

class User {
    constructor(username, email, cart, id) {
        this.username = username
        this.email = email
        this.cart = cart
        this._id = id
    }

    save() {
        const db = getDb()
        return db.collection('users').insertOne(this)
    }
    static findById(userId) {
        const db = getDb()
        return db.collection('users').findOne({ _id: new ObjectId(userId)})
    }
    addToCart(product) {
        const db = getDb()
        const cartProductIndex = this.cart.items.findIndex(item => item.productId.toString() === product._id.toString())
        let newQuantity = 1
        const updatedCartItems = [...this.cart.items]
        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1
            updatedCartItems[cartProductIndex].quantity = newQuantity
        } else {
            updatedCartItems.push({
                productId: new ObjectId(product._id),
                quantity: newQuantity
            })
        }
        const updatedCart = {
            items: updatedCartItems
        }
        return db.collection('users').updateOne({ _id: new ObjectId(this._id)}, { $set: { cart: updatedCart } })
    }
    async getCart() {
        const db = getDb()
        const productIds = this.cart.items.map(item => item.productId)
        const productsInCart = await db.collection('products').find({ _id: { $in: productIds } }).toArray()
        const productsWithQuantity = productsInCart.map(prod => (
            {
                ...prod,
                quantity: this.cart.items.find(item => item.productId.toString() === prod._id.toString()).quantity
            }
        ))
        return productsWithQuantity
    }
    deleteProductFromCart(productId) {
        const db = getDb()
        const updatedCart = this.cart.items.filter(item => item.productId.toString() !== productId)
        return db.collection('users').updateOne({ _id: new ObjectId(this._id)}, { $set: { cart: { items:  updatedCart}  } })
    }
    async addOrders() {
        const db = getDb()
        const productsWithQuantity = await this.getCart()
        const order = {
            items: productsWithQuantity,
            user: {
                _id: new ObjectId(this._id),
                username: this.username
            }
        }
        await db.collection('orders').insertOne(order)
        this.cart = {
            items: []
        }
        return db.collection('users').updateOne({ _id: new ObjectId(this._id)}, { $set: { cart: { items:  []}  } })
    }
    getOrders() {
        const db = getDb()
        return db.collection('orders').find({ 'user._id': new ObjectId(this._id) }).toArray()
    }

}


module.exports = User