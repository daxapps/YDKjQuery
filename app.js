
var state = {
  items: []
};

// var qnaTemplete = (
// 	);

var questions = [{
	question: "Create a new jQuery object with elements added to the set of matched elements.",
	choices: [".add()", ".eq()", ".find()", ".delay()"],
	correctAnswer: 0
}, {
	question: "Reduce the set of matched elements to the one at the specified index.",
	choices: [".add()", ".eq()", ".find()", ".delay()"],
	correctAnswer: 1
}, {
	question: "Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.",
	choices: [".add()", ".eq()", ".find()", ".delay()"],
	correctAnswer: 2
}, {
	question: "Set a timer to delay execution of subsequent items in the queue.",
	choices: [".add()", ".eq()", ".find()", ".delay()"],
	correctAnswer: 3
}, {
	question: "Execute the next function on the queue for the matched elements.",
	choices: [".dequeue()", ".eq()", ".find()", ".delay"],
	correctAnswer: 0
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizStart = false;
var quizOver = false;
var correctCount = 0;
var incorrectCount = 0;
// var questionsIndex = questions[0]

// State management
function startQuiz() {
	currentQuestion = 0;
	if (quizStart === false){
		$(".score, .quiz, .result, .submitButton").addClass("hidden");
		$('.startButton').text("Start");
	} 
	if (quizStart === true){
		$(".explaination, .result, .startButton").addClass('hidden');
		$(".score, .quiz, .result, .submitButton").removeClass("hidden");
		$('.submitButton').text("Submit");
	}
}

// DOM manipulation

function displayCurrentQuestion() {
	
	
	var question = questions[currentQuestion].question;
	var choiceList = $(document).find(".choiceList");
	var numChoices = questions[currentQuestion]. choices.length;

	$(".question").text(question);
	$(choiceList).find("li").remove();

	var choice;
	for (var i = 0; i < numChoices; i++) {
		choice = questions[currentQuestion].choices[i];
		$('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
	}
	console.log(question)
}

// Event listeners
$(".startButton").on("click", function(event) {
	event.preventDefault();

	quizStart = true;
	startQuiz();

	displayCurrentQuestion();
})

$(".submitButton").on("click", function(event) { 
	
	value = $("input[type='radio']:checked").val();
	console.log(value)

	if (value === undefined) {
		$('.result').text("Please answer the question.")
	} else {
		$('.result').hide()

		if (value == questions[currentQuestion].correctAnswer) {
			$(".result").show().text("Correct! 😎")
			correctCount++;
			$('.correctCount').text(correctCount)
		} else if (value != questions[currentQuestion].correctAnswer){
			$(".result").show().text("Incorrect 😭")
			incorrectCount++;
			$(".incorrectCount").text(incorrectCount)
		}

		currentQuestion++;
		// console.log(currentQuestion, questions.length)
		if (currentQuestion < questions.length) {
			$(".currentQuestion").text(currentQuestion + 1);
			displayCurrentQuestion();
		} else {
			// quizStart = false;
			$('.quiz, .result, .submitButton').hide()
			$('.startButton').show().text("Play Again?")
			
		}
		

	}

	
})


$(function() {
	// displayCurrentQuestion();
	startQuiz();

});