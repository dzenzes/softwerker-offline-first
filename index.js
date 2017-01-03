var express    = require('express');        
var app        = express();                 
var uuid = require('node-uuid');

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 8080;        

var router = express.Router();    


router.get('/', function(req, res) {
    res.json({ uuid: uuid.v4() });   
});

app.use('/uuid', router);

app.listen(port);
console.log('Magic happens on port ' + port);