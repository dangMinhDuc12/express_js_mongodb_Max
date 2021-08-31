const Product = require("../models/productMongoDB");
exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
        editing: false
    })
}
exports.getEditProduct = async (req, res, next) => {
    const editMode = req.query.edit
    if (!editMode) return res.redirect('/')
    const { productId } = req.params

    //Relationship
    const product = await Product.findById(productId)

        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            prod: product
        })
}



exports.addProduct = async (req, res, next) => {
    const { title, imageURL, description, price } = req.body
    const product = new Product(title, price, description, imageURL, null, req.user._id)
    product.save()
    res.redirect('/')
}

exports.getProducts = async (req, res, next) => {

    //relationship
    const products = await Product.fetchAll()
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        })
}
//
exports.updateProduct = async (req, res, next) => {
    const { productId } = req.params
    const { title, imageURL, description, price } = req.body
    const product = new Product(title, price, description, imageURL, productId)
    await product.save()
    res.redirect('/')
}
//
exports.deleteProduct = async (req, res, next) => {
    const { productId } = req.params
    await Product.deletebyId(productId)
    res.redirect('/admin/products')
}