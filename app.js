const express = require('express')
const app = express()
const methodOverride = require('method-override')
const mongoConnect= require('./ulti/database').mongoConnect
const User = require('./models/user')
const { ObjectId } = require('mongodb')

//Routes
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const path = require("path");


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(methodOverride('_method'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

// Taọ middleware để mọi request tương ứng với user hiện tại
app.use(async (req, res, next) => {
    const userFind = await User.findById('6130508aa48d0a4812e23843')
    req.user = new User(userFind.username, userFind.email, userFind.cart, userFind._id)
    next()
})

app.use('/admin',adminRoutes)
app.use(shopRoutes)



//404 not found page
app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page not found'})
})

;(async () => {
    try {
        const client = await mongoConnect()
        console.log('connected to db')
        app.listen(3000)
    } catch (e) {
        console.log(e)
    }

})()
