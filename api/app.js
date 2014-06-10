var config = require('./config.js')
	request = require('request'),
    express = require('express'),
    app = express();

var authRequest = request.defaults({
		'auth': {
			'user': config.userid,
			'pass': config.passwd
		}
	});

app.get('/', function (req, res) {

	authRequest(config.associationsUrl, function (error, response, body) {
	  	if (!error && response.statusCode == 200) {
	  		var data = JSON.parse(body);
  			res.json(data);
	  	} else {
	  		res.json({ 
	  			'message': 'backend request failed',
	  			'statusCode': response.statusCode,
	  			'error': error 
	  		});
	  	}
	});
});

// start server
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port ' + port);