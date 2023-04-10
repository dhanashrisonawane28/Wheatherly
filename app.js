const express = require("express");
const https = require("https");
const path = require("path");
const bodyParser  = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.set("views",path.join(__dirname,'views'));
app.set("view engine","ejs");


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

  const query= req.body.city;
  const appid="cf0110fbf25ebc12ccb845c4bbef438b";
  const unit="metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+unit;
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherdata = JSON.parse(data);
      console.log(weatherdata);
      const name = weatherdata.name;
      const temp = weatherdata.main.temp;
      const weatherDescription = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      const windSpeed = weatherdata.wind.speed;
      const humidity = weatherdata.main.humidity;
      const minTemp = weatherdata.main.temp_min;
      const maxTemp = weatherdata.main.temp_max;
      const pressure = weatherdata.main.pressure;
      const seaLevel = weatherdata.main.sea_level;
      const groundLevel = weatherdata.main.grnd_level;
      const visibility = weatherdata.visibility;
      const sunrise = weatherdata.sys.sunrise;
      const sunset = weatherdata.sys.sunset;
      const timezone = weatherdata.timezone;
      const country = weatherdata.sys.country;
      // res.write("Weather is : " + wetherDescription);
      // res.write("Temperature at London is : "+temp +" degrees Celcius");
      // res.write("<img src="+imageURL+">");

      //res.send("<h3>Weather is : " + wetherDescription + "<br>Temperature at "+query+" is : "+temp +" degrees Celcius</h3><br><img src="+imageURL+">");
      //res.render(__dirname + "/templete2.html", {temp:temp});
      //res.sendFile(__dirname+"/templete2.html");

      res.render('templete2',{temp:temp,name:name,weatherDescription:weatherDescription,windSpeed:windSpeed,
      humidity:humidity,minTemp:minTemp,maxTemp:maxTemp,imageURL:imageURL,pressure:pressure,seaLevel:seaLevel,
    groundLevel:groundLevel,visibility:visibility,sunrise:sunrise,sunset:sunset,timezone:timezone,country:country});
    })
  })
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server started at port 3000");
});

//link : https://ancient-wildwood-57781.herokuapp.com/
