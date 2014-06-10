var config = require('./config.js')
	async = require('async'),
	request = require('request'),
    express = require('express'),
    app = express();

var authRequest = request.defaults({
	'auth': {
		'user': config.userid,
		'pass': config.passwd
		}
	});

function mapAssociations(associationJson){
	var associations = [];
	var topics = associationJson.associationSearchResponse.associationsTopics;
	for (var i = 0; i < topics.length; i++) {
		topicAssociations = topics[i].associations;
		associations.push.apply(associations, topicAssociations);
	};
	return associations;
}

function mapBackgroundAssociations(backgroundAssociationsJson){
	return backgroundAssociationsJson.ethersourceBackgroundAssociationSearchResponse.backgroundAssociations;
}

function getAssociationsAsync(callback) {
	authRequest(config.associationsUrl, function (error, response, body) {
	  	if (!error && response.statusCode == 200) {
	  		var associations = mapAssociations(JSON.parse(body));
	  		callback(null, associations);
	  	} else {
	  		callback({ 'msg': 'backend request failed', 'statusCode': response.statusCode, 'error': error });
	  	}
	});
};

function getBackgroundAssociationsAsync(callback) {
	authRequest(config.backgroundAssociationsUrl, function (error, response, body) {
	  	if (!error && response.statusCode == 200) {
	  		var associations = mapBackgroundAssociations(JSON.parse(body));
	  		callback(null, associations);
	  	} else {
	  		callback({ 'msg': 'backend request failed', 'statusCode': response.statusCode, 'error': error });
	  	}
	});
};

app.get('/', function (req, res) {

	async.parallel({
			'trending': getAssociationsAsync,
			'stable': getBackgroundAssociationsAsync
		}, function(err, result) {
			res.json(result);
		});

});

// start server
var port = process.env.PORT || 3001;
app.listen(port);
console.log('Listening on port ' + port);