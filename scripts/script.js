const gameBoard = document.querySelector(".game-board");
const invetory = document.querySelector("#invetory");
const startScreen = document.querySelector(".start-screen");
const startButton = document.querySelector(".startButton");
const resetButton = document.querySelector(".resetButton");

const shovel = document.querySelector(".shovel");
const axe = document.querySelector(".axe");
const pickAxe = document.querySelector(".pickAxe");
const mineAxe = document.querySelector(".mineAxe");
const sky = document.querySelector(".sky");

const ROWS = 20;
const COLUMNS = 20;

let tileState;
let toolStatus = "";

let statusMatrix =
  [
    ['sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky'],
    ['sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky'],
    ['sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky'],
    ['sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky'],
    ['sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'cloud', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky'],
    ['sky', 'sky', 'sky', 'sky', 'cloud', 'cloud', 'cloud', 'cloud', 'sky', 'cloud', 'cloud', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky'],
    ['sky', 'sky', 'sky', 'cloud', 'cloud', 'cloud', 'cloud', 'cloud', 'cloud', 'cloud', 'cloud', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky'],
    ['sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'cloud', 'cloud', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'leaves', 'leaves', 'leaves', 'sky', 'sky'],
    ['sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'leaves', 'leaves', 'leaves', 'sky', 'sky'],
    ['sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'leaves', 'leaves', 'leaves', 'sky', 'sky'],
    ['sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'wood', 'sky', 'sky', 'sky'],
    ['sky', 'sky', 'sky', 'sky', 'leaves', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'wood', 'sky', 'sky', 'sky'],
    ['sky', 'sky', 'sky', 'leaves', 'leaves', 'leaves', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'rock', 'rock', 'sky', 'wood', 'sky', 'sky', 'rock'],
    ['topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth'],
    ['earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth'],
    ['gold', 'gold', 'gold', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth'],
    ['earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'gold', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth'],
    ['earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'redStone', 'earth', 'earth', 'earth', 'earth', 'earth'],
    ['earth', 'earth', 'earth', 'earth', 'redStone', 'redStone', 'redStone', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'gold', 'earth', 'earth', 'earth', 'redStone', 'earth'],
    ['earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth'],
    ['earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth'],
    ['earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'redStone', 'earth', 'earth', 'earth', 'earth', 'earth', 'gold', 'earth', 'earth', 'earth'],
  ];

const tools = {
  shovel: ["earth", "topEarth"],
  axe: ["wood", "leaves"],
  pickAxe: ["rock"],
  mineAxe: ["gold", "redStone"],
};

startButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  draw();
});

resetButton.addEventListener("click", () => {
  window.location.reload();
});

shovel.addEventListener("click", () => {
  toolStatus = "shovel";
  shovel.style.backgroundColor = "blue";
  axe.style.backgroundColor = "";
  pickAxe.style.backgroundColor = "";
  mineAxe.style.backgroundColor = "";
});

axe.addEventListener("click", () => {
  toolStatus = "axe";
  shovel.style.backgroundColor = "";
  axe.style.backgroundColor = "blue";
  pickAxe.style.backgroundColor = "";
  mineAxe.style.backgroundColor = "";
});

pickAxe.addEventListener("click", () => {
  toolStatus = "pickAxe";
  shovel.style.backgroundColor = "";
  axe.style.backgroundColor = "";
  pickAxe.style.backgroundColor = "blue";
  mineAxe.style.backgroundColor = "";
});

mineAxe.addEventListener("click", () => {
  toolStatus = "mineAxe";
  shovel.style.backgroundColor = "";
  axe.style.backgroundColor = "";
  pickAxe.style.backgroundColor = "";
  mineAxe.style.backgroundColor = "blue";
});

function draw() {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLUMNS; j++) {
      let status = statusMatrix[i][j];
      const tile = document.createElement("div");
      gameBoard.appendChild(tile);
      tile.classList.add(status);
      tile.setAttribute("yAxis", i);
      tile.setAttribute("xAxis", j);
    }
  }
}

gameBoard.addEventListener("click", (e) => {
  let tileClass = e.target.classList.value;
  invetory.style.borderColor = "#fff";
  if (tileState) {
    e.target.classList = tileState;
    tileState = "";
    invetory.classList = "";
  }

  switch (toolStatus) {
    case "shovel":
      if (tools.shovel.includes(tileClass)) {
        invetory.setAttribute("class", tileClass);
        e.target.classList.value = "sky";
      } else {
        shovel.style.backgroundColor = "red";
        setTimeout(() => {
          shovel.style.backgroundColor = "blue";
        }, 700);
      }
      break;
    case "axe":
      if (tools.axe.includes(tileClass)) {
        invetory.setAttribute("class", tileClass);
        e.target.classList.value = "sky";
      } else {
        axe.style.backgroundColor = "red";
        setTimeout(() => {
          shovel.style.backgroundColor = "blue";
        }, 700);
      }
      break;
    case "pickAxe":
      if (tools.pickAxe.includes(tileClass)) {
        invetory.setAttribute("class", tileClass);
        e.target.classList.value = "sky";
      } else {
        pickAxe.style.backgroundColor = "red";
        setTimeout(() => {
          shovel.style.backgroundColor = "blue";
        }, 700);
      }
      break;

    case "mineAxe":
      if (tools.mineAxe.includes(tileClass)) {
        invetory.setAttribute("class", tileClass);
        e.target.classList.value = "sky";
      } else {
        mineAxe.style.backgroundColor = "red";
        setTimeout(() => {
          shovel.style.backgroundColor = "blue";
        }, 700);
      }
      break;
  }
});

invetory.addEventListener("click", () => {
  tileState = invetory.classList.value;
  invetory.style.borderColor = "blue";
});