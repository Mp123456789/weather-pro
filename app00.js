// this is first file for practice
// the main file for the weather web app is app.js



//npm i express => npm install express
const app = require('express')();
const https = require('https');


// app.get('/', function(req, res){
//
//     const url = "https://api.openweathermap.org/data/2.5/weather?q=delhi&APPID=555891db437e667771a0868accf16e7b&units=metric";
//     https.get(url, function(response){
//       // console.log(response);
//       console.log(response.statusCode);
//
//       response.on("data", function(data){
//         // console.log(data); //for data in hexadecimal form
//
//         const weatherData = JSON.parse(data);
//         // const temp = weatherData.main.temp; // for temperature
//         // const weatherDescpt = weatherData.weather[0].description;
//         // console.log(weatherDescpt);
//
//         console.log(weatherData);
//
//         // const object= {
//           // name : 'Manav',
//           // favourite : 'dash'
//         // }
//         // console.log(JSON.stringify(object)); //for output in one line
//
//       });
//     });
//
//   res.send("Server is on and running!");
// });




//we can use only one time res.send in a get function
// but can use multiple res.write and at last a res.send

app.get('/', function(req, res){

    const url = "https://api.openweathermap.org/data/2.5/weather?q=delhi&APPID=555891db437e667771a0868accf16e7b&units=metric";
    https.get(url, function(response){
      console.log(response.statusCode);

      response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDesc = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageUrl= "http://openweathermap.org/img/wn/"+ icon + "@2x.png";

        res.write("<p>The weather is currently "+ weatherDesc + "<p>");
        res.write("<h1>The temperature in Delhi is currently "+ temp+" degree Celsius.<h1>");
        res.write("<img src="+ imageUrl +">");

      });
    });


});




app.listen(3000, function(req, res){
  console.log("Server is running on port 3000");
});
