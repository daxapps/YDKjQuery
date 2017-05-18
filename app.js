
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

// State management
function startQuiz() {
	currentQuestion = 0;
	correctCount = 0;
	incorrectCount = 0;
	$('.result').text('');

	if (quizStart === false){
		$(".score, .quiz, .result, .submitButton, h5").hide();
		$('.startButton').text("Start");
		$('.currentQuestion').text("1")
	} 
	if (quizStart === true){
		$('.correctCount').text(correctCount)
		$('.incorrectCount').text(incorrectCount)

		$(".result, .startButton, .explaination").hide();
		$(".score, .quiz, .result, .submitButton, h5").show();
		$('.submitButton').text("Submit");
		$('.currentQuestion').text('1')

	}
}

function displayNextQuestion() {
	currentQuestion++;
	// console.log(currentQuestion, questions.length)
	if (currentQuestion < questions.length) {
		$(".currentQuestion").text(currentQuestion + 1);
		displayCurrentQuestion();

	} else {
		quizStart = true;

		$('.quiz, .result, .submitButton').hide()
		$('.startButton').show().text("Play Again?")			
	}
}

// DOM manipulation

function displayCurrentQuestion() {
	
	var question = questions[currentQuestion].question;
	var choiceList = $(".choiceList");
	var numChoices = questions[currentQuestion]. choices.length;

	$(".question").text(question);
	choiceList.empty();

	var choice;
	for (var i = 0; i < numChoices; i++) {
		choice = questions[currentQuestion].choices[i];
		$('<li><input type="radio" value=' + i + ' name="dynradio" required/>' + " " + choice + '</li>').appendTo(choiceList);
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
	event.preventDefault();
	console.log("submitBTN pressed")
	
	$('h5').hide();
	var value = $("input[type='radio']:checked").val();

	console.log(value)
	if (value === undefined) {
		$('.result').show().text("Please answer question")
	} else if (value == questions[currentQuestion].correctAnswer) {
		$(".result").show().text("Correct! 😎")
		correctCount++;
		$('.correctCount').text(correctCount)
	} else if (value != questions[currentQuestion].correctAnswer){
		$(".result").show().text("Incorrect 😭")
	
		$(".answerIs").show().text("The answer is " + questions[currentQuestion].choices[questions[currentQuestion].correctAnswer])
		incorrectCount++;
		$(".incorrectCount").text(incorrectCount)
	}
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
	// 	if (value == questions[currentQuestion].correctAnswer) {
	// 			correctCount++;
	// 		$('.correctCount').text(correctCount)
	// } else if (value != questions[currentQuestion].correctAnswer){
	// 			incorrectCount++;
	// 		$(".incorrectCount").text(incorrectCount)
	// }
		displayNextQuestion();
	}
	
})


$(function() {
	startQuiz();
});
