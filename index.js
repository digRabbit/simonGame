let gameStarted = false
let boxList = $(".soft-box")
let order = []
let step = 0
let level = 1
let maxStep = 1

let main = () => {
  $(document).keydown(function () {
    startGame()
  })
}

// this function will only be called at the start of the game.
function startGame() {
  if (gameStarted) return
  changeLevelUI()
  gameStarted = true
  $("h1").text("Level 1")
  setTimeout(() => {
    winkBox(selectRandomBox())
  }, 1000)
  startListening()
}

// selects a random box, pushes it to order array and returns the selected box object
function selectRandomBox() {
  let randomNumber = Math.floor(Math.random() * 4)
  order.push(boxList[randomNumber].classList[1])
  return boxList[randomNumber]
}

// animate given box to wink
function winkBox(box) {
  box.animate({ opacity: 0 }, 100)
}

function nextLevel() {
  step = 0
  level++
  maxStep++
  console.log("next level triggered")
  changeLevelUI()
  setTimeout(() => {
    winkBox(selectRandomBox())
  }, 1000)
}

function gameOver() {
  console.log("Failed")
  boxList.off()
  $("h2").addClass("hidden")
  $("h1").text(`YOU FAILED MISERABLY`)
}

function changeLevelUI() {
  $("h1").text(`Level ${level}`)
  $("h2").text(`${step}/${maxStep}`)
}

function startListening() {
  boxList.click((e) => {
    maxStep = level
    if (e.target.classList[1] == order[step]) {
      step++
      changeLevelUI()
    } else {
      gameOver()
    }
    if (step == maxStep) {
      nextLevel()
    }
  })
}

main()
