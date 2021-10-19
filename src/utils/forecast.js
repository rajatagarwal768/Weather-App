const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=77f61ada0654d3cf7f5866a4f550db93&query='+ latitude + ',' + longitude + '&units=m'; //use m for metric means celcius
    
    request({url: url, json: true}, (error,response) => {
        if(error){
            callback('Unable to connect to weather Service', undefined);
        }
        else if(response.body.error){
            callback('Unable to find location',undefined);
        }
        else
        {
            // callback(undefined, {
            //     description: response.body.current.weather_descriptions[0],
            //     temperature: response.body.current.temperature,
            //     feels_like: response.body.current.feelslike,
            //     precip_rain: response.body.current.precip

            // });
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out. There is a ' + response.body.current.precip*10 + '% chance of rain.');
        }
    })
};

module.exports=forecast;