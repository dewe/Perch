var config = require('./config.js'),
	request = require('request');

var apiRequest = request.defaults({
	'auth': {
		'user': config.userid,
		'pass': config.passwd
		}
	});

function getAssociationsAsync(callback) {
	apiRequest(config.associationsUrl, function (error, response, body) {
	  	if (!error && response.statusCode == 200) {
	  		var associations = mapAssociations(JSON.parse(body));
	  		callback(null, associations);
	  	} else {
	  		callback({ 'msg': 'backend request failed', 'statusCode': response.statusCode, 'error': error });
	  	}
	});
}

function mapAssociations(associationJson) {
	var associations = [];
	var topics = associationJson.associationSearchResponse.associationsTopics;
	for (var i = 0; i < topics.length; i++) {
		associations.push.apply(associations, topics[i].associations);
	};
	return associations;
}

function getBackgroundAssociationsAsync(callback) {
	apiRequest(config.backgroundAssociationsUrl, function (error, response, body) {
	  	if (!error && response.statusCode == 200) {
	  		var associations = mapBackgroundAssociations(JSON.parse(body));
	  		callback(null, associations);
	  	} else {
	  		callback({ 'msg': 'backend request failed', 'statusCode': response.statusCode, 'error': error });
	  	}
	});
};

function mapBackgroundAssociations(backgroundAssociationsJson){
	return backgroundAssociationsJson.ethersourceBackgroundAssociationSearchResponse.backgroundAssociations;
}

module.exports.getAssociationsAsync = getAssociationsAsync;
module.exports.getBackgroundAssociationsAsync = getBackgroundAssociationsAsync;