const row1 = document.querySelectorAll('.row1');
const row2 = document.querySelectorAll('.row2');
const row3 = document.querySelectorAll('.row3');
const row4 = document.querySelectorAll('.row4');

const modalWin = document.querySelector('.modal-win');
const modalOver = document.querySelector('.modal-over');

const scr = document.getElementById('score');
const bst = document.getElementById('best');
let score = 0;
let best = parseInt(localStorage.getItem('best')) || 0;

const colors = {
	'0' : '#cdc1b4',
	'2' : '#eee4da',
	'4' : '#eee1c9',
	'8' : '#f3b27a',
	'16' : '#f69664',
	'32' : '#f77c5f',
	'64' : '#f75f3b',
	'128' : '#edd073',
	'256' : '#edcc62',
	'512' : '#f4b136',
	'1024' : '#daff00',
	'2048' : '#59ff00'
};

const grid = [
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0]
];

const dom = [
	row1,
	row2,
	row3,
	row4
];


window.onload = init();
function init() {
	bst.innerHTML = best

	addNumber();
	addNumber();
}

function addNumber() {
	let options = [];

	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (grid[i][j] == 0) {
				options.push({
					x: i,
					y: j
				});
			}
		}
	}

	if (isWin()) {
		modalWin.style.display = 'block';
	}

	if (isGameOver()) {
		if (score > best) {
			localStorage.setItem('best', score);
		}

		modalOver.style.display = 'block';
	}

	if (options.length != 0) {
		let rand = options[Math.floor(Math.random() * options.length)];
		grid[rand.x][rand.y] = 2;
		draw();
	}
}

function draw() {
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (grid[i][j] != 0) {
				dom[i][j].innerHTML = grid[i][j];
				dom[i][j].style.backgroundColor = colors[grid[i][j]];
			} else {
				dom[i][j].innerHTML = '';
				dom[i][j].style.backgroundColor = colors[grid[i][j]];
			}
		}		
	}
}

function isWin() {
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (grid[i][j] == 2048) {
				return true;
			}
		}
	}

	return false;
}

function isGameOver() {
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (grid[i][j] == 0) {
				return false;
			}

			if (i != 3 && j != 3) {
				if (grid[i][j] == grid[i][j + 1]) {
					return false;
				}

				if (grid[i][j] == grid[i + 1][j]) {
					return false;
				}
			}

			if (i != 0 && j != 0) {
				if (grid[i][j] == grid[i][j - 1]) {
					return false;
				}

				if (grid[i][j] == grid[i - 1][j]) {
					return false;
				}
			}

		}
	}

	return true;
}

function updateScore(val) {
	score += val;

	scr.innerHTML = score;
}

document.addEventListener('keydown', (e) => {
	switch(e.keyCode) {

		// LEFT
		case 37:
			for (var a = 0; a < 4; a++) {
				for (let i = 0; i < 4; i++) {
					for (let j = 0; j < 4; j++) {
						if (j != 0) {
							// Collapse
							if (grid[i][j] == grid[i][j - 1]) {
								updateScore(grid[i][j - 1] *= 2);

								grid[i][j - 1] = grid[i][j] * 2;
								grid[i][j] = 0;
							}

							// Move
							if (grid[i][j - 1] == 0) {
								grid[i][j - 1] = grid[i][j];
								grid[i][j] = 0;
								draw();
							}
						}
					}
				}
			}
			addNumber();
		break;

		// RIGHT
		case 39:
			for (var a = 0; a < 4; a++) {
				for (let i = 0; i < 4; i++) {
					for (let j = 0; j < 4; j++) {
						if (j != 3) {
							// Collapse
							if (grid[i][j] == grid[i][j + 1]) {
								updateScore(grid[i][j + 1] *= 2);

								grid[i][j + 1] = grid[i][j] * 2;
								grid[i][j] = 0;
							}

							// Move
							if (grid[i][j + 1] == 0) {
								grid[i][j + 1] = grid[i][j];
								grid[i][j] = 0;
								draw();
							}
						}
					}
				}
			}
			addNumber();
		break;

		// UP
		case 38:
			for (var a = 0; a < 4; a++) {
				for (let i = 0; i < 4; i++) {
					for (let j = 0; j < 4; j++) {
						if (i != 0) {
							// Collapse
							if (grid[i][j] == grid[i - 1][j]) {
								updateScore(grid[i - 1][j] *= 2);

								grid[i - 1][j] = grid[i][j] * 2;
								grid[i][j] = 0;
							}

							// Move
							if (grid[i - 1][j] == 0) {
								grid[i - 1][j] = grid[i][j];
								grid[i][j] = 0;
								draw();
							}
						}
					}
				}
			}
			addNumber();
		break;

		// Down
		case 40:
			for (var a = 0; a < 4; a++) {
				for (let i = 0; i < 4; i++) {
					for (let j = 0; j < 4; j++) {
						if (i != 3) {
							// Collapse
							if (grid[i][j] == grid[i + 1][j]) {
								updateScore(grid[i + 1][j] *= 2);

								grid[i + 1][j] = grid[i][j] * 2;
								grid[i][j] = 0;
							}

							// Move
							if (grid[i + 1][j] == 0) {
								grid[i + 1][j] = grid[i][j];
								grid[i][j] = 0;
								draw();
							}
						}
					}
				}
			}
			addNumber();
		break;

	}
});