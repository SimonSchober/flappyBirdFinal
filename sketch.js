var flappy, flappy_fly
var background_img
var ground, ground_base
var p1, p2, p3, p4, p5, p6
var n0, n1, n2, n3, n4, n5, n6, n7, n8, n9
var base
var PLAY = 1
var END = 0
var gamestate = PLAY
var pipesGroup
var gameOver, gameOver_Img
var reset, reset_Img
var numbersGroup
var number
var score = -1


function preload() {
    flappy_fly = loadAnimation("sprites/yellowbird-downflap.png", "sprites/yellowbird-midflap.png", "sprites/yellowbird-upflap.png")
    background_img = loadImage("sprites/background-night.png")
    ground_base = loadImage("sprites/base.png")
    p1 = loadImage("sprites/pipe-green.png")
    p2 = loadImage("sprites/pipe-green1.png")
    p3 = loadImage("sprites/pipe-green1Up.png")
    p4 = loadImage("sprites/pipe-green2.png")
    p5 = loadImage("sprites/pipe-green2Up.png")
    p6 = loadImage("sprites/pipe-greenUp.png")

    n0 = loadImage("sprites/0.png")
    n1 = loadImage("sprites/1.png")
    n2 = loadImage("sprites/2.png")
    n3 = loadImage("sprites/3.png")
    n4 = loadImage("sprites/4.png")
    n5 = loadImage("sprites/5.png")
    n6 = loadImage("sprites/6.png")
    n7 = loadImage("sprites/7.png")
    n8 = loadImage("sprites/8.png")
    n9 = loadImage("sprites/9.png")

    gameOver_Img = loadImage("sprites/gameover.png")
    reset_Img = loadImage("sprites/restart.png")
}


function setup() {
    createCanvas(600, 800)
    flappy = createSprite(330, 400)
    flappy.addAnimation("flying", flappy_fly)
    flappy.scale = 1.5
    base = createSprite(400, 790)
    base.addImage(ground_base)
    base.scale = 0.5
    base.velocityX = -8
    //ground = createSprite(10, 800)
    //ground.addImage(//ground_base)
    ////ground.x = //ground.width / 2
    //ground.scale = 0.5
    //ground.velocityX = -8
    pipesGroup = new Group()
    reset = createSprite(300, 400)
    gameOver = createSprite(300, 350)
    gameOver.addImage(gameOver_Img)
    reset.addImage(reset_Img)
    reset.scale = 0.8
    numbersGroup = new Group()

}

function draw() {
    background(background_img)
    if (gamestate === PLAY) {

        reset.visible = false
        gameOver.visible = false

        //Flappy gravity
        flappy.velocityY = flappy.velocityY + 0.5

        if (base.x < 0) {
            base.x = 500
        }

        //Flappy flies in the Air
        if (keyDown("space")) {
            flappy.velocityY = -8
        }

        if (flappy.isTouching(pipesGroup) || flappy.isTouching(base)) {
            gamestate = END
        }

        spawnPipes()
    } else if (gamestate === END) {
        base.velocityX = 0
        base.velocityX = 0
        flappy.velocityY = 0
        pipesGroup.setVelocityXEach(0)
        gameOver.visible = true
        reset.visible = true
        pipesGroup.setDepthEach(0)
        numbersGroup.setDepthEach(0)
       
    }



    drawSprites()
}

function mousePressed() {
    gamestate = PLAY
    score = 0
    gameOver.visible = false
    reset.visible = false
    pipesGroup.destroyEach()
    numbersGroup.destroyEach()
    flappy.velocityY = -8
    flappy.y = 400
    base.velocityX = -8
    number = createSprite(300, 400)
    number.addImage(n0)
}



function spawnPipes() {
    if (frameCount % 120 === 0) {
        var pipeUp = createSprite(650, 150)
        var pipeDown = createSprite(650, 650)
        pipeDown.velocityX = -3
        pipeUp.velocityX = -3
        pipeUp.scale = 1.4
        pipeDown.scale = 1.3
        base.depth = pipeDown.depth + 1
        pipesGroup.add(pipeDown)
        pipesGroup.add(pipeUp)

        var rand = Math.round(random(1, 3))

        switch (rand) {
            case 1: pipeUp.addImage(p3)
                pipeDown.addImage(p4)
                break;
            case 2: pipeUp.addImage(p6)
                pipeDown.addImage(p2)
                break;
            case 3: pipeUp.addImage(p5)
                pipeDown.addImage(p1)
                break;

        }

        //Creating Scores
        numbersGroup.add(number)
        score = score + 1
        number.depth = 0

        switch (score) {
            case 0: number.addImage(n0)
                break;
            case 1: number.addImage(n1)
                break;
            case 2: number.addImage(n2)
                break;
            case 3: number.addImage(n3)
                break;
            case 4: number.addImage(n4)
                break;
            case 5: number.addImage(n5)
                break;
            case 6: number.addImage(n6)
                break;
            case 7: number.addImage(n7)
                break;
            case 8: number.addImage(n8)
                break;
            case 9: number.addImage(n9)
                break;
        }

    }
}



