var express = require('express');
var router = express.Router();
var dbhandler = require('../mongodb/dbhandler');

/* GET home page. */
router.get('/', function(req, res, next) {

	res.render('index', 

		// Page content data. Should be fetched from a config file / database. No time now.
		// Make sure the answer values match the once in the db.

		{	question: 'What is the meaning of life, the universe and everything?', 
			bundle: [ 
						{ answer: '41' }, 
						{ answer: '42' }, 
						{ answer: 'It is all meaningless!' }, 
						{ answer: 'To win!' } 
					]
		});

});

/* POST */

router.post('/statistics', function(req, res, next) {

	dbhandler.getPollQuestion().then(function(result) {

		res.send(JSON.stringify( result ));

	}, function(err) {

		res.send(JSON.stringify( { "code": "0" } ));

	});

});

router.post('/update', function(req, res, next) {

	if(req.body.type == 0) {

		dbhandler.updatePoll(req.body).then(function(result) {

			res.send(JSON.stringify( { "code": "1" } ));

		}, function(err) {

			res.send(JSON.stringify( { "code": "0" } ));	

		});

	} else if(req.body.type == 1) {



		dbhandler.addCustomAnswer(req.body).then(function(result) {

			req.body.answer = 'Other';

			dbhandler.updatePoll(req.body).then(function(result) {

				res.send(JSON.stringify( { "code": "1" } ));

			}, function(err) {

				res.send(JSON.stringify( { "code": "0" } ));	

			});

		}, function(err) {

			res.send(JSON.stringify( { "code": "0" } ));	

		});

	}

});

router.post('/random', function(req, res, next) {

	dbhandler.getCustomAnswers().then(function(result) {

		res.send(JSON.stringify( result ));

	}, function(err) {

		res.send(JSON.stringify( { "code": "0" } ));

	});

});

module.exports = router;