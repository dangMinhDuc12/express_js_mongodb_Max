const getDb = require('../ulti/database').getDb
const mongodb = require('mongodb')
module.exports = class Product {
    constructor(title, price, description, imageURL, id, userId) {
        this.title = title
        this.price = price
        this.description = description
        this.imageURL = imageURL
        this._id = id ? new mongodb.ObjectId(id) : null
        this.userId = userId
    }
    async save() {
        const db = getDb()
        if(this._id) {
            //set: add thêm field nếu ko tồn tai, nếu tồn tại sẽ ghi đè toàn bộ
            await db.collection('products').updateOne({ _id: this._id }, { $set: this })
        } else {
            await db.collection('products').insertOne(this)
        }
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
    static deletebyId(id) {
        const db = getDb()
        return db.collection('products').deleteOne({_id: new mongodb.ObjectId(id)})
    }
}