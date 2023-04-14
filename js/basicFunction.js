var playerSprite = document.createElement("img");
playerSprite.src = "images/tile-P.png";
var backgroundSprite = document.createElement("img");
backgroundSprite.src = "images/tile-sprites.png";
var directionKey = 65;
var attackDelay = false;
var attacking = false;
var started = false;
var myReq;
var last;
var now = 0,
    dt;

function timestamp() {
    return window.performance && window.performance.now
        ? window.performance.now()
        : new Date().getTime();
}

function onLoad() {
    if (!started) {
        alert(`
    WASD - Движение. Атака на ПРОБЕЛ.
    2 Меча. Меч уменьшает получаемый урон на некоторое время.
    10 Зелий. Одно зелье увеличивает здоровье на 150 пунктов.
    10 Варваров. Для победы нужно разобраться со всеми варварами.
    Удачи!
    `);
    }
    started = true;
    last = timestamp();
    var gameObject = new Game();
    gameObject.canvasObject.assignMap();
    gameObject.playerObject.points = Number(
        document.getElementById("points").innerHTML
    );
    gameObject.startLoop();
}

function keypress(e) {
    e = e || window.event;
    switch (e.keyCode) {
        case 65:
            directionKey = 65;
            break;
        case 87:
            directionKey = 87;
            break;
        case 68:
            directionKey = 68;
            break;
        case 83:
            directionKey = 83;
            break;
        case 32:
            if (!attackDelay) {
                attackDelay = true;
                attacking = true;
                setTimeout(() => {
                    attackDelay = false;
                }, 500);
            }
            break;
    }
}

window.addEventListener("load", onLoad);
window.addEventListener("keydown", keypress);
