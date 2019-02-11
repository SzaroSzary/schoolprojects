/*

    Sprites creates all the animated elements for canvas.
    It also adds the animation to them.

*/

var Sprites = function () {

    //Main animation loop
    this.active = true;

    this.gameLoop = function () {
        for (var i = 0; i < LevelLoading.slider.length; i++) {

            LevelLoading.slider[i].update();
            LevelLoading.slider[i].render();
        }
        for (var i = 0; i < LevelLoading.leftslider.length; i++) {
            LevelLoading.leftslider[i].update();
            LevelLoading.leftslider[i].render();
        }
        for (var i = 0; i < LevelLoading.rightslider.length; i++) {
            LevelLoading.rightslider[i].update();
            LevelLoading.rightslider[i].render();
        }
        for (var i = 0; i < LevelLoading.fire.length; i++) {
            LevelLoading.fire[i].update();
            LevelLoading.fire[i].render();
        }
        for (var i = 0; i < LevelLoading.fireblock.length; i++) {
            LevelLoading.fireblock[i].update();
            LevelLoading.fireblock[i].render();
        }
        for (var i = 0; i < LevelLoading.laser.length; i++) {
            LevelLoading.laser[i].update();
            LevelLoading.laser[i].render();
        }
        for (var i = 0; i < Enemies.skull1.length; i++) {
            Enemies.skull1[i].update();
            Enemies.skull1[i].render();
        }
        for (var i = 0; i < Enemies.snake.length; i++) {
            Enemies.snake[i].update();
            Enemies.snake[i].render();
        }
        if (Sprites.active) {
            window.requestAnimationFrame(Sprites.gameLoop);
        }
    }

    //Sprite constructor

    this.sprite = function (options) {

        var that = {},
            frameIndex = 0,
            tickCount = 0,
            ticksPerFrame = options.ticksPerFrame || 0,
            numberOfFrames = options.numberOfFrames || 1;

        that.context = options.context;
        that.width = options.width;
        that.height = options.height;
        that.image = options.image;
        that.offsetX = options.offsetX
        that.offsetY = options.offsetY
        that.random = options.random
        that.character = options.character
        that.stand = options.stand
        that.enemy = options.enemy

        that.update = function () {
            tickCount += 1;
            if (tickCount > ticksPerFrame) {
                tickCount = 0;
                if (frameIndex < numberOfFrames - 1) {
                    frameIndex += 1;
                }
                else {
                    frameIndex = 0;
                }
            }
        };

        that.render = function () {
            if (that.enemy) {
                that.context.clearRect(that.offsetX - 10, that.offsetY - 10, that.width + 15, that.height + 15)
                that.context.drawImage(
                    that.image,
                    frameIndex * that.width / numberOfFrames,
                    0,
                    that.width / numberOfFrames,
                    that.height,
                    that.offsetX,
                    that.offsetY,
                    that.width / numberOfFrames,
                    that.height);
            }
            if (that.random && !that.character) {
                that.context.drawImage(
                    that.image,
                    frameIndex * that.width / numberOfFrames,
                    0,
                    that.width / numberOfFrames,
                    that.height,
                    that.offsetX,
                    that.offsetY,
                    that.width / numberOfFrames,
                    that.height);
            }
            else if (that.character && !that.stand) {
                that.context.clearRect(that.offsetX-10, that.offsetY-10, that.width+15, that.height+15)
                that.context.drawImage(
                    that.image,
                    frameIndex * that.width / numberOfFrames,
                    0,
                    that.width / numberOfFrames,
                    that.height,
                    that.offsetX,
                    that.offsetY,
                    that.width / numberOfFrames,
                    that.height);
            }
            else if (that.character && that.stand) {
                that.context.clearRect(that.offsetX - 10, that.offsetY - 10, that.width + 15, that.height + 15)
                that.context.drawImage(
                    that.image,
                    0, //frameIndex * that.width / numberOfFrames,
                    0,
                    that.width / numberOfFrames,
                    that.height,
                    that.offsetX,
                    that.offsetY,
                    that.width / numberOfFrames,
                    that.height);
            }
            else {
                that.context.drawImage(
                    that.image,
                    frameIndex * that.width / numberOfFrames,
                    0,
                    that.width / numberOfFrames,
                    that.height,
                    that.offsetX,
                    that.offsetY,
                    that.width / numberOfFrames,
                    that.height);
            }
        };

        return that;
    }

}