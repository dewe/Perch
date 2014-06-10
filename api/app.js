var express = require('express'),
    async = require('async'),
	gavagai = require('./gavagai.js'),
    app = express();

app.get('/api', function (req, res) {
	async.parallel({
			'trending': gavagai.getAssociationsAsync,
			'stable': gavagai.getBackgroundAssociationsAsync
		}, function(err, result) {
			res.json(err || result);
		});
});

// start server
var port = process.env.PORT || 3001;
app.listen(port);
console.log('Listening on port ' + port);