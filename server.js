var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var moment = require('moment');
app.use(express.static(__dirname + '/public'));
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());

var router = express.Router();
router.use(function (request, response, next) {
    next();
});

router.route('/:date').get(function (request, response) {
    if (/^\d+$/.test(request.params.date)) {
        response.json({
            unix: parseInt(request.params.date),
            natural: moment.unix(request.params.date).format("MMMM D, YYYY")
        });
    }
    else if (moment(request.params.date).isValid()) {
        response.json({
            unix: moment(request.params.date).unix(),
            natural: moment(request.params.date).format('MMMM D, YYYY')
        });
    }
    else {
        response.json({
            unix: null,
            natural: null
        });
    }
});

app.use('/', router)
app.listen(port);