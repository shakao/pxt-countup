controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.say("" + info.getTimeElapsed() + "s")
    info.clearCountup()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    info.pauseCountup()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    info.startCountup()
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    info.startCountup(false)
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    info.startCountup()
})
let mySprite: Sprite = null
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
info.startCountup()
