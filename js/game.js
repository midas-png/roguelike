function Game() {
    this.demontimerCount = 0;
    this.playerObject = new Player();
    this.canvasObject = new CanvasDisplay();
    this.boosterCount = 0;
    this.boosterSet = false;
    this.duration = 240;
    this.damageTakenDelay = false;
}

Game.prototype.drawFn = function () {
    this.canvasObject.drawFrame();
    var dirNum = this.playerObject.directionAssign();
    this.canvasObject.drawPlayer(dirNum);
};

Game.prototype.changeBasics = function () {
    this.canvasObject.moveCount++;
    this.canvasObject.moveCount %= 4;
    directionKey = 0;
};

Game.prototype.changePosition = function () {
    switch (directionKey) {
        case 65:
            if (
                this.canvasObject.yValue > 0 &&
                this.canvasObject.map[this.canvasObject.xValue][
                    this.canvasObject.yValue - 1
                ] != 0
            )
                this.canvasObject.yValue--;
            this.playerObject.direction = "left";
            this.changeBasics();
            break;
        case 87:
            if (
                this.canvasObject.xValue > 0 &&
                this.canvasObject.map[this.canvasObject.xValue - 1][
                    this.canvasObject.yValue
                ] != 0
            )
                this.canvasObject.xValue--;
            this.playerObject.direction = "up";
            this.changeBasics();
            break;
        case 68:
            if (
                this.canvasObject.yValue < this.canvasObject.length - 1 &&
                this.canvasObject.map[this.canvasObject.xValue][
                    this.canvasObject.yValue + 1
                ] != 0
            )
                this.canvasObject.yValue++;
            this.playerObject.direction = "right";
            this.changeBasics();
            break;
        case 83:
            if (
                this.canvasObject.xValue < this.canvasObject.width - 1 &&
                this.canvasObject.map[this.canvasObject.xValue + 1][
                    this.canvasObject.yValue
                ] != 0
            )
                this.canvasObject.xValue++;
            this.playerObject.direction = "down";
            this.changeBasics();
            break;
    }
};

Game.prototype.killEnemy = function () {
    var xVal = this.canvasObject.xValue;
    var yVal = this.canvasObject.yValue;
    var demons = this.canvasObject.horizontalDemons;

    if (
        this.canvasObject.map[this.canvasObject.xValue + 1][
            this.canvasObject.yValue
        ] == -1
    ) {
        for (var i = demons.length - 1; i >= 0; --i) {
            if (demons[i].x === xVal + 1 && demons[i].y === yVal) {
                this.canvasObject.horizontalDemons.splice(i, 1);
            }
        }
        this.canvasObject.map[this.canvasObject.xValue + 1][
            this.canvasObject.yValue
        ] = 1;
    } else if (this.canvasObject.map[xVal - 1][yVal] == -1) {
        for (var i = demons.length - 1; i >= 0; --i) {
            if (demons[i].x === xVal - 1 && demons[i].y === yVal) {
                this.canvasObject.horizontalDemons.splice(i, 1);
            }
        }
        this.canvasObject.map[this.canvasObject.xValue - 1][
            this.canvasObject.yValue
        ] = 1;
    } else if (this.canvasObject.map[xVal][yVal + 1] == -1) {
        for (var i = demons.length - 1; i >= 0; --i) {
            if (demons[i].x === xVal && demons[i].y === yVal + 1) {
                this.canvasObject.horizontalDemons.splice(i, 1);
            }
        }
        this.canvasObject.map[this.canvasObject.xValue][
            this.canvasObject.yValue + 1
        ] = 1;
    } else if (this.canvasObject.map[xVal][yVal - 1] == -1) {
        for (var i = demons.length - 1; i >= 0; --i) {
            if (demons[i].x === xVal && demons[i].y === yVal - 1) {
                this.canvasObject.horizontalDemons.splice(i, 1);
            }
        }
        this.canvasObject.map[this.canvasObject.xValue][
            this.canvasObject.yValue - 1
        ] = 1;
    } else if (this.canvasObject.map[xVal][yVal] == -1) {
        for (var i = demons.length - 1; i >= 0; --i) {
            if (demons[i].x === xVal && demons[i].y === yVal) {
                this.canvasObject.horizontalDemons.splice(i, 1);
            }
        }
        this.canvasObject.map[this.canvasObject.xValue][
            this.canvasObject.yValue
        ] = 1;
    }

    if (this.canvasObject.horizontalDemons.length === 0) {
        alert("You Win!");
        this.playerObject.updatePoint(-this.playerObject.points);
        window.cancelAnimationFrame(myReq);
        onLoad();
    }
};

Game.prototype.loser = function () {
    if (this.playerObject.points <= 0) {
        alert("ПОТРАЧЕНО. Попробуй снова!");
        this.playerObject.updatePoint(-this.playerObject.points);
        window.cancelAnimationFrame(myReq);
        onLoad();
    } else {
        if (!this.damageTakenDelay) {
            if (this.boosterSet) {
                this.playerObject.updatePoint(-50);
            } else {
                this.playerObject.updatePoint(-100);
            }
        }
    }
};

Game.prototype.updateFn = function (dt) {
    this.timerCount += dt;
    this.demontimerCount += dt;
    if (this.boosterSet) {
        this.boosterCount += dt;
    }
    this.changePosition();

    if (
        this.canvasObject.map[this.canvasObject.xValue][
            this.canvasObject.yValue
        ] == -1 ||
        this.canvasObject.map[this.canvasObject.xValue][
            this.canvasObject.yValue + 1
        ] == -1 ||
        this.canvasObject.map[this.canvasObject.xValue][
            this.canvasObject.yValue - 1
        ] == -1 ||
        this.canvasObject.map[this.canvasObject.xValue + 1][
            this.canvasObject.yValue
        ] == -1 ||
        this.canvasObject.map[(this.canvasObject.xValue || 2) - 1][
            this.canvasObject.yValue
        ] == -1
    ) {
        this.loser();
        if (!this.damageTakenDelay) this.damageTakenDelay = true;
        else {
            setTimeout(() => {
                this.damageTakenDelay = false;
            }, 1500);
        }
    } else if (
        this.canvasObject.map[this.canvasObject.xValue][
            this.canvasObject.yValue
        ] == 3
    ) {
        this.canvasObject.map[this.canvasObject.xValue][
            this.canvasObject.yValue
        ] = 1;
        this.playerObject.updatePoint(150);
        this.timerCheck();
    } else if (
        this.canvasObject.map[this.canvasObject.xValue][
            this.canvasObject.yValue
        ] == 4
    ) {
        this.canvasObject.map[this.canvasObject.xValue][
            this.canvasObject.yValue
        ] = 1;
        this.boosterSet = true;
        this.timerCheck();
    } else this.timerCheck();

    if (attacking) {
        attacking = false;
        this.killEnemy();
    }
};

Game.prototype.timerCheck = function () {
    if (this.demontimerCount > 0.5) {
        this.canvasObject.demonTimer();
        this.demontimerCount = 0;
    }
    if (this.boosterCount > 20 && this.boosterSet == true) {
        this.boosterSet = false;
        this.boosterCount = 0;
    }
};

Game.prototype.startLoop = function () {
    myReq = window.requestAnimationFrame(this.gameLoop.bind(this));
};

Game.prototype.gameLoop = function () {
    myReq = window.requestAnimationFrame(this.gameLoop.bind(this));
    now = timestamp();
    dt = (now - last) / 2000;
    last = now;
    this.updateFn(dt);
    this.drawFn();
};
