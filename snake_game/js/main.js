let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
let box = 32
let snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box,
}

let apple = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

let direction = 'right'
let game = setInterval(playGame, 100)

function createBG() {
    context.fillStyle = 'lightgreen'
    context.fillRect(0, 0, 16 * box, 16*box);
}

function createSnake() {
    for (let i=0; i < snake.length; i++){
        context.fillStyle = 'green'
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function drawFood() {
    context.fillStyle = 'red'
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


function snakeMoveDirection() {

    
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

    snake.pop()

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead)

    snakeOut()

}


function playGame() {

    createBG()
    createSnake()
    snakeMoving()
    drawFood()

}

