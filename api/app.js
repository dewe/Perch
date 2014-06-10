var fs = require('fs'),
    express = require('express'),
    app = express();

app.get('/', function (req, res) {

  fs.readFile(__dirname + '/test/trending_sample.json', 'utf8', function(err, text) {
    var data = JSON.parse(text);
    res.json(200, data);
  });

});

// start server
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port ' + port);