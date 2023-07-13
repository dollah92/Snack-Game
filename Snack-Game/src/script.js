const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let xVelocity = 0;
let yVelocity = 0;
let score = 0;
let gameOver = false;
let updateInterval = 200;

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "#33ff33";
    context.fillRect(
      snake[i].x * gridSize,
      snake[i].y * gridSize,
      gridSize,
      gridSize
    );

    // Add animation effect to the snake
    context.strokeStyle = "#226622";
    context.lineWidth = 2;
    context.strokeRect(
      snake[i].x * gridSize,
      snake[i].y * gridSize,
      gridSize,
      gridSize
    );
  }
}

function drawFood() {
  context.fillStyle = "#ff3333";
  context.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  // Add animation effect to the food
  context.fillStyle = "#ff9999";
  context.fillRect(
    food.x * gridSize + 2,
    food.y * gridSize + 2,
    gridSize - 4,
    gridSize - 4
  );
}

function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
  snake.unshift(head);

  if (snake[0].x === food.x && snake[0].y === food.y) {
    score++;
    generateFood();
  } else {
    snake.pop();
  }
}

function generateFood() {
  food.x = Math.floor(Math.random() * tileCount);
  food.y = Math.floor(Math.random() * tileCount);
}

function checkCollision() {
  if (
    snake[0].x < 0 ||
    snake[0].x >= tileCount ||
    snake[0].y < 0 ||
    snake[0].y >= tileCount
  ) {
    gameOver = true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      gameOver = true;
      break;
    }
  }
}

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (!gameOver) {
    drawSnake();
    drawFood();
    moveSnake();
    checkCollision();

    context.fillStyle = "#fff";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, 20);

    setTimeout(update, updateInterval);
  } else {
    context.fillStyle = "#fff";
    context.font = "30px Arial";
    context.fillText("Game Over!", canvas.width / 2 - 100, canvas.height / 2);
    drawPlayAgainButton();
  }
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  const up = 38,
    down = 40,
    left = 37,
    right = 39;

  if (keyPressed === up && yVelocity !== 1) {
    xVelocity = 0;
    yVelocity = -1;
  } else if (keyPressed === down && yVelocity !== -1) {
    xVelocity = 0;
    yVelocity = 1;
  } else if (keyPressed === left && xVelocity !== 1) {
    xVelocity = -1;
    yVelocity = 0;
  } else if (keyPressed === right && xVelocity !== -1) {
    xVelocity = 1;
    yVelocity = 0;
  }
}

function drawPlayAgainButton() {
  const buttonWidth = 150;
  const buttonHeight = 50;
  const buttonX = canvas.width / 2 - buttonWidth / 2;
  const buttonY = canvas.height / 2 + 50;

  context.fillStyle = "#33cc33";
  context.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

  context.fillStyle = "#fff";
  context.font = "20px Arial";
  context.fillText("Play Again", buttonX + 25, buttonY + 30);

  canvas.addEventListener("click", handleButtonClick);
}

function handleButtonClick(event) {
  const clickX = event.clientX - canvas.offsetLeft;
  const clickY = event.clientY - canvas.offsetTop;

  const buttonWidth = 150;
  const buttonHeight = 50;
  const buttonX = canvas.width / 2 - buttonWidth / 2;
  const buttonY = canvas.height / 2 + 50;

  if (
    clickX >= buttonX &&
    clickX <= buttonX + buttonWidth &&
    clickY >= buttonY &&
    clickY <= buttonY + buttonHeight
  ) {
    resetGame();
    canvas.removeEventListener("click", handleButtonClick);
  }
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  food = { x: 5, y: 5 };
  xVelocity = 0;
  yVelocity = 0;
  score = 0;
  gameOver = false;
  update();
}

document.addEventListener("keydown", changeDirection);
generateFood();
update();
