// Create a start quiz function that hides the .welcome-container and show .question-container
let timeEl = document.getElementById('time')
let homepageContainerEl = document.querySelector('.homepage-container')
let questionsContainerEl = document.querySelector('.questions-container')
let resultsContainerEl = document.querySelector('.results-container')
let answerStatusContainerEl = document.getElementById('answerStatus-container')
let answerStatusEl = document.getElementById('answerStatus')

let time = 60;

let startBtn = document.getElementById('startBtn')
let questionsListEl = document.getElementById('questions-list')
let answeraEl = document.getElementById('answera')
let answerbEl = document.getElementById('answerb')
let answercEl = document.getElementById('answerc')
let answerdEl = document.getElementById('answerd')
let finalScoreEl = document.getElementById('final-score')
let submitScoreBtn = document.getElementById('submitScoreBtn')
let initialsInput = document.getElementById('initialsInput')

let timerIntervalID = null;

function startQuiz() {
	timerIntervalID = setInterval(updateTime, 1000);
	homepageContainerEl.classList.add('hidden')
	questionsContainerEl.classList.remove("hidden")
	generateQuestion()
}

startBtn.onclick = startQuiz;

// create an array of questions with multiple choices
let questionsArray = [
	{
		question: 'What is the capital of the US?',
		answers: ['Chicago, IL', 'Nashville, TN', 'Seattle, WA', 'Washington, DC'],
		correctAnswer: 'Washington, DC'
	},
	{
		question: 'What is the capital of the Canada?',
		answers: ['Toronto', 'Montreal', 'Ottawa', 'Vancouver'],
		correctAnswer: 'Ottawa'
	},
	{
		question: 'What is the capital of the Germany?',
		answers: ['Berlin', 'Hamburg', 'Frankfurt', 'Munich'],
		correctAnswer: 'Berlin'
	},
]

let currentQuestionIndex = 0

function generateQuestion() {
	let currentQuestion = questionsArray[currentQuestionIndex] 

	questionsListEl.textContent = currentQuestion.question

	answeraEl.textContent = currentQuestion.answers[0]
	answerbEl.textContent = currentQuestion.answers[1]
	answercEl.textContent = currentQuestion.answers[2]
	answerdEl.textContent = currentQuestion.answers[3]

	answeraEl.onclick = incrementQuestionIndex
	answerbEl.onclick = incrementQuestionIndex
	answercEl.onclick = incrementQuestionIndex
	answerdEl.onclick = incrementQuestionIndex
}

// Create a function that increments the currentQuestionIndex by 1 when an answer button is clicked
function incrementQuestionIndex() {
	console.log(this)
	let buttonElAnswer = this.innerText
	console.log('buttonElAnswer: ', buttonElAnswer);
	checkAnswer(buttonElAnswer)
	
	currentQuestionIndex++

	if (currentQuestionIndex > questionsArray.length - 1) {
		console.log('All done!')
		questionsContainerEl.classList.add('hidden')
		resultsContainerEl.classList.remove('hidden')
		finalScoreEl.textContent = `Your final score is ${time + 1}!`
		clearInterval(timerIntervalID)
		return
	}

	generateQuestion()
}

function updateTime() {
	timeEl.textContent = `Time: ${time}`
	time--
	if (time < 0) {
		time = 0;
		questionsContainerEl.classList.add('hidden')
		resultsContainerEl.classList.remove('hidden')
		finalScoreEl.textContent = `Your final score is 0!`
	}
}

function checkAnswer(answer) {
	let tooltipText = ''
	if (answer == questionsArray[currentQuestionIndex].correctAnswer) {
		console.log('correct')
		tooltipText = 'Correct!'
		answerStatusContainerEl.classList.remove('hidden')
		answerStatusEl.textContent = tooltipText
	} else {
		console.log('wrong')
		tooltipText = 'Wrong!'
		time = time - 10
		answerStatusContainerEl.classList.remove('hidden')
		answerStatusEl.textContent = tooltipText
	}
	setTimeout(() => {
		answerStatusContainerEl.classList.add('hidden')
	}, 1000);
}




let submitScore = function () {
    console.log("save button clicked")

    
    let data = {
	score: time,
	initials: ''
    }
    // add data
    localStorage.setItem("score", JSON.stringify(data))

    // read data
    let scoreData = localStorage.getItem('score')
    console.log('scoreData: ', scoreData);

    let parsedScoreData = JSON.parse(scoreData)
    console.log('parsedScoreData: ', parsedScoreData);

    console.log(parsedScoreData.initials + ' ' + parsedScoreData.score)

    let myFinalScore = (parsedScoreData.initials + ' ' + parsedScoreData.score)
    console.log(myFinalScore)

    myFinalScore
    
    submitScoreBtn.onclick = submitScore();
    







}

