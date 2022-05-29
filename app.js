//npm i express => npm install express

const app = require('express')();
const https = require('https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : true}));

app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");

});


app.post('/', function(req, res){

  console.log(req.body.cityName);

  const query= req.body.cityName;
  const appid = "555891db437e667771a0868accf16e7b";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&APPID="+ appid +"&units="+ unit;

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl= "http://openweathermap.org/img/wn/"+ icon + "@2x.png";

      res.write("<p>The weather is currently "+ weatherDesc + "<p>");
      res.write("<h1>The temperature in "+ query +" is currently "+ temp+" degree Celsius.<h1>");
      res.write("<img src="+ imageUrl +">");

    });
  });
})




app.listen(process.env.PORT || 3000, function(req, res){
  console.log("Server is running on port 3000");
});
