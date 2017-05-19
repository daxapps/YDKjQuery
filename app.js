
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
	correctCount: 0,
	incorrectCount: 0,
	choiceList: $(".choiceList")
};

var currentQuestion = state.questions[state.currentQuestionIndex].question
var numberOfChoices = state.questions[state.currentQuestionIndex].choices.length

// State management
function resetGame() {
	state.correctCount = 0;
	state.incorrectCount = 0;
	state.currentQuestionIndex = 0;
	$('.question').text(state.questions[0].question);
	$('.result').text('');
	$('.currentQuestionCount').text("1");
};

function checkAnswer() {
	$('h5').hide();
	var value = $("input[type='radio']:checked").val();
	if (value === undefined) {
		$('.result').show().text("Please answer question")
	} else if (value == state.questions[state.currentQuestionIndex].correctAnswer) {
		$(".result").show().text("Correct! 😎")
		state.correctCount++;
		$('.correctCount').text(state.correctCount)
	} else if (value != state.questions[state.currentQuestionIndex].correctAnswer){
		$(".result").show().text("Incorrect 😭")
		$(".answerIs").show().text("The answer is " + 
			state.questions[state.currentQuestionIndex]
			.choices[state.questions[state.currentQuestionIndex]
			.correctAnswer])
		state.incorrectCount++;
		$(".incorrectCount").text(state.incorrectCount)
	}
};

function displayQuestion() {
	state.currentQuestionIndex++;
	if (state.currentQuestionIndex < state.questions.length) {
		$(".currentQuestionCount").text(state.currentQuestionIndex + 1);
		currentQuestion = state.questions[state.currentQuestionIndex].question;
		$(".question").text(currentQuestion);
		$('h5').show();
		displayAnswerChoices();
	} else {
		$('.quiz, .result, .submitButton, h5').hide()
		$('.startButton').show().text("Play Again?")			
	}
}

function displayAnswerChoices() {
	state.choiceList.empty();
	var choicesArray = state.questions[state.currentQuestionIndex].choices;
	for (var i = 0; i < numberOfChoices; i++) {	
		$('<li><input type="radio" value=' + i + ' name="dynradio" required/>' + " " + choicesArray[i] + '</li>').appendTo(state.choiceList);
	}
}

// Render functions
function renderIntroPage() {
	$(".score, .quiz, .result, .submitButton, h5").hide();
	$('.startButton').text("Start");
};

function renderQuestionPage() {
	resetGame();
	$('.correctCount').text(state.correctCount);
	$('.incorrectCount').text(state.incorrectCount);
	$(".result, .startButton, .explaination").hide();
	$(".score, .quiz, .submitButton, h5").show();
	$('.submitButton').text("Submit");
	displayAnswerChoices();
}

// Event listeners
$(".startButton").on("click", function(event) {
	event.preventDefault();

	renderQuestionPage();
})

$(".submitButton").on("click", function(event) { 
	event.preventDefault();
	
	checkAnswer();
})

$(".nextQuestionButton").on("click", function(event) {
	event.preventDefault();

	var value = $("input[type='radio']:checked").val();
	if (value === undefined) {
		$('.result').show().text("Please answer question")
	} else {		
		$('.result, .answerIs').hide();
		displayQuestion();
	}
})


$(function() {
	renderIntroPage();
});
