const Product = require('../models/productMongoDB')
// const Cart = require('../models/cartSQL')
// const Order = require('../models/orderSQL')

exports.getProducts = async (req, res, next) => {
    //sendFile: gửi 1 file đến đường dẫn bên trong hàm, dirname: folder hiện tại
    const products = await Product.fetchAll()

         res.render('shop/product-list', {
             prods: products,
             pageTitle: 'Shop',
             path: '/products',
             hasProducts: products.length > 0,
             activeShop: true,
             productCSS: true
         })

}

exports.getProduct = async (req, res, next) => {
    //sendFile: gửi 1 file đến đường dẫn bên trong hàm, dirname: folder hiện tại
    const productId = req.params.productId
    const product = await Product.findById(productId)
    res.render('shop/product-detail', {
        prod: product,
        pageTitle: product.title,
        path: '/products'
    })
}


exports.getIndex = async (req, res, next) => {
    const products = await Product.fetchAll()
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        })

}

// exports.getCart = async (req, res, next) => {
//     // Cart.getProducts((cart) => {
//     //     const cartProducts = []
//     //     Product.fetchAll(products => {
//     //         products.forEach(product => {
//     //             const cartProductData = cart.products.find(prod => prod.id === product.id)
//     //             if (cartProductData) {
//     //                 cartProducts.push({
//     //                     productData: product,
//     //                     qty: cartProductData.qty
//     //                 })
//     //             }
//     //         })
//     //         res.render('shop/cart', {
//     //             path: '/cart',
//     //             pageTitle: 'Your Cart',
//     //             products: cartProducts
//     //         })
//     //     })
//     // })
//
//     //SQL
//     const cart = await req.user.getCart()
//     const cartProducts = await cart.getProducts()
//     res.render('shop/cart', {
//         path: '/cart',
//         pageTitle: 'Your Cart',
//         products: cartProducts
//     })
// }
//
// exports.postCart = async (req, res, next) => {
//     const productId = req.body.productId
//     // Product.findById(productId, (product) => {
//     //     Cart.addProduct(productId, product.price)
//     // })
//
//     //SQL
//     let fetchedCart = null
//     const cart = await req.user.getCart()
//     fetchedCart = cart
//     const products = await cart.getProducts({
//         where: {
//             id: productId
//         }
//     })
//     let product = null
//     if (products.length) {
//         product = products[0]
//     }
//     let newQuantity = 1
//     if (product) {
//         const oldQuantity = product.cartItems.quantity
//         newQuantity = oldQuantity + 1
//         await fetchedCart.addProduct(product, { through: { quantity: newQuantity } })
//     }
//     const productFind = await Product.findAll({
//         where: {
//             id: productId
//         }
//     })
//     await fetchedCart.addProduct(productFind[0], { through: { quantity: newQuantity } })
//     res.redirect('/cart')
// }
//
// exports.deleteCartProduct = async (req, res, next) => {
//     const { productId } = req.params
//     // Product.findById(productId, (product) => {
//     //     Cart.deleteProduct(productId, product.price)
//     //     res.redirect('/cart')
//     // })
//     const cart = await req.user.getCart()
//     const products = await cart.getProducts({
//         where: {
//             id: productId
//         }
//     })
//     await cart.removeProduct(products[0])
//     res.redirect('/cart')
// }
//
//
// exports.getCheckout = (req, res, next) => {
//     res.render('shop/checkout', {
//         path: '/checkout',
//         pageTitle: 'Checkout'
//     })
// }
//
// exports.getOrders = async (req, res, next) => {
//     //Lệnh include: đưa các association cần vào xong query
//     const orders = await req.user.getOrders({ include: ['products'] })
//     res.render('shop/orders', {
//         path: '/orders',
//         pageTitle: 'Your Orders',
//         orders: orders
//     })
// }
//
// exports.postOrders = async (req, res, next) => {
//     const cart = await req.user.getCart()
//     const products = await cart.getProducts()
//     const order = await req.user.createOrder()
//     await order.addProducts(products.map(prod => {
//          prod.orderItems = { quantity: prod.cartItems.quantity }
//         return prod
//     }))
//     await cart.setProducts(null)
//     res.redirect('/orders')
// }