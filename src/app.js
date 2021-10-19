const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handelbars and views location
app.set('views',viewsPath);
app.set('view engine','hbs');
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));  //by default index.html at home

app.get('',(req,res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Rajat'
	});
});

app.get('/about',(req,res) =>{
	res.render('about',{
        title: 'About Me',
		name: 'Rajat'
	});
});

app.get('/help',(req,res) =>{
	res.render('help',{
        title: 'Help',
		helpText: 'This is some helpful text',
		name: 'Rajat'
	});
});

app.get('/weather', (req, res) => {
	if(!req.query.address){
        res.send({
        	error: 'You must provide an address'
        });
	} else{
        geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {  //destructuring
	        if(error){
	            return res.send({ error });
	        }

	        forecast(latitude, longitude, (error, forecastData) => {

	            if(error){
	                return res.send({ error });
	            }
	            res.send({
	            	forecast: forecastData,
	            	location,                        //same as location: location,
	            	address: req.query.address
	            });
	        });
		});
	}
});




app.get('/products',(req,res) => {
	if(!req.query.search){
        res.send({
        	error: 'You must provide search term'
        });
	}
	console.log(req.query);
})


app.get('/help/*', (req, res) => {
	res.render('404',{
        title: '404',
		name: 'Rajat',
		errorMessage: 'Help article not found'
	});
});

app.get('*', (req, res) => { 
	res.render('404',{
        title: '404',
		name: 'Rajat',
		errorMessage: 'Page not found'
	});
});

//app.com
// app.com/help
//app.com/about

app.listen(port, () =>{
	console.log('Server is up on port '+ port);
})