const express = require('express');
const path = require('path');
const fs = require('fs');
const hbs = require('hbs');


var app = express();

app.set('view engine','hbs');

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url} \n`;
    console.log(log); 
    fs.appendFile('logger.txt', log);
    next();
});

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// })

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

var publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.get('/',(req, res)=>{
    res.render('home.hbs',{
        title: 'Home',
        welcomeMessage: 'Welcome to Express Js'
    });
});

app.get('/about',(req, res)=>{
    res.render('about.hbs',{
        title: 'About'
    });
});

app.get('/help',(req, res)=>{
    res.render('help.hbs',{
        title: 'Help'
    });
});

app.listen(3000,()=>{
    console.log('App started at port 3000');
});