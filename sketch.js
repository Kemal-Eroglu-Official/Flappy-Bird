let bird_w = 50; 
let birds = [];
let g = 1;

let col_w = 100;
let space = 200;
let column_speed = 15;
let columns = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	bird = new Bird();
	createColumn();
}

function draw() {
	background(255);
	
	for (let b of birds) {
		if (!b.IsOver()) {

		}
	}

		if (columns[columns.length - 1].x < width - 2.5 * space) {
			createColumn();
		}

		bird.update();
		bird.show();

		for (let col of columns) {
			col.update();
			col.show();
		}
}

// function keyReleased () {
	
// 	if (keyCode == 32) {
// 		if (!bird.IsOver()) {
// 			bird.jump();
// 		}
// 		else {
// 			restartGame();
// 		}
// 	}
// }

function restartGame () {
	bird.restart();
	columns = [];
	createColumn();
}

function createColumn () {

	let h = random(100, height - space - 100)
	columns.push(new Column(h, "up"));
	columns.push(new Column(height - h - space, "down"));
}

class Column {

	constructor (h, mode) {
		this.x = width - col_w;
		this.height = h;
		this.isScoreTaken = false;
		
		if (mode == "up") {
			this.y = 0;
		}
		else if (mode == "down") {
			this.y = height - h;
		}
	}

	show () {
		rectMode(CORNER);
		fill(bird.color);
		rect(this.x, this.y, col_w, this.height);
	}

	update () {
		this.x -= column_speed; 

		if (this.x + col_w < 0) {
			for (let i = 2; i < columns.length; i++) {
				columns[i - 2] = columns[i];
			}
			columns.pop();
			columns.pop();
		}
	}
}

class Bird {

	constructor () {
		this.x = floor(windowWidth / 10);
		this.y = floor(windowHeight / 2);
		let r = random(255);
		let g = random(255);
		let b = random(255);
		this.color = color(r, g, b);
		this.isOver = false;
		this.V_y = 0;

		this.score = 0;
	}

	restart () {
		this.x = floor(windowWidth / 10);
		this.y = floor(windowHeight / 2);
		this.isOver = false;
		this.V_y = 0;
	}

	update () {
		this.y += this.V_y;
		this.V_y += g;

		for (let col of columns) {

			let cond1 = (this.x + bird_w >= col.x + col_w);
			let cond2 = (col.isScoreTaken == false);

			if (cond1 && cond2) {
				col.isScoreTaken = true;
				this.score++;
				console.log(this.score);
			}
		}
	}

	show () {
		fill(this.color);
		noStroke();
		rectMode(CORNER);
		ellipse(this.x, this.y, bird_w, bird_w);
	}

	IsOver () {
		if (0 < this.y && this.y < height) { // inside of canvas
			for (let col of columns) {
				let cond1 = this.x + bird_w < col.x;

				let cond2 = this.x > col.x + col_w;

				let cond3 = this.y + bird_w < col.y;

				let cond4 = this.y > col.y + col.height;

				if ( !(cond1 || cond2 || cond3 || cond4) ) {
					this.isOver = true;
				} 
			}
		} 
		else {
			this.isOver = true;
		}

		return this.isOver;
	}

	jump () {
		this.V_y = -15;
	}
}