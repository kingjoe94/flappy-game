const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreValue = document.getElementById("scoreValue");
const gamePrompt = document.getElementById("gamePrompt");
const promptScore = document.getElementById("promptScore");
const promptAction = document.getElementById("promptAction");
const width = canvas.width;
const height = canvas.height;
const player = {
  x: 90,
  y: 220,
  size: 48,
  velocityY: 0,
};
const images = {
  player: new Image(),
  obstacleTop: new Image(),
  obstacleBottom: new Image(),
  background: new Image(),
};
images.player.src = "assets/player.png";
images.obstacleTop.src = "assets/obstacle_top.png";
images.obstacleBottom.src = "assets/obstacle_bottom.png";
images.background.src = "assets/background_wide.png";
const gravity = 0.45;
const jumpPower = -6;
const playerStartY = 220;
const obstacleWidth = 56;
const gapHeight = 145;
const obstacleGapMargin = 70;
const baseObstacleSpeed = 4;
const obstacleSpeedIncreasePerScore = 0.2;
const spawnInterval = 90;
const minSpawnInterval = 42;
const spawnIntervalDecreasePerScore = 0.8;
const playerHitbox = {
  offsetX: 4,
  offsetY: 8,
  width: 40,
  height: 32,
};
const obstacleHitboxPadding = {
  left: 2,
  right: 2,
  top: 2,
  bottom: 2,
};
const debugMode = false;
let obstacles = [];
let frame = 0;
let score = 0;
let gameStarted = false;
let gameOver = false;
let isHoldingJump = false;
function endGame() {
  if (gameOver) {
    return;
  }

  gameOver = true;
  window.gameSounds.stopBgm();
  window.gameSounds.gameOver();
}
function resetGame() {
  player.y = playerStartY;
  player.velocityY = 0;
  obstacles = [];
  frame = 0;
  score = 0;
  gameOver = false;
  isHoldingJump = false;
  createObstacle(width - 200);
}

function getPlayerHitbox() {
  return {
    left: player.x + playerHitbox.offsetX,
    right: player.x + playerHitbox.offsetX + playerHitbox.width,
    top: player.y + playerHitbox.offsetY,
    bottom: player.y + playerHitbox.offsetY + playerHitbox.height,
  };
}

function getObstacleHitboxes(obstacle) {
  const x = obstacle.x + obstacleHitboxPadding.left;
  const hitboxWidth = obstacleWidth - obstacleHitboxPadding.left - obstacleHitboxPadding.right;

  return {
    top: {
      x,
      y: obstacleHitboxPadding.top,
      width: hitboxWidth,
      height: obstacle.gapY - obstacleHitboxPadding.top - obstacleHitboxPadding.bottom,
    },
    bottom: {
      x,
      y: obstacle.gapY + gapHeight + obstacleHitboxPadding.top,
      width: hitboxWidth,
      height: height - obstacle.gapY - gapHeight - obstacleHitboxPadding.top - obstacleHitboxPadding.bottom,
    },
  };
}

function jumpOrRestart() {
  if (!gameStarted) {
    gameStarted = true;
    resetGame();
    window.gameSounds.startBgm();
  }

  if (gameOver) {
    resetGame();
    window.gameSounds.startBgm();
    return;
  }

  player.velocityY = jumpPower;
  window.gameSounds.jump();
}

function startJumpHold() {
  isHoldingJump = true;
  jumpOrRestart();
}

function endJumpHold() {
  isHoldingJump = false;
}

function createObstacle(initialX = width) {
  const gapY = obstacleGapMargin + Math.random() * (height - gapHeight - obstacleGapMargin * 2);

  obstacles.push({
    x: initialX,
    gapY,
    passed: false,
  });
}

function getCurrentObstacleSpeed() {
  return baseObstacleSpeed + score * obstacleSpeedIncreasePerScore;
}

function getCurrentSpawnInterval() {
  return Math.max(minSpawnInterval, Math.round(spawnInterval - score * spawnIntervalDecreasePerScore));
}

function update() {
  if (!gameStarted || gameOver) {
    return;
  }

  frame += 1;
  player.velocityY += gravity;

  player.y += player.velocityY;

  if (frame % getCurrentSpawnInterval() === 0) {
    createObstacle();
  }

  const currentObstacleSpeed = getCurrentObstacleSpeed();

  for (const obstacle of obstacles) {
    obstacle.x -= currentObstacleSpeed;

    if (!obstacle.passed && obstacle.x + obstacleWidth < player.x) {
      obstacle.passed = true;
      score += 1;
      window.gameSounds.score();
    }

    if (isHitObstacle(obstacle)) {
      endGame();
    }
  }

  obstacles = obstacles.filter((obstacle) => obstacle.x + obstacleWidth > 0);

  const hitbox = getPlayerHitbox();

  if (hitbox.top < 0 || hitbox.bottom > height) {
    endGame();
  }
}

function isHitObstacle(obstacle) {
  const hitbox = getPlayerHitbox();
  const obstacleHitboxes = getObstacleHitboxes(obstacle);
  const obstacleLeft = obstacleHitboxes.top.x;
  const obstacleRight = obstacleHitboxes.top.x + obstacleHitboxes.top.width;
  const gapTop = obstacle.gapY - obstacleHitboxPadding.bottom;
  const gapBottom = obstacle.gapY + gapHeight + obstacleHitboxPadding.top;
  const overlapsX = hitbox.right > obstacleLeft && hitbox.left < obstacleRight;
  const outsideGap = hitbox.top < gapTop || hitbox.bottom > gapBottom;

  return overlapsX && outsideGap;
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(images.background, 0, 0, width, height);

  for (const obstacle of obstacles) {
    ctx.drawImage(images.obstacleTop, obstacle.x, 0, obstacleWidth, obstacle.gapY);
    ctx.drawImage(
      images.obstacleBottom,
      obstacle.x,
      obstacle.gapY + gapHeight,
      obstacleWidth,
      height - obstacle.gapY - gapHeight
    );
  }

  ctx.drawImage(images.player, player.x, player.y, player.size, player.size);

  if (debugMode) {
    drawDebugHitboxes();
  }

  updateUi();
}

function updateUi() {
  scoreValue.textContent = score;
  gamePrompt.classList.toggle("is-hidden", gameStarted && !gameOver);

  if (gameOver) {
    gamePrompt.querySelector("h1").textContent = "ゲームオーバー";
    gamePrompt.querySelector(".prompt-kicker").textContent = "RESULT";
    promptScore.textContent = `スコア ${score}`;
    promptAction.textContent = "スペース / タップでリトライ";
    return;
  }

  gamePrompt.querySelector("h1").textContent = "Flappy Game";
  gamePrompt.querySelector(".prompt-kicker").textContent = "READY";
  promptScore.textContent = "";
  promptAction.textContent = "スペース / タップでスタート";
}

function drawDebugHitboxes() {
  // Debug display: collision boxes for checking image and hitbox alignment.
  const hitbox = getPlayerHitbox();

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#ff2d2d";
  ctx.strokeRect(hitbox.left, hitbox.top, playerHitbox.width, playerHitbox.height);

  ctx.strokeStyle = "#2d6bff";
  for (const obstacle of obstacles) {
    const obstacleHitboxes = getObstacleHitboxes(obstacle);

    ctx.strokeRect(
      obstacleHitboxes.top.x,
      obstacleHitboxes.top.y,
      obstacleHitboxes.top.width,
      obstacleHitboxes.top.height
    );
    ctx.strokeRect(
      obstacleHitboxes.bottom.x,
      obstacleHitboxes.bottom.y,
      obstacleHitboxes.bottom.width,
      obstacleHitboxes.bottom.height
    );
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    if (!isHoldingJump) {
      startJumpHold();
    }
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    endJumpHold();
  }
});

canvas.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  startJumpHold();
});

canvas.addEventListener("pointerup", endJumpHold);
canvas.addEventListener("pointerleave", endJumpHold);
canvas.addEventListener("pointercancel", endJumpHold);

gameLoop();
