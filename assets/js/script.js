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

let timerInterval = null;

function startQuiz() {
	timerInterval = setInterval(updateTime, 1000);
	homepageContainerEl.classList.add('hidden')
	questionsContainerEl.classList.remove("hidden")
	generateQuestion()
}

startBtn.onclick = startQuiz;

// create an array of questions with multiple choices
let possibleQuestionsArray = [
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

let liveQuestioni = 0

function generateQuestion() {
	let liveQuestion = possibleQuestionsArray[liveQuestioni] 

	questionsListEl.textContent = liveQuestion.question

	answeraEl.textContent = liveQuestion.answers[0]
	answerbEl.textContent = liveQuestion.answers[1]
	answercEl.textContent = liveQuestion.answers[2]
	answerdEl.textContent = liveQuestion.answers[3]

	answeraEl.onclick = incrementLiveQuestions
	answerbEl.onclick = incrementLiveQuestions
	answercEl.onclick = incrementLiveQuestions
	answerdEl.onclick = incrementLiveQuestions
}

// Create a function that increments the liveQuestioni by 1 when an answer button is clicked
function incrementLiveQuestions() {
	console.log(this)
	let answerBtnEL = this.innerText
	confirmAnswer(answerBtnEL)
	
	liveQuestioni++

	if (liveQuestioni > possibleQuestionsArray.length - 1) {
		questionsContainerEl.classList.add('hidden')
		resultsContainerEl.classList.remove('hidden')
		finalScoreEl.textContent = `Your final score is ${time + 1}!`
		clearInterval(timerInterval)
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

function confirmAnswer(answer) {
	let answerStatusText = ''
	if (answer == possibleQuestionsArray[liveQuestioni].correctAnswer) {
		console.log('correct')
		answerStatusText = 'Correct'
		answerStatusContainerEl.classList.remove('hidden')
		answerStatusEl.textContent = answerStatusText
	} else {
		console.log('wrong')
		answerStatusText = 'Incorrect'
		time = time - 10
		answerStatusContainerEl.classList.remove('hidden')
		answerStatusEl.textContent = answerStatusText
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

