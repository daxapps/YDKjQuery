
var state = {
  items: []
};

// var qnaTemplete = (
// 	);

var questions = [{
	question: "Create a new jQuery object with elements added to the set of matched elements.",
	choices: [".add()", ".eq()", ".find()", ".delay"],
	correctAnswer: 0
}, {
	question: "Reduce the set of matched elements to the one at the specified index.",
	choices: [".add()", ".eq()", ".find()", ".delay"],
	correctAnswer: 1
}, {
	question: "Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.",
	choices: [".add()", ".eq()", ".find()", ".delay"],
	correctAnswer: 2
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

// State management


// DOM manipulation

function displayCurrentQuestion() {
	
	var question = questions[currentQuestion].question;
	var choiceList = $(document).find(".choiceList");
	var numChoices = questions[currentQuestion]. choices.length;

	$(".question").text(question);
	$(choiceList).find("li").remove();
	
	var choice;
	for (i = 0; i < numChoices; i++) {
		choice = questions[currentQuestion].choices[i];
		$('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
	}
	console.log(question)
}

// Event listeners
$("button").on("click", function() {
	currentQuestion++;

	// value = $("input[type='radio']:checked").val();
	// if (value === questions[currentQuestion].correctAnswer) {

	// }
	if (currentQuestion < questions.length) {
       displayCurrentQuestion();
    }
})


$(function() {
	displayCurrentQuestion();

});