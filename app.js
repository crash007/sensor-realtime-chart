
/**
 * Module dependencies.
 */

var express = require('express.io')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , http = require('http')
  , path = require('path')
  methodOverride = require('method-override'),
  session = require('express-session');

var SerialPort = require("serialport").SerialPort;

var app = express();

app.http().io();

// all environments
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('combined'));
app.use(cookieParser());

app.use(methodOverride('X-HTTP-Method-Override'));  
app.use(session({secret: 'supersecret', saveUninitialized: true, resave: true}));



app.io.route('ready', function(req) {
	console.log('ready event received');
	 var serialport = new SerialPort("/dev/ttyUSB1",{
		  baudrate: 9600,
		  parser: require("serialport").parsers.readline("\n")
	}); // replace this address with your port address

	 
	serialport.on('open', function(){
		  // Now server is connected to Arduino
		  console.log('Serial Port Opend');

	      serialport.on('data', function(data){
	    	  var values = data.split(/\s+/);
	    	  var result=[];
	    	  	    
	    	  //console.log(result);
	              req.io.emit('data', values);
	      });
		  
	});

});

var routes = require('./routes/index')();
app.use('/', routes);

app.listen(3000);
