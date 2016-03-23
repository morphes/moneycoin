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
app.use(session({
    secret: '1&*hYJ6@k0#',
    resave: false,
    saveUninitialized: false,
    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
}));
app.use('/css', express.static(__dirname + '/public/css'));
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));
var client  = redis.createClient();

app.get('/', function (req, res) {
    console.log(req.session);
    res.render('index', {title: 'Hey', message: 'Hello there'});
});

app.post('/authenticate', function (req, res) {
    var login    = req.body.login,
        password = req.body.password;
    if(login == 'sazon@nxt.ru' && password == '123') {
        req.session.login = login;
        req.session.password = password;
        res.render('index', {title: 'Hey', message: 'Hello there', login: login, password: password});
    } else {
        res.render('index', {title: 'Hey', message: 'Not correct'});
    }
});

router.get('/hello', function (req, res) { res.send('GET request to the homepage'); });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
