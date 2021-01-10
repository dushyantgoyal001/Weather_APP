const { response } = require("express");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    var query = req.body.cityName;
    var unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=8244a9502c3fad67c52a26ce1a58ee53";
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const whetherData = JSON.parse(data);
            const icon = whetherData.weather[0].icon;
            const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            const temp = whetherData.main.temp;
            const description = whetherData.weather[0].description;
            res.writeHead(200, { 'content-Type': 'text/HTML' });
            res.write("<img src= '" + iconUrl + "'>")
            res.write("<h1>The Temperature in "+ query +" is " + temp + " degree celcius</h1>")
            res.write("<h3>The weather is currently " + description + "</h3>")
            res.end();
        })
    });

});



app.listen(3000, function () {
    console.log("server badiya se chl rha");
});