var express = require('express');
var app = express();
var consts = require('./config/consts');
var morgan = require('morgan');
//app.use(morgan('combined', {stream: accessLogStream}));
//var accessLogStream = fs.createWriteStream('./log/access.log', {flags: 'a'});

app.use(morgan('dev'));
app.use(express.static(consts.STATIC_ROOT));

app.use('/api', function(req, res, next) {
    res.send('api');
});


app.use(function(req, res, next) {
    if (!consts.REG_OF_NOT_NG_PATH.test(req.path)) {
        res.sendfile(consts.STATIC_ROOT + '/index.html');
    } else {
        next();
    }
});

app.listen(consts.SERVER_PORT);
console.log('App listening on port ' + consts.SERVER_PORT);