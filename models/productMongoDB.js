const getDb = require('../ulti/database').getDb
const mongodb = require('mongodb')
module.exports = class Product {
    constructor(title, price, description, imageURL) {
        this.title = title
        this.price = price
        this.description = description
        this.imageURL = imageURL
    }
    async save() {
        const db = getDb()
        const result = await db.collection('products').insertOne(this)
        console.log(result)
    }
    static fetchAll() {
        const db = getDb()
        return db.collection('products').find().toArray()
    }
    static findById(id) {
        const db = getDb()
        //next(): tìm đến item cuối cùng thoả mãn điều kiện
        //Vì id lấy ở req.params là string nên phải tạo ra object id từ string đó để so sánh
        return db.collection('products').find({_id: new mongodb.ObjectId(id)}).next()
    }
}