var express = require('express');
var bodyParser = require('body-parser');

var serverPort = process.env.PORT || 3000;


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));

var db = require('./db.js')();
var models = require('./models.js')(db);

require('./routes.js')(app,models); // add routes to app

var server; // used for stopping and starting express

// allow the process getting shutdown gracefully
process.on('SIGTERM', function() {
  server.stop();
});

// export start and stop functions
module.exports = {
  start: function() {
    server = app.listen(serverPort);
    console.log("listening on ", serverPort);
  },
  stop: function() {
    server.stop();
  },
  app: app, // expose app for testing
  db: db // expose db for testing
};
