let levelCard = document.getElementById('level-card')
let play = document.getElementById('play')
let innerLevel = document.getElementById('inner-level')
let scoreCard = document.getElementById('score')
let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
let box = 32
let snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box,
}

let score = 0

let apple = {
    x: 0,
    y: 0
}

let level = 1
let direction = 'right'
let game

levelCard.style.display = 'none'

play.addEventListener('click', ()=> {
    game = setInterval(playGame, 300)    
    score = 0
    play.style.display = 'none'
    levelCard.style.display = 'block'
    appleRandomPos()
    
})


function levelUp() {
    level+= 1
    innerLevel.innerHTML = level
    game = setInterval(playgame, 300/level)
}


function createBG() {
    context.fillStyle = '#333'
    context.fillRect(0, 0, 16 * box, 16*box);
}

function appleRandomPos() {
    apple.x = Math.floor(Math.random() * 15 + 1) * box
    apple.y = Math.floor(Math.random() * 15 + 1) * box
}

function createSnake() {
    for (let i=0; i < snake.length; i++){
        context.fillStyle = 'lightblue'
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function drawFood() {
    context.fillStyle = 'white'
    context.fillRect(apple.x, apple.y, box, box)
}


document.addEventListener('keydown', update)


function update(e) {
    if (e.keyCode == 37 && direction != 'right') {
        direction = 'left'
    }
    if (e.keyCode == 38 && direction != 'down') {
        direction = 'up'
    }
    if (e.keyCode == 39 && direction != 'left') {
        direction = 'right'
    }
    if (e.keyCode == 40 && direction != 'up') {
        direction = 'down'
    }

}

function snakeOut() {
    
    if (snake[0].x > 15 * box && direction == 'right') {
        snake[0].x = 0
    }
    if (snake[0].x < 0 && direction == 'left') {
        snake[0].x = 16*box
    }
    if (snake[0].y < 0 && direction == 'up' ) {
        snake[0].y = 16 * box
    }
    if (snake[0].y > 15 * box && direction == 'down') {
        snake[0].y = 0
    }
}

function eatApple(snakeX, snakeY) {
    if (snakeX != apple.x || snakeY != apple.y) {
        return true
    }
    else {
        return false
    }
}


function collision() {
    
    for (let i= 1; i < snake.length; i++){
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            gameOver()
        }

    }

}

function snakeMoving() {

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    switch(direction) {

        case('right'):
            snakeX += box
            break
        
        case('left'):
            snakeX -= box
            break

        case('up'):
            snakeY -= box
            break
        
        case('down'):
            snakeY += box
            break
        
    }

    if (eatApple(snakeX, snakeY)) {
        snake.pop()
    }
    else {
        appleRandomPos()
        score+=10
        scoreCard.innerHTML = score
        if (score % 50  == 0) {
            levelUp()
        }
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead)

    snakeOut()   
}


function playGame() {

    createBG()
    drawFood()
    createSnake()
    snakeMoving()
    collision()

}


menu()
function menu() {
    context.fillStyle = '#333'
    context.fillRect(0, 0, 16 * box, 16*box);
    context.font = '30px Verdana'
    context.fillStyle = '#fff'
    context.textAlign = 'center'
    context.fillText('Click "Start Game" to play', canvas.width/2, canvas.height/2)
}


function gameOver() {
    clearInterval(game)
 
    createBG()
    context.font = '30px Verdana'
    context.fillStyle = '#fff'
    context.textAlign = 'center'
    context.fillText('Game Over', canvas.width/2, canvas.height/2)
}