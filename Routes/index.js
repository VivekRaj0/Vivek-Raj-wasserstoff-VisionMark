var express = require('express');
var router = express.Router();

import User from '../models/user.model';

var data_exporter = require('json2csv').Parser;

/* GET home page. */
router.get('/', function(req, res, next) {

    User.find(function(error, data){

        res.render('index', { title: 'Express', sample_data:data });

    });
    
});

router.get('/export', function(request, response, next){

    User.find(function(error, data){

        var mysql_data = JSON.parse(JSON.stringify(data));

        //convert JSON to CSV Data

        var file_header = ['First Name', 'UserName'];

        var json_data = new data_exporter({file_header});

        var csv_data = json_data.parse(mysql_data);

        response.setHeader("Content-Type", "text/csv");

        response.setHeader("Content-Disposition", "attachment; filename=sample_data.csv");

        response.status(200).end(csv_data);

    });

});

module.exports = router;