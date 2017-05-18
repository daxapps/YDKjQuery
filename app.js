
var state = {
  questions: [
  	{
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
	}],
	route: 'start',
	currentQuestionIndex: 0,
	
	quizStart: false,
	correctCount: 0,
	incorrectCount: 0,
	choiceList: $(".choiceList")
	
};

var currentQuestion = state.questions[state.currentQuestionIndex].question
var numberOfChoices = state.questions[state.currentQuestionIndex].choices.length

// State management
// function setRoute(state, route) {
//   state.route = route;
// };

function resetGame() {
	state.correctCount = 0;
	state.incorrectCount = 0;
	// state.currentQuestionIndex = 0;
	// setRoute(state, 'start');
	console.log(state.currentQuestionIndex)
	$('.result').text('');
	$('.currentQuestionCount').text("1");
};

function checkAnswer() {
	var value = $("input[type='radio']:checked").val();

	// console.log(value)
	if (value === undefined) {
		$('.result').show().text("Please answer question")
	} else if (value == state.questions[state.currentQuestionIndex].correctAnswer) {
		$(".result").show().text("Correct! 😎")
		state.correctCount++;
		$('.correctCount').text(state.correctCount)
	} else if (value != state.questions[state.currentQuestionIndex].correctAnswer){
		$(".result").show().text("Incorrect 😭")
	
		$(".answerIs").show().text("The answer is " + state.questions[state.currentQuestionIndex].choices[state.questions[state.currentQuestionIndex].correctAnswer])
		state.incorrectCount++;
		$(".incorrectCount").text(state.incorrectCount)
	}
};

function displayCurrentQuestion() {
	console.log("QI:" + state.currentQuestionIndex)

	$(".question").text(currentQuestion);
	// console.log(currentQuestion)
	state.choiceList.empty();

	// listAnswerChoices(numChoices, choice, choiceList);
	var choicesArray = state.questions[state.currentQuestionIndex].choices;
	// console.log(state.questions[currentQuestionIndex])
	for (var i = 0; i < numberOfChoices; i++) {
		
		$('<li><input type="radio" value=' + i + ' name="dynradio" required/>' + " " + choicesArray[i] + '</li>').appendTo(state.choiceList);
	}
}

function displayNextQuestion() {
	state.currentQuestionIndex++;
	// console.log("QI:" + state.currentQuestionIndex)
	if (state.currentQuestionIndex < state.questions.length) {
		$(".currentQuestionCount").text(state.currentQuestionIndex + 1);
		currentQuestion = state.questions[state.currentQuestionIndex].question;
		displayCurrentQuestion();
	} else {
		// quizStart = true;
		$('.quiz, .result, .submitButton, h5').hide()
		$('.startButton').show().text("Play Again?")			
	}
}

// Render functions
// function renderApp() {

// };

function renderIntroPage() {
	$(".score, .quiz, .result, .submitButton, h5").hide();
	$('.startButton').text("Start");
};

function renderQuestionPage() {
	state.currentQuestionIndex = 0;
	$('.question').text(currentQuestion);
	console.log("QI:" + state.currentQuestionIndex)

	resetGame();
	$('.correctCount').text(state.correctCount)
	$('.incorrectCount').text(state.incorrectCount)
	$(".result, .startButton, .explaination").hide();
	$(".score, .quiz, .submitButton, h5").show();
	$('.submitButton').text("Submit");
	displayCurrentQuestion();
	// $(".question").text(currentQuestion);
	// console.log(currentQuestion)
}





// Event listeners
$(".startButton").on("click", function(event) {
	event.preventDefault();

	renderQuestionPage();
})

$(".submitButton").on("click", function(event) { 
	event.preventDefault();
	
	$('h5').hide();
	checkAnswer();
})

$(".nextQuestionButton").on("click", function(event) {
	event.preventDefault();

	$('h5').show();
	var value = $("input[type='radio']:checked").val();
	console.log(value);
	if (value === undefined) {
		$('.result').show().text("Please answer question")
	} else {		
		$('.result, .answerIs').hide();
		displayNextQuestion();
	}
})


$(function() {
	renderIntroPage();
});
