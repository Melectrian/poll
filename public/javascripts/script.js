//Get the pool statistics

function getStatistics() {
	
$.ajax({
	type: "POST",
	url: 'http://localhost:8080/statistics',
	data: {},
	success: function(result) {

		if(result.code != 0) {

			var labelData = [];
			var seriesData = [];

			for (var i = 0; i < result[0].answers.length; i++) {
				labelData.push(result[0].answers[i].content);
				seriesData.push(result[0].answers[i].count);
			};

			new Chartist.Bar('.ct-chart', {
			  labels: labelData,
			  series: [
			    seriesData
			  ]
			}, {
			  stackBars: true,
			  axisY: {
			    labelInterpolationFnc: function(value) {
			      return value;
			    }
			  }
			}).on('draw', function(data) {
			  if(data.type === 'bar') {
			    data.element.attr({
			      style: 'stroke-width: 30px'
			    });
			  }
			});

		} 

	},
	error: function(err) {

		alert('Error');

	},
	dataType: 'json'
});

}

//Get one of the other /user defined/ answers

function getRandomAnswers() {
	
$.ajax({
	type: "POST",
	url: 'http://localhost:8080/random',
	data: {},
	success: function(result) {

		if(result.code != 0) {

			$( '.other__answerlist' ).empty();

			for(var i=0; i<result.length; i++) 
				$( '.other__answerlist' ).append('<li class="other__answer animated bounceIn">' + result[i].answer +'</li>');

		} 

	},
	error: function(err) {

		alert('Error');

	},
	dataType: 'json'
});

}

//Send request to update the poll answers.

function sendData() {

	var answerData = {
		answer: '',
		type: 0
	}

	var elem = $('.selectedAnswer');

	if(elem.is( 'li' )) {
		answerData.answer = elem.text();
		answerData.type = 0;
	} else if(elem.is( 'textarea' )) {
		answerData.answer = elem.val();
		answerData.type = 1;
	}

	if( answerData.answer == '' ) alert('Please select an answer or provide a alternative one.');
	else {

		$.ajax({
			type: "POST",
			url: 'http://localhost:8080/update',
			data: answerData,
			success: function(result) {

				if(result.code == 1) {

					$('.poll__alternatetext').val('');
					$.fn.fullpage.moveSlideRight();
					clearSelection();
					getStatistics();
					getRandomAnswers();
					
				} 

			},
			error: function(err) {

				alert('Error');

			},
			dataType: 'json'
		});

	};

}

// Clear the currently selected item.

function clearSelection() {

	$('.poll__answer').each(function() {

		$( this ).removeClass('selectedAnswer');

	});
}

$(document).ready(function() {

	//Initialize sections and slides

	$('#fullpage').fullpage({

		controlArrows: false,
		keyboardScrolling: false

	});

	$('.poll__answer').click(function() {

		$('.poll__alternatetext').val('');
		clearSelection();
		$( this ).addClass('selectedAnswer');

	});

	$('.poll__alternatetext').focus(function() {
		clearSelection();
		$( this ).addClass('selectedAnswer');
	});

	$('.intro__logo').click(function() {

		$.fn.fullpage.moveSlideRight();

	});

	$('.poll__vote').click(function() {

		sendData();

	});

	$( '.poll__result' ).click(function() {

	$('.poll__alternatetext').val('');
	getRandomAnswers();
	getStatistics();
	$.fn.fullpage.moveSlideRight();

	});

	//Update the chart upon click

	$('.ct-chart').click(function() {

		getStatistics();

	});

	$('.other__generator').click(function() {

		getRandomAnswers();

	});

	$('.other__retry').click(function() {

		$.fn.fullpage.moveSlideLeft();	

	});

});