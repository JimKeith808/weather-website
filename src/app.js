const geocode = require('./utils/geocode.js') 
const forecast = require('./utils/forecast.js')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// define paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views directory
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Jim Keith'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jim Keith'
    }) 
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'There is no help or you. Go and find someone who cares.',
        title: 'Help',
        name: 'Jim Keith'
    }) 
})

app.get('/weather', (req, res) => {
    if (!req.query.address) { 
        return res.send({
            error: 'You must provide an address'
        }) 
    } 

    geocode(req.query.address, (error, {latitude ,longitude, location} = {}) => {
        if (error) {
            res.send({error})
            return
        } 

        forecast(longitude, latitude, (error, forecastdata) => {
            if (error) {
                res.send({error})
                return
            }
             res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must include a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        message: 'Help article not found.',
        title: 'Help - 404',
        name: 'Jim Keith'
    }) 
})

app.get('*', (req, res) => {
    res.render('notfound', {
        message: 'Page not found.',
        title: 'Help - 404',
        name: 'Jim Keith'
    }) 
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})