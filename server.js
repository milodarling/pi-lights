var express = require('express'),
gpio = require('pi-gpio');
var app = express();
var pin = 26;

app.get('/lights', function(req, res){
        var turnOff = (req.query.state == 0);
        console.log("Turning lights " + (turnOff ? "off" : "on"));
        gpio.open(pin, 'output', function(err) {     // Open pin for output
        gpio.write(pin, (turnOff ? 0 : 1), function() {          // Set pin high (1)
                gpio.close(pin);                     // Close pin
                res.end("Success, lights are " + (turnOff ? "off" : "on"));
        });
        });
});
console.log("Listening on port 2368");
app.listen(2368);

