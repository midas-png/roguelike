function CanvasDisplay() {
    this.canvas = document.createElement("canvas");
    this.canvas.className = "tile";
    this.canvas.width = "500";
    this.canvas.height = "500";
    this.width = 40;
    this.length = 40;
    this.xValue = 0;
    this.yValue = 0;
    this.potionCounter = 0;
    this.swordCounter = 0;
    this.map = [];
    this.shownWidth = 10;
    this.shownLength = 10;
    this.moveCount = 0;
    this.horizontalDemons = [];
    this.context = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
}

CanvasDisplay.prototype.spawnPlayer = function () {
    var randomX = Math.floor(Math.random() * (this.length - 2) + 1);
    var randomY = Math.floor(Math.random() * (this.width - 2) + 1);
    var cell = this.map[randomX][randomY];

    if (cell === 1) {
        this.xValue = randomX;
        this.yValue = randomY;
    } else {
        this.spawnPlayer();
    }
};

CanvasDisplay.prototype.drawFrame = function () {
    this.clearDisplay();
    this.drawBackground();
};

CanvasDisplay.prototype.clearDisplay = function () {
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

CanvasDisplay.prototype.drawBackgroundSprite = function (
    imagex,
    imagey,
    canvasx,
    canvasy
) {
    this.context.drawImage(
        backgroundSprite,
        imagex,
        imagey,
        20,
        20,
        (canvasx * this.canvas.width) / 10,
        (canvasy * this.canvas.height) / 10,
        this.canvas.width / 10,
        this.canvas.height / 10
    );
};

CanvasDisplay.prototype.drawBackground = function () {
    var canvasx = 0;
    var canvasy = 0;
    var imagex = 0,
        imagey = 0;
    for (
        var j = this.xValue - this.shownLength / 2;
        j < this.xValue + this.shownLength / 2;
        j++, canvasy++
    ) {
        canvasx = 0;
        for (
            var i = this.yValue - this.shownWidth / 2;
            i < this.yValue + this.shownWidth / 2;
            i++, canvasx++
        ) {
            if (i < 0 || i > this.width - 1 || j < 0 || j > this.length - 1) {
                imagex = 50;
                imagey = 25;
            } else {
                if (this.map[j][i] == 1) {
                    imagex = 25;
                    imagey = 25;
                    // FLOOR
                } else if (this.map[j][i] == 0) {
                    imagex = 50;
                    imagey = 25;
                    // WALL
                } else if (this.map[j][i] == 3) {
                    imagex = 50;
                    imagey = 0;
                    // HP Potion
                } else if (this.map[j][i] == -1) {
                    imagex = 0;
                    imagey = 25;
                    // ENEMY
                } else if (this.map[j][i] == 4) {
                    imagex = 25;
                    imagey = 0;
                    // Booster Sword
                }
            }
            this.drawBackgroundSprite(imagex, imagey, canvasx, canvasy);
        }
    }
};

CanvasDisplay.prototype.drawPlayer = function () {
    this.context.drawImage(
        playerSprite,
        20,
        20,
        120,
        120,
        ((this.shownWidth / 2) * this.canvas.width) / 10,
        ((this.shownLength / 2) * this.canvas.height) / 10,
        this.canvas.width / 10,
        this.canvas.height / 10
    );
};

CanvasDisplay.prototype.demonTimer = function () {
    for (var i = 0; i < this.horizontalDemons.length; i++) {
        var x = this.horizontalDemons[i].x;
        var y = this.horizontalDemons[i].y;
        var dir = this.horizontalDemons[i].dir;
        if (dir == 1) {
            if (y < this.width - 1 && this.map[x][y + 1] == 1) {
                this.map[x][y] = 1;
                this.map[x][y + 1] = -1;
                this.horizontalDemons[i].y += 1;
            } else {
                this.horizontalDemons[i].dir = -1;
            }
        } else if (dir == -1) {
            if (y > 0 && this.map[x][y - 1] == 1) {
                this.map[x][y] = 1;
                this.map[x][y - 1] = -1;
                this.horizontalDemons[i].y -= 1;
            } else {
                this.horizontalDemons[i].dir = 1;
            }
        }
    }
};

CanvasDisplay.prototype.horizontalCorridor = function (i) {
    var demon = { x: 0, y: 0, dir: 1 };
    var demon2 = { x: 0, y: 0, dir: 1 };
    if (Math.random() > 0.5) {
        for (var p = 0; p <= this.width / 4; p++) {
            this.map[i + 1][p] = 1;
        }
        for (p = this.width / 4; p <= this.width / 2; p++) {
            this.map[i + 2][p] = 1;
        }
        if (this.horizontalDemons.length !== 10) {
            this.map[i + 2][this.width / 4] = -1;
            this.enemyCounter++;
            demon.x = i + 2;
            demon.y = this.width / 4;
            demon.dir = 1;
            this.horizontalDemons.push(demon);
        }
        for (; p <= (this.width * 3) / 4; p++) {
            this.map[i][p] = 1;
        }
        for (p = (this.width * 3) / 4; p < this.width; p++) {
            this.map[i + 1][p] = 1;
        }
        if (this.horizontalDemons.length !== 10) {
            this.map[i + 1][(this.width * 3) / 4] = -1;
            demon2.x = i + 1;
            demon2.y = (this.width * 3) / 4;
            demon2.dir = 1;
            this.horizontalDemons.push(demon2);
        }
    } else {
        for (var p = 0; p <= this.width / 4; p++) {
            this.map[i + 1][p] = 1;
        }
        if (this.horizontalDemons.length !== 10) {
            this.map[i + 1][1] = -1;
            demon.x = i + 1;
            demon.y = 1;
            demon.dir = 1;
            this.horizontalDemons.push(demon);
        }
        for (p = this.width / 4; p <= this.width / 2; p++) {
            this.map[i][p] = 1;
        }
        for (; p <= (this.width * 3) / 4; p++) {
            this.map[i + 1][p] = 1;
        }
        if (this.horizontalDemons.length !== 10) {
            this.map[i + 1][this.width / 2 + 1] = -1;
            demon2.x = i + 1;
            demon2.y = this.width / 2 + 1;
            demon2.dir = 1;
            this.horizontalDemons.push(demon2);
        }
        for (p = (this.width * 3) / 4; p < this.width; p++) {
            this.map[i + 2][p] = 1;
        }
    }
};

CanvasDisplay.prototype.verticalCorridor = function () {
    for (var i = 0; i < this.length; i++) {
        this.map[i][0] = 1;
        this.map[i][this.width - 1] = 1;
    }
    for (var i = 0; i < this.length / 2; i++) {
        this.map[i][this.width / 4] = 1;
    }
    if (this.boosterCounter !== 2) {
        var booster = Math.ceil(Math.random() * (this.length / 2));
        this.map[booster][this.width / 4] = 4;
        this.boosterCounter += 1;
    }
    for (; i < this.length - 2; i++) {
        this.map[i][(this.width * 3) / 4] = 1;
    }
    if (this.boosterCounter !== 2) {
        var booster1 = Math.ceil(
            Math.random() * (this.length / 2) + this.length / 2 - 2
        );
        this.map[booster1][(this.width * 3) / 4] = 4;
    }
};

CanvasDisplay.prototype.assignMap = function () {
    this.map = [];
    for (var i = 0; i < this.length; i++) {
        this.map[i] = [];
        for (var j = 0; j < this.width; j++) {
            this.map[i][j] = 0;
        }
    }
    var horizontalLength;
    var roomLength;
    var max;
    for (var i = 0; i < this.length; i++) {
        max = 0;
        for (var j = 0; j < this.width; j++) {
            horizontalLength = Math.floor(Math.random() * 3 + 3);
            roomLength = Math.floor(Math.random() * 3 + 3);
            if (
                j + horizontalLength < this.width &&
                i + roomLength < this.length
            ) {
                if (max < roomLength) max = roomLength;
                for (var p = i; p < i + roomLength; p++) {
                    for (var q = j; q < j + horizontalLength; q++) {
                        this.map[p][q] = 1;
                        if (Math.random() > 0.95 && this.potionCounter !== 10) {
                            this.map[p][q] = 3;
                            this.potionCounter += 1;
                        }
                    }
                }
                var roomDistance = Math.random();
                if (roomDistance < 0.34) j += horizontalLength;
                else if (roomDistance < 0.67) j += horizontalLength + 1;
                else j += horizontalLength + 2;
            }
        }
        this.horizontalCorridor(i);
        i += max;
    }

    this.verticalCorridor();
    for (var i = 0; i < this.length; i++) {
        this.map[i][0] = 1;
        this.map[i][this.width - 1] = 1;
    }
    this.spawnPlayer();
};
