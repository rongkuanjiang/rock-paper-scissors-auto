let isAutoPlaying = false;
let intervalId;

document.querySelector('.js-rock-option').addEventListener('click', () => {
	document.querySelector('.js-rock-option').classList.add('active');
    setTimeout(() => {
      document.querySelector('.js-rock-option').classList.remove('active');
    }, 300);
	playGame('rock');
})
document.querySelector('.js-paper-option').addEventListener('click', () => {
	document.querySelector('.js-paper-option').classList.add('active');
    setTimeout(() => {
      document.querySelector('.js-paper-option').classList.remove('active');
    }, 300);
	playGame('paper');
})
document.querySelector('.js-scissors-option').addEventListener('click', () => {
	document.querySelector('.js-scissors-option').classList.add('active');
    setTimeout(() => {
      document.querySelector('.js-scissors-option').classList.remove('active');
    }, 300);
	playGame('scissors');
})

function playGame(playerMove) {
	const result = getResult(playerMove);
	scoreUpdate(result);
}

function getResult(playerMove) {

	let result;
	const computerMove = getComputerMove();

	//see who won
	if (playerMove === computerMove) {
		result = 'tie';
	} else if (playerMove === 'rock') {
		if (computerMove === 'paper') {
			result = 'lose';
		}
		else {
			result = 'win';
		}
	} else if (playerMove === 'paper') {
		if (computerMove === 'scissors') {
			result = 'lose';
		}
		else {
			result = 'win';
		}
	} else {
		if (computerMove === 'rock') {
			result = 'lose';
		}
		else {
			result = 'win';
		}
	}

	document.querySelector('.js-moves').innerHTML = `You: ${playerMove}, ${computerMove} Computer`;
	document.querySelector('.js-result').innerHTML = `You ${result}`;

	return result;
}

function scoreUpdate(result) {
	//get score
	const score = getScore();
	
	//update score internally
	if (result === 'win') {
		score.wins++;
	} else if (result === 'tie') {
		score.ties++;
	} else {
		score.losses++;
	}
	localStorage.setItem('score', JSON.stringify(score));

	//update score view
	document.querySelector('.js-score').innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
}

function resetScore() {
	localStorage.removeItem('score');
	const score = getScore();
	document.querySelector('.js-score').innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
	
}

function getScore() {
	let score = JSON.parse(localStorage.getItem('score'));
	
	if (score == undefined) {
		score = {
			wins: 0,
			losses: 0,
			ties: 0
		}
		localStorage.setItem('score', JSON.stringify(score));
	} 
	return score;
}


function getComputerMove() {
	let computerMove;
	
	const num = Math.random();
	//Generate computer move
	if (num <= 1/3) {
		computerMove = 'rock';
	} 
	else if (num <= 2/3) {
		computerMove = 'paper';
	}
	else {
		computerMove = 'scissors';
	}
	return computerMove;
}



function autoPlay() {
	if (!isAutoPlaying) {
	 	intervalId = setInterval(function () {
			const playerMove = getComputerMove();
			playGame(playerMove);
		}, 1000);
		isAutoPlaying = true;
	}
	else {
		clearInterval(intervalId);
		isAutoPlaying = false;
	}
}

