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
        // const cartProduct = this.cart.items.findIndex(item => item._id === product._id)
        const updatedCart = {
            items: [
                {
                    productId: product._id,
                    quantity: 1
                }
            ]
        }
        return db.collection('users').updateOne({ _id: new ObjectId(this._id)}, { $set: { cart: updatedCart } })
    }
}


module.exports = User