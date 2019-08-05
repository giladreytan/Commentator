const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()



const stat_path = path.join(__dirname,'../public')

const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath) //setting views hbs folder - holding web pages
hbs.registerPartials(partialsPath) //  setting partials path


app.use(express.static(stat_path))

app.get('', (req, res) => {

    res.render('index')
})

app.get('/game', (req, res) => {

    res.render('game')
})

app.get('*', (req, res) => {

    res.render('404')
})

app.listen(3000,  () => {
    console.log('Server is up')
})