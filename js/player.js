function Player() {
    this.points = 0;
    this.direction = "down";
}

Player.prototype.directionAssign = function () {
    var dirNum;
    switch (this.direction) {
        case "down":
            dirNum = 0;
            break;
        case "left":
            dirNum = 1;
            break;
        case "right":
            dirNum = 2;
            break;
        case "up":
            dirNum = 3;
            break;
    }
    return dirNum;
};

Player.prototype.updatePoint = function (value) {
    this.points += value;
    document.getElementById("points").innerHTML = this.points.toString();
};
