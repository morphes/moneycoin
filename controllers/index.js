var express = require('express')
  , router = express.Router()

router.get('/', function (req, res) {
    console.log(req.session);
    res.render('index', {title: 'Hey', message: 'Hello there'});
});

router.post('/authenticate', function (req, res) {
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

module.exports = router