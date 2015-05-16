var express = require('express'),
gpio = require('pi-gpio');
var app = express();
var pin = 26;

app.get('/lights', function(req, res){
	if (!req.query.state) {
		res.end(JSON.stringify({'success': false}));
	}
    var turnOff = (req.query.state == 0);
    console.log("Turning lights " + (turnOff ? "off" : "on"));
    gpio.open(pin, 'output', function(err) {     // Open pin for output
        gpio.write(pin, (turnOff ? 0 : 1), function() {          // Set pin high (1)
            gpio.close(pin);                     // Close pin
            res.end(JSON.stringify({'success': true, 'state': !turnOff}));
        });
    });
});
app.get('/lights/status', function(req, res){
	gpio.open(pin, 'input', function(err){
		gpio.read(pin, function(err, value){
			gpio.close(pin);
			res.end(JSON.stringify({'success': true, 'state': (value==0)}));
		});
	});
});
console.log("Listening on port 2368");
app.listen(2368);

