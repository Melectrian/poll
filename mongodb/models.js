var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema( {

    question: String,
    count: Number,
    answers: [{

    	content: String,
    	count: Number

    }]

}, { collection: 'question' });

var answerSchema = new mongoose.Schema( {

    answer: String

}, { collection: 'answers' } );

module.exports = {
    
    getQuestionModel: function() {



        var model = mongoose.model('question', questionSchema);
        
        return model;

    },
    getAnswerModel: function() {

        var model = mongoose.model('answers', answerSchema);
        
        return model;

    }

}