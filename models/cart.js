const fs = require('fs')
const path = require('path')
const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json')



module.exports = class Cart {
    static addProduct(id, productPrice) {
        //Lấy data cũ về
        fs.readFile(p, (err, data) => {
            let cart = {
                products: [],
                totalPrice: 0
            }
            if(!err) {
                cart = JSON.parse(data)
            }
            //Tìm xem product đã chọn đã có trong cart chưa nếu chưa thì thêm vào, nếu có thì tăng số lượng thêm 1
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct = null
            if (existingProduct) {
                updatedProduct = {...existingProduct}
                updatedProduct.qty += 1
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct
            } else {
                updatedProduct = { id: id, qty: 1 }
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice += Number(productPrice)
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err)
            })
        })
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, data) => {
            if (err) {
                return;
            }
            const updatedCart = { ...JSON.parse(data) }
            const product = updatedCart.products.find(prod => prod.id === id)
            if (!product) {
                return;
            }
            const productQty = product.qty
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
            updatedCart.totalPrice = updatedCart.totalPrice - Number(productPrice) * productQty
            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log(err)
            })
        })
    }

    static getProducts (cb) {
        fs.readFile(p, (err, data) => {
            const cart = JSON.parse(data)
            if (err) {
                cb(null)
            } else {
                cb(cart)
            }
        })
    }
}