const express = require('express')
const app = express()
const methodOverride = require('method-override')
const mongoConnect= require('./ulti/database').mongoConnect

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

//Taọ middleware để mọi request tương ứng với user hiện tại
// app.use(async (req, res, next) => {
//     const userFind = await User.findAll({
//         where: {
//             id: 1
//         }
//     })
//     req.user = userFind[0]
//     next()
// })

app.use('/admin',adminRoutes)
app.use(shopRoutes)



//404 not found page
app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page not found'})
})

;(async () => {
   const client = await mongoConnect()
    console.log(client)
    app.listen(3000)
})()
