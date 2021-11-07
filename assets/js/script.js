// define variables
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
let initialsInputEl = document.getElementById('initialsInput')
let highScoreEl = document.getElementById('highScore')

let timerInterval = null;

function startQuiz() {
	timerInterval = setInterval(updateTime, 1000);
	homepageContainerEl.classList.add('hidden')
	questionsContainerEl.classList.remove("hidden")
	generateQuestion()
}

startBtn.onclick = startQuiz;

let possibleQuestionsArray = [
	{
		question: 'Which of the following does NOT belong?',
		answers: ['<head>', '<div>', 'function()', '<body>'],
		correctAnswer: 'function()'
	},
	{
		question: 'In JavaScript, variables are set using..?',
		answers: ['var', 'let', 'const', 'all the above'],
		correctAnswer: 'all the above'
	},
	{
		question: 'What does HTML stand for?',
		answers: ['Hyper Text Markup Language', 'Hamburger Turtles Mountain Lion', 'Higher Text Markup Level', 'HTML does not stand for anything'],
		correctAnswer: 'Hyper Text Markup Language'
	},
	{
		question: 'id attributes can be associated with multiple HTML elements.',
		answers: ['True', 'False', 'It depends', 'True, but only on Friday'],
		correctAnswer: 'False'
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

function incrementLiveQuestions() {
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
		answerStatusText = 'Correct'
		answerStatusContainerEl.classList.remove('hidden')
		answerStatusEl.textContent = answerStatusText
	} else {
		answerStatusText = 'Incorrect'
		time = time - 10
		answerStatusContainerEl.classList.remove('hidden')
		answerStatusEl.textContent = answerStatusText
	}
	setTimeout(() => {
		answerStatusContainerEl.classList.add('hidden')
	}, 1000);
}

function handleScoreSubmit(ev) {
	ev.preventDefault()
	let inputValue = initialsInputEl.value
	console.log(inputValue)
	
	if (!inputValue) {
		alert('please enter your initials')
		return
	}
	let initials = inputValue
	let quizData = {
		score: time,
		initials: initials
		}
	

	localStorage.setItem('score', JSON.stringify(quizData))
						
	let highScoreliEl = document.createElement('li')
	highScoreliEl.innerText = inputValue + ' ' + time
	highScoreEl.appendChild(highScoreliEl)
}
submitScoreBtn.addEventListener('click', handleScoreSubmit)   

