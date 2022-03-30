const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000



const stat_path = path.join(__dirname,'../public')

const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath) //setting views hbs folder - holding web pages
hbs.registerPartials(partialsPath) //  setting partials path


app.use(express.static(stat_path))

app.get('', (req, res) => {

    res.render('index', {type: "primary-league", logoUrl: "/img/with bold discriptor white.png"})
})

app.get('/leumit', (req,res)=> {
    res.render('index', {type: "secondary-league", logoUrl: "/img/Leumit new.png"})
})

app.get('/game', (req, res) => {

    res.render('game')
})

app.get('*', (req, res) => {

    res.render('404')
})

app.listen(port,  () => {
    console.log(`Server is up on port: http://localhost:${port}`)
})