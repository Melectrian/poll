var mongoose = require('mongoose');
var models = require('./models');

module.exports = {
	getPollQuestion: function() {

        var promise = new Promise(function(resolve, reject) {

            models.getQuestionModel().find({}, function(err, result) {

                if (err) {
                    reject(Error(err));
                }
                else {
                    resolve(result);
                }

            });

        });

        return promise;

	},
	getCustomAnswers: function() {

        var promise = new Promise(function(resolve, reject) {

            models.getAnswerModel().aggregate({ $sample: { size: 5 } }, function(err, result) {

                if (err) {
                    reject(Error(err));
                }
                else {
                    resolve(result);
                }

            });

        });

        return promise;

	},

    addCustomAnswer: function(data) {

        var promise = new Promise(function(resolve, reject) {

            var answerObject = models.getAnswerModel();
            var newAnswer = new answerObject({ answer: data.answer });

            newAnswer.save(function(err, result) {

                if (err) {
                    reject(Error(err));
                }
                else {
                    resolve(result);
                }

            });

        });

        return promise;

    },
	updatePoll: function(data) {

        var promise = new Promise(function(resolve, reject) {

            models.getQuestionModel().findOne(function(err, result) {

            	for(var i=0; i<result.answers.length; i++) 
                    if( result.answers[i].content === data.answer ) {

                        ++result.answers[i].count;

                    }

            	result.save(function(err, result) {

	                if (err) {
	                    reject(Error(err));
	                }
	                else {
	                    resolve(result);
	                }

            	});

            });

        });

        return promise;

	}
}