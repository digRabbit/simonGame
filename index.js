// Variables
let gameStarted = false
let boxList = $(".soft-box")
let order = []
let step = 0
let level = 1

let main = () => {
  $(document).keydown(function () {
    startGame()
  })
}

// Starts the game
function startGame() {
  if (gameStarted) return
  changeLevelUI()
  gameStarted = true
  $("h1").text("Level 1")
  nextBox()
  startListening()
}

// Adjusts UI
function changeLevelUI() {
  $("h1").text(`Level ${level}`)
  $("h2").text(`${step}/${level}`)
}

// Selects and winks the next box
function nextBox() {
  setTimeout(() => {
    winkBox(selectRandomBox())
  }, 1000)
}

// animate given box to wink
function winkBox(box) {
  box.animate({ opacity: 0 }, 100)
}

// selects a random box, pushes it to order array and returns the selected box object
function selectRandomBox() {
  let randomNumber = Math.floor(Math.random() * 4)
  order.push(boxList[randomNumber].classList[1])
  return boxList[randomNumber]
}

function startListening() {
  boxList.click((e) => {
    boxClick(e.target)
    if (e.target.classList[1] == order[step]) {
      step++
      changeLevelUI()
    } else {
      gameOver()
    }
    if (step == level) {
      nextLevel()
    }
  })
}

function nextLevel() {
  step = 0
  level++
  changeLevelUI()
  nextBox()
}

//changes the opacity to simulate click
function boxClick(box) {
  box.animate({ opacity: 0.5 }, 100)
}

function gameOver() {
  boxList.off()
  $("h2").addClass("hidden")
  $("h1").text(`YOU FAILED MISERABLY`)
}

main()
