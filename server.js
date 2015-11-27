var express = require('express');
var app = express();
var port = 9090;
var morgan = require('morgan');

app.use(express.static('./frontend'));
app.use(morgan('dev'));

app.use(function(req, res) {
    var path = req.path;
    //console.log(path);
    if ( /^\/api/gi.test(path)) {
        res.send('api');
    } else if (/^\/example/gi.test(path)) {
        res.sendfile('./frontend/example/index.html');
    } else {
        console.log(path);
        res.sendfile('./frontend/index.html');
    }
});

app.listen(port);
console.log("App listening on port " + port);