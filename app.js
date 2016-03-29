var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
app.use(router);
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
var session = require('express-session');
var redis   = require("redis");
var redisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var client  = redis.createClient();
var fs = require('fs');
var configFile = 'config/config.json';

var config = JSON.parse(
    fs.readFileSync(configFile)
);

app.use(session({
    secret            : config.session.secret,
    resave            : config.session.resave,
    saveUninitialized : config.session.saveUninitialized,
    store : new redisStore({ 
        host   : config.redis.host, 
        port   : config.redis.port, 
        client : client,
        ttl    :  config.redis.ttl
    })
}));

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/css', express.static(__dirname + config.static.path));
app.use(require('./controllers'));

app.listen(7777, function () {
  console.log('Starting Application on Port 7777');
});
