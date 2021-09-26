const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define Path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')     // Path to templates  (Orignally was views which is render by default)
const partialsPath = path.join(__dirname,'../templates/partials') 

// console.log(__dirname)  // absolute path to folder
// console.log(__filename)   // absolute path to file

// Setup handlers engine and views Location
app.set('view engine','hbs') // help to set a value for express
app.set('views', viewsPath)   // if we have directory with name views it did not need this
hbs.registerPartials(partialsPath)  // path to partials directory

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))  //update the server with same type of content

app.get('',(req, res)=>{ // It helps to render a view with a Templates in views folder (CONVERT TEMPLATE TO HTML)
    res.render('index',{
        title: 'Weather app',
        name: 'Yash'
    })       
})

app.get('/about',(req, res)=>{ // .render() CONVERT TEMPLATE TO HTML ant returns the response
    res.render('about',{
        title: 'About  PAGE',
        name: 'Yash Thaman'
    })       
}) 

app.get('/help',(req, res)=>{ // .render() CONVERT TEMPLATE TO HTML ant returns the response
    res.render('help',{
        helpText: 'HELP  PAGE',
        title: 'Help',
        name: 'Yash Thaman'
    })       
}) 

app.get('/help/*',(req,res)=>{ 
    res.render('404',{
        title: '404',
        name: 'Yash Thaman',
        errorMessage: 'Help article not found'
    })
})

app.get('/weather',(req, res)=>{ 
    if(!req.query.address){
        return res.send({                   // it stops when condition is true preventing to two request to be used as it is allowed in http
            error: "Please enter a Address"
        })
    }  
    geocode(req.query.address, (error,{latitude, longitude ,location}={})=>{   // (error , data) destructure data to {latitude, longitude ,location} set up default value ={} by adding empty object
        if(error){
            return res.send({error:error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
    })
    })
    
})

app.get('/products',(req, res)=>{  
    if(!req.query.search){
        return res.send({                   // it stops when condition is true preventing to two request to be used as it is allowed in http
            error: "You should provide correct search term."
        })
    }

    console.log(req.query) 
    res.send({
        products:[]
    })
})
app.get('*',(req,res)=>{   // * represents all other url which are not mentioned  ## IT shuld be at last as if found first it will get executed in place of expected
    res.render('404',{
        title: '404',
        name: 'Yash Thaman',
        errorMessage: 'Page not found'
    })
})

// console.log(path.join(__dirname,'../public')) 

// app.get('',(req, res)=>{   // help to decide action to be taken by server for a url   ## did not require this now as we have App.use() to add html pages
 
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help',(req, res)=>{   
//     res.send({
//         name:'yash',
//         age: 23
//     })
// })

// app.get('/about',(req, res)=>{   
//     res.send([{
//         names: 'yash'
//     }, {
//         names: 'honey'
//     }])
// })



app.listen(3000,()=>{
    console.log('Server is up on 3000.')
})  // Start the server to listen a port