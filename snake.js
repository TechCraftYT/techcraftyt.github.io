const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20; // Size of each box
let snake = [{ x: 10 * boxSize, y: 10 * boxSize }]; // Initial snake
let direction = "RIGHT"; // Default direction
let food = {
  x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
  y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
};

let gameStarted = false; // Flag to check if the game has started

// Listen for key presses
document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
  const key = event.keyCode;

  if (!gameStarted && key === 32) {
    // Start the game when Spacebar is pressed
    gameStarted = true;
    gameLoop(); // Begin the game loop
    return;
  }

  if (gameStarted) {
    // Handle snake direction
    if (key === 37 && direction !== "RIGHT") direction = "LEFT";
    else if (key === 38 && direction !== "DOWN") direction = "UP";
    else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
    else if (key === 40 && direction !== "UP") direction = "DOWN";
  }
}

function drawStartScreen() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Press SPACE to Start", canvas.width / 2, canvas.height / 2);
}

function drawSnake() {
  snake.forEach((segment) => {
    ctx.fillStyle = "lime";
    ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
  });
}

function moveSnake() {
  const head = { ...snake[0] };

  if (direction === "LEFT") head.x -= boxSize;
  if (direction === "UP") head.y -= boxSize;
  if (direction === "RIGHT") head.x += boxSize;
  if (direction === "DOWN") head.y += boxSize;

  snake.unshift(head);

  // Check if snake eats food
  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
      y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
    };
  } else {
    snake.pop(); // Remove last segment
  }

  // Check collision with walls or itself
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height ||
    snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    alert("Game Over!");
    document.location.reload();
  }
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

function gameLoop() {
  if (!gameStarted) return; // Stop loop until the game starts
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFood();
  drawSnake();
  moveSnake();

  setTimeout(gameLoop, 100); // Schedule the next frame
}

// Initial screen
drawStartScreen();
