var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')

var boxColor = ['#FFFF00', '#FF0000', '#FF0066', '#FF00FF', '#00FFFF', '#33FF00']
var score = 0
var isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function startGame() {
  score = 0
  setGameTime()
  $gameTime.setAttribute('disabled', 'true')
  $timeHeader.classList.remove('hide')
  $resultHeader.classList.add('hide')
  isGameStarted = true
  $game.style.backgroundColor = '#757575'
  $start.classList.add('hide')

  var interrval = setInterval(function() {
    var time = parseFloat($time.textContent)

    if (time <= 0) {
      clearInterval(interrval)
      endGame()
    } else {
      $time.textContent = (time - 0.1).toFixed(1)
    }
  }, 100)

  renderBox()
}

function setGameScore() {
  $result.textContent = score.toString()
}

function setGameTime() {
  var time = +$gameTime.value
  $time.textContent = time.toFixed(1)
  $timeHeader.classList.remove('hide')
  $resultHeader.classList.add('hide')
}

function endGame() {
  isGameStarted = false
  setGameScore()
  $gameTime.removeAttribute('disabled')
  $start.classList.remove('hide')
  $game.innerHTML = ''
  $game.style.backgroundColor = '#3d3d3d'
  $timeHeader.classList.add('hide')
  $resultHeader.classList.remove('hide')
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return
  }

  if(event.target.dataset.box) {
    score++
    renderBox()
  }
}

function renderBox() {
  $game.innerHTML = ''
  var box = document.createElement('div')
  var boxSize = getRandom(30, 100)
  var gameSize = $game.getBoundingClientRect()
  var maxTop = gameSize.height - boxSize
  var maxLeft = gameSize.width - boxSize
  var randomColorIndex = getRandom(0, boxColor.length)

  box.style.height = box.style.width = boxSize + 'px'
  box.style.position = 'absolute'
  box.style.borderRadius = '50%'
  box.style.backgroundColor = boxColor[randomColorIndex]
  box.style.top = getRandom(0, maxTop) + 'px'
  box.style.left = getRandom(0, maxLeft) + 'px'
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', 'true')

  $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}