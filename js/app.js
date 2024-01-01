const canvas = document.getElementById("canvas");
const score = document.querySelector(".hiScore span");

console.log(score);
let userName;
let moves = 0;

const ctx = canvas.getContext("2d");

let map = [
  [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 2],
  [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1],
  [0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0],
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
];

let player = {
  x: 0,
  y: 0,
  newX: 0,
  newY: 0,
};

let tileSize = 50;
let mapLenght = map[0].length;
let mapHeight = map.length;

let collBox = [];

let brick = new Image();
brick.src =
  "./brick-wall-brown-grey-tan-terracotta-paver-paving-path-floor-tile-seamless-building-texture-sample.jpg";

function drawMap(m) {
  for (let i = 0; i < mapHeight; i++) {
    collBox.push([]);
    for (let j = 0; j < mapLenght; j++) {
      if (map[i][j] === 1) {
        ctx.beginPath();
        // ctx.fillStyle = "#000000";
        // ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
        ctx.drawImage(brick, j * tileSize, i * tileSize, tileSize, tileSize);
      }
      if (map[i][j] === 2) {
        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
      }

      collBox[i].push({
        x: j * tileSize,
        y: i * tileSize,
        status: map[i][j] === 1 ? 1 : map[i][j] === 2 ? 2 : 0,
      });
    }
  }
}

function enterAccount() {
  userName = prompt("please enter your name");
}

function saveScore() {
  localStorage.setItem(userName, moves);
}

function getAllPlayer() {
  let playerScore = document.getElementById("highScore");
  for (let i = 0; i < localStorage.length; i++) {
    playerScore.innerHTML +=
      localStorage.key(i) + " " + localStorage.getItem(localStorage.key(i));
    playerScore.innerHTML += "<br/>";
  }
  playerScore.style.display = "block";
}

function drawPlayer(x, y) {
  ctx.beginPath();
  ctx.fillStyle = "#00ff00";
  ctx.fillRect(x, y, tileSize, tileSize);

  player.x = player.newX;
  player.y = player.newY;
}

function move(x, y) {
  ctx.clearRect(0, 0, mapLenght * tileSize, mapHeight * tileSize);
  drawMap(map);
  drawPlayer(x, y);
  moves = moves + 1;
  score.innerHTML = moves;
}

function collChek() {
  for (let i = 0; i < mapHeight; i++) {
    for (let j = 0; j < mapLenght; j++) {
      let collItem = collBox[i][j];

      if (player.newX === collItem.x && player.newY === collItem.y) {
        if (collItem.status === 1) {
          console.log("hit the rock");
        } else if (collItem.status === 2) {
          move(player.newX, player.newY);
          document.querySelector(".gameMessage").style.display = "block";
          saveScore();
          getAllPlayer();
        } else {
          move(player.newX, player.newY);
        }
      } else if (
        player.newX < 0 ||
        player.newX > mapLenght * tileSize ||
        player.newY < 0 ||
        player.newY > mapHeight * tileSize
      ) {
        console.log("hit wall");
      }
    }
  }
}

window.onkeydown = function (e) {
  if (e.keyCode === 37) {
    player.newX = player.x - tileSize;
    player.newY = player.y;
    console.log("left");
  } else if (e.keyCode === 38) {
    player.newX = player.x;
    player.newY = player.y - tileSize;
    console.log("top");
  } else if (e.keyCode === 39) {
    player.newX = player.x + tileSize;
    player.newY = player.y;
    console.log("right");
  } else if (e.keyCode === 40) {
    player.newX = player.x;
    player.newY = player.y + tileSize;
    console.log("down");
  }

  console.log(player.newX, player.newY);

  collChek();
};

window.onload = function () {
  enterAccount();
  drawMap(map);
  drawPlayer(0, 0);
};
