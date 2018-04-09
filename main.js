//taking CANVAS
let canvas = document.getElementById('mycanvas');
let ctx = canvas.getContext('2d');

//Creating variables and snake will be an object
let fruit = [];
let score = 0;
let direction = '';
let snake = [{
	x: 10,
	y: 10
}];

//checking all canvas and fill the snake boxes with red color
function drawSnake(){
	ctx.fillStyle = 'maroon';

	for(let i = 0; i < snake.length; i++){
		let x = snake[i].x * 30 + 2;
		let y = snake[i].y * 30 + 2;
		ctx.fillRect(x, y, 28, 28);
	}
}

//drawing player score at the top of the game
function drawScore(){
	let div = document.getElementById('score');
	div.innerHTML = 'Счет: '+score;
}

//creating fruint on the desk
function createFruit(){
	//taking random natural number and multiple it on 21
	let x = Math.floor(Math.random() * 21);
	let y = Math.floor(Math.random() * 21);
	
	//checking if fruit is already on the desk if not, creating new one
	for(let i = 0;i < snake.length; i++){
		if(x == snake[i].x && y == snake[i].y){
			createFruit();
			return;
		}
	}
	fruit.x = x;
	fruit.y = y;
}

//drawing fruit on the desk
function drawFruit(){
	let x = fruit.x * 30 + 2;
	let y = fruit.y * 30 + 2;
	ctx.fillStyle = 'gold';
	ctx.fillRect(x, y, 28, 28);
}

//checking what button player click and move the snake to that direction
document.onkeydown = function(event){
	if(event.keyCode == 37 && direction != 'RIGHT'){direction = 'LEFT'};
	if(event.keyCode == 38 && direction != 'DOWN'){direction = 'UP'};
	if(event.keyCode == 39 && direction != 'LEFT'){direction = 'RIGHT'};
	if(event.keyCode == 40 && direction != 'UP'){direction = 'DOWN'};
}

//moving snake
function snakeStep(){
	let obj = {};
	obj.x = snake[0].x;
	obj.y = snake[0].y;
	let x = 0;
	let y = 0;

	if(direction == 'LEFT'){x -= 1};
	if(direction == 'UP'){y -= 1};
	if(direction == 'RIGHT'){x += 1};
	if(direction == 'DOWN'){y += 1};

	obj.x = wallCollision(obj.x + x);
	obj.y = wallCollision(obj.y + y);

	if(direction){
		snake.pop();
		snake.unshift(obj);
	}
}

function wallCollision(value){
	if(value < 0){value = 20};
	if(value > 20){value = 0};
		return value;
}

function fruitCrash(){
	let x = snake[0].x;
	let y = snake [0].y;

	if(direction == 'LEFT'){x -= 1};
	if(direction == 'UP'){y -= 1};
	if(direction == 'RIGHT'){x += 1};
	if(direction == 'DOWN'){y += 1};
	
	if(fruit.x == x && fruit.y == y){
		let obj = {};
		obj.x = x;
		obj.y = y;
		snake.unshift(obj);
		createFruit();
		score+=10;
		return;
	}
	snakeStep();
}

function snakeCrash(){
	if(snake.length > 4){
		let x = snake[0].x;
		let y = snake[0].y;
		for(let i = 4; i < snake.length; i++){
			if(x == snake[i].x && y == snake[i].y){
				direction = '';
				snake = [{x: 10, y:10}];
				score = 0;
				createFruit();
			}
		}

	}
}

function game(){
	ctx.clearRect(0, 0, 632, 632);
	fruitCrash();
	drawFruit();
	drawSnake();
	snakeCrash();
	drawScore();
	setTimeout('game()', 300);
}

createFruit();
game();
