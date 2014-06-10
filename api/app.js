var request = require('request'),
    express = require('express'),
    app = express();

var config = {};
config.associationsUrl = "https://ethersource.gavagai.se/ethersource/rest/findAssociations?apiKey=5TrKUetB36uA&customerObserverId=452&timestamp=2014-05-08%2000:00:00%20CEST&maxResults=30&windowSize=24&userId=gavagaiApplicant";

app.get('/', function (req, res) {

	var userid = process.env.SF_USER;
	var passwd = process.env.SF_PWD;

	request(config.associationsUrl, function (error, response, body) {
	  	if (!error && response.statusCode == 200) {
	  		var data = JSON.parse(body);
  			res.json(data);
	  	} else {
	  		res.json({ "status": response.statusCode, "error": error })
	  	}
	}).auth(userid, passwd, false);

});

// start server
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port ' + port);