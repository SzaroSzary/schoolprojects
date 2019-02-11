/*

    LevelLoading is responsible for generating current level.
    It uses data from levels/level?/LevelData.js where '?' is the number of level.
    Sprites are loaded in js/Sprites.js file.

*/

var LevelLoading = function () {

    //Animated fragments tabs
   
    var sources = Textures.sources
    this.slider = []
    this.leftslider = []
    this.rightslider = []
    this.fire = []
    this.fireblock = []
    this.walls = []
    this.laser = []
    this.currentLevel = 0

    //Loading images to the canvas, but not appearing them yet

    var loadImages = function (sources, callback) {
        var images = {}
        var loadedImages = 0
        var numImages = 0

        for (var src in sources) {
            numImages++
        }
        for (var src in sources) {
            images[src] = new Image()
            images[src].onload = function () {
                if (++loadedImages >= numImages) {
                    callback(images)
                }
            }
            images[src].src = sources[src]
        }
    }

    //Appearing all the images in canvas, including sprites

    wall = function (ctx, image, offsetX, offsetY, width, height) {
        var that = {}

        that.ctx = ctx
        that.image = image
        that.offsetX = offsetX
        that.offsetY = offsetY
        that.width = width
        that.height = height
        that.ctx.drawImage(image, offsetX, offsetY)
        return that
    }

    this.loadLevel = function (val) {
        ctx2.clearRect(Character.character[0].offsetX - 10, Character.character[0].offsetY - 10, Character.character[0].width + 15, Character.character[0].height + 15)
        switch (val) {
            case "left":
                for (var i = 0; i < Object.keys(Loc_array).length; i++) {
                    if (Object.keys(Loc_array)[i] == Object.values(Loc_array)[LevelLoading.currentLevel].left) {
                        LevelLoading.currentLevel = i
                        Character.character[0].offsetX = 910
                        Character.character[0].offsetY = Character.character[0].offsetY - 5
                        break
                    }
                }
                break
            case "top":
                for (var i = 0; i < Object.keys(Loc_array).length; i++) {
                    if (Object.keys(Loc_array)[i] == Object.values(Loc_array)[LevelLoading.currentLevel].top) {
                        LevelLoading.currentLevel = i
                        Character.character[0].offsetY = 620
                        break
                    }
                }
                break
            case "right":
                for (var i = 0; i < Object.keys(Loc_array).length; i++) {
                    if (Object.keys(Loc_array)[i] == Object.values(Loc_array)[LevelLoading.currentLevel].right) {
                        LevelLoading.currentLevel = i
                        Character.character[0].offsetX = 1
                        Character.character[0].offsetY = Character.character[0].offsetY - 5
                        break
                    }
                }
                break
            case "bottom":
                for (var i = 0; i < Object.keys(Loc_array).length; i++) {
                    if (Object.keys(Loc_array)[i] == Object.values(Loc_array)[LevelLoading.currentLevel].bottom) {
                        LevelLoading.currentLevel = i
                        Character.character[0].offsetY = 1
                        break
                    }
                }
                break
        }
        LevelLoading.slider = []
        LevelLoading.leftslider = []
        LevelLoading.rightslider = []
        LevelLoading.fire = []
        LevelLoading.fireblock = []
        LevelLoading.laser = []
        LevelLoading.walls = []
        Enemies.skull1 = []
        window.cancelAnimationFrame(Sprites.gameLoop)
        window.cancelAnimationFrame(Enemies.enemiesLoop)
        Sprites.active = false
        Enemies.active = false
        ctx1.clearRect(0, 0, 960, 700)
        ctx3.clearRect(0, 0, 960, 700)
        LevelLoading.loadWhenReady()
        Enemies.loadWhenReady()
    }

    this.loadWhenReady = function () {
        loadImages(sources, function (images) {
            for (var i = 0; i < Object.values(Loc_array)[LevelLoading.currentLevel].map.length; i++) {
                for (var j = 0; j < Object.values(Loc_array)[LevelLoading.currentLevel].map[i].length; j++) {
                    switch (Object.values(Loc_array)[LevelLoading.currentLevel].map[i][j]) {
                        case 0:
                            ctx1.drawImage(images.blackspace, j * 24, i * 28)
                            break;
                        case 1:
                            LevelLoading.walls.push(wall(ctx1, images.bigbrick, j * 24, i * 28, 24, 28))
                            break;
                        case 2:
                            ctx1.drawImage(images.smallbrick, j * 24, i * 28)
                            break;
                        case 3:
                            ctx1.drawImage(images.chain, j * 24, i * 28)
                            break;
                        case 4:
                            ctx1.drawImage(images.leftladder, j * 24, i * 28)
                            break;
                        case 5:
                            ctx1.drawImage(images.rightladder, j * 24, i * 28)
                            break;
                        case 6:
                            ctx1.drawImage(images.leftladderblock, j * 24, i * 28)
                            break;
                        case 7:
                            ctx1.drawImage(images.rightladderblock, j * 24, i * 28)
                            break;
                        case 8:
                            ctx1.drawImage(images.graydoor1, j * 24, i * 28)
                            break;
                        case 9:
                            var slidersprite = new Image();
                            LevelLoading.slider.push(Sprites.sprite({
                                context: ctx1,
                                width: 96,
                                height: 28,
                                image: slidersprite,
                                numberOfFrames: 4,
                                ticksPerFrame: 2,
                                offsetX: j * 24,
                                offsetY: i * 28,
                                random: false,
                                character: false,
                                stand: false
                            }));
                            slidersprite.src = "img/leftslidercentersprite.png";
                            break;
                        case 10:
                            var slidersprite = new Image();
                            LevelLoading.leftslider.push(Sprites.sprite({
                                context: ctx1,
                                width: 96,
                                height: 28,
                                image: slidersprite,
                                numberOfFrames: 4,
                                ticksPerFrame: 2,
                                offsetX: j * 24,
                                offsetY: i * 28,
                                random: false,
                                character: false,
                                stand: false
                            }));
                            slidersprite.src = "img/leftsliderleftsprite.png";
                            break;
                        case 11:
                            var slidersprite = new Image();
                            LevelLoading.rightslider.push(Sprites.sprite({
                                context: ctx1,
                                width: 96,
                                height: 28,
                                image: slidersprite,
                                numberOfFrames: 4,
                                ticksPerFrame: 2,
                                offsetX: j * 24,
                                offsetY: i * 28,
                                random: false,
                                character: false,
                                stand: false
                            }));
                            slidersprite.src = "img/leftsliderrightsprite.png";
                            break;
                        case 12:
                            var slidersprite = new Image();
                            LevelLoading.rightslider.push(Sprites.sprite({
                                context: ctx1,
                                width: 96,
                                height: 28,
                                image: slidersprite,
                                numberOfFrames: 4,
                                ticksPerFrame: 4,
                                offsetX: j * 24,
                                offsetY: i * 28,
                                random: false,
                                character: false,
                                stand: false
                            }));
                            slidersprite.src = "img/leftsliderrightsprite.png";
                            break;
                        case 13:
                            var slidersprite = new Image();
                            LevelLoading.rightslider.push(Sprites.sprite({
                                context: ctx1,
                                width: 96,
                                height: 28,
                                image: slidersprite,
                                numberOfFrames: 4,
                                ticksPerFrame: 4,
                                offsetX: j * 24,
                                offsetY: i * 28,
                                random: false,
                                character: false,
                                stand: false
                            }));
                            slidersprite.src = "img/leftsliderrightsprite.png";
                            break;
                        case 14:
                            var slidersprite = new Image();
                            LevelLoading.rightslider.push(Sprites.sprite({
                                context: ctx1,
                                width: 96,
                                height: 28,
                                image: slidersprite,
                                numberOfFrames: 4,
                                ticksPerFrame: 4,
                                offsetX: j * 24,
                                offsetY: i * 28,
                                random: false,
                                character: false,
                                stand: false
                            }));
                            slidersprite.src = "img/leftsliderrightsprite.png";
                            break;
                        case 15:
                            var firesprite = new Image();
                            LevelLoading.fire.push(Sprites.sprite({
                                context: ctx1,
                                width: 96,
                                height: 28,
                                image: firesprite,
                                numberOfFrames: 4,
                                ticksPerFrame: 4,
                                offsetX: j * 24,
                                offsetY: i * 28,
                                random: true,
                                character: false,
                                stand: false
                            }));
                            firesprite.src = "img/firesprite.png";
                            break;
                        case 16:
                            var firesprite = new Image();
                            LevelLoading.fireblock.push(Sprites.sprite({
                                context: ctx1,
                                width: 96,
                                height: 28,
                                image: firesprite,
                                numberOfFrames: 4,
                                ticksPerFrame: 4,
                                offsetX: j * 24,
                                offsetY: i * 28,
                                random: true,
                                character: false,
                                stand: false
                            }));
                            firesprite.src = "img/fireblocksprite.png";
                            break;
                        case 17:
                            ctx1.drawImage(images.chainholder, j * 24, i * 28)
                            break;
                        case 18:
                            var lasersprite = new Image();
                            LevelLoading.laser.push(Sprites.sprite({
                                context: ctx1,
                                width: 768,
                                height: 28,
                                image: lasersprite,
                                numberOfFrames: 32,
                                ticksPerFrame: 4,
                                offsetX: j * 24,
                                offsetY: i * 28,
                                random: false,
                                character: false,
                                stand: false
                            }));
                            lasersprite.src = "img/lasersprite.png";
                            break;
                        case 19:
                            ctx1.drawImage(images.pipe, j * 24, i * 28)
                            break;
                        case 20:
                            ctx1.drawImage(images.graydoor2, j * 24, i * 28)
                            break;
                        case 21:
                            ctx1.drawImage(images.graydoor3, j * 24, i * 28)
                            break;
                        case 22:
                            ctx1.drawImage(images.graydoor4, j * 24, i * 28)
                            break;
                        case 23:
                            ctx1.drawImage(images.bluedoor1, j * 24, i * 28)
                            break;
                        case 24:
                            ctx1.drawImage(images.bluedoor2, j * 24, i * 28)
                            break;
                        case 25:
                            ctx1.drawImage(images.bluedoor3, j * 24, i * 28)
                            break;
                        case 26:
                            ctx1.drawImage(images.bluedoor4, j * 24, i * 28)
                            break;
                        case 27:
                            ctx1.drawImage(images.browndoor1, j * 24, i * 28)
                            break;
                        case 28:
                            ctx1.drawImage(images.browndoor2, j * 24, i * 28)
                            break;
                        case 29:
                            ctx1.drawImage(images.browndoor3, j * 24, i * 28)
                            break;
                        case 30:
                            ctx1.drawImage(images.browndoor4, j * 24, i * 28)
                            break;
                        case 31:
                            ctx1.drawImage(images.golddoor1, j * 24, i * 28)
                            break;
                        case 32:
                            ctx1.drawImage(images.golddoor2, j * 24, i * 28)
                            break;
                        case 33:
                            ctx1.drawImage(images.golddoor3, j * 24, i * 28)
                            break;
                        case 34:
                            ctx1.drawImage(images.golddoor4, j * 24, i * 28)
                            break;
                    }
                }
            }
            for (var i = 0; i < Object.values(Loc_array)[LevelLoading.currentLevel].greykeys.length; i++) {
                ctx1.drawImage(images.graykey, Object.values(Loc_array)[LevelLoading.currentLevel].greykeys[i][0], Object.values(Loc_array)[LevelLoading.currentLevel].greykeys[i][1])
            }
            for (var i = 0; i < Object.values(Loc_array)[LevelLoading.currentLevel].brownkeys.length; i++) {
                ctx1.drawImage(images.brownkey, Object.values(Loc_array)[LevelLoading.currentLevel].brownkeys[i][0], Object.values(Loc_array)[LevelLoading.currentLevel].brownkeys[i][1])
            }
            for (var i = 0; i < Object.values(Loc_array)[LevelLoading.currentLevel].bluekeys.length; i++) {
                ctx1.drawImage(images.bluekey, Object.values(Loc_array)[LevelLoading.currentLevel].bluekeys[i][0], Object.values(Loc_array)[LevelLoading.currentLevel].bluekeys[i][1])
            }
            for (var i = 0; i < Object.values(Loc_array)[LevelLoading.currentLevel].goldkeys.length; i++) {
                ctx1.drawImage(images.goldkey, Object.values(Loc_array)[LevelLoading.currentLevel].goldkeys[i][0], Object.values(Loc_array)[LevelLoading.currentLevel].goldkeys[i][1])
            }
            for (var i = 0; i < Object.values(Loc_array)[LevelLoading.currentLevel].coins.length; i++) {
                ctx1.drawImage(images.coin, Object.values(Loc_array)[LevelLoading.currentLevel].coins[i][0], Object.values(Loc_array)[LevelLoading.currentLevel].coins[i][1])
            }
            Sprites.active = true
        })
    }

    this.getKey = function (value) {
        loadImages(sources, function (images) {
            switch (value) {
                case 1:
                    for (var i = 0; i < 29; i++) {
                        for (var j = 0; j < 25; j++) {
                            ctx1.drawImage(images.blackspace, Object.values(Loc_array)[LevelLoading.currentLevel].greykeys[0][0] + j, Object.values(Loc_array)[LevelLoading.currentLevel].greykeys[0][1] + i)
                        }
                    }
                    break
                case 2:
                    for (var i = 0; i < 29; i++) {
                        for (var j = 0; j < 25; j++) {
                            ctx1.drawImage(images.blackspace, Object.values(Loc_array)[LevelLoading.currentLevel].brownkeys[0][0] + j, Object.values(Loc_array)[LevelLoading.currentLevel].brownkeys[0][1] + i)
                        }
                    }
                    break
                case 3:
                    for (var i = 0; i < 29; i++) {
                        for (var j = 0; j < 25; j++) {
                            ctx1.drawImage(images.blackspace, Object.values(Loc_array)[LevelLoading.currentLevel].bluekeys[0][0] + j, Object.values(Loc_array)[LevelLoading.currentLevel].bluekeys[0][1] + i)
                        }
                    }
                    break
                case 4:
                    for (var i = 0; i < 29; i++) {
                        for (var j = 0; j < 25; j++) {
                            ctx1.drawImage(images.blackspace, Object.values(Loc_array)[LevelLoading.currentLevel].goldkeys[0][0] + j, Object.values(Loc_array)[LevelLoading.currentLevel].goldkeys[0][1] + i)
                        }
                    }
                    break
            }
        })
    }
    /*this.getCoin = function (value) {
        loadImages(sources, function (images) {
            for (var i = 0; i < 29; i++) {
                for (var j = 0; j < 25; j++) {
                    ctx1.drawImage(images.blackspace, Object.values(Loc_array)[LevelLoading.currentLevel].coins[0][0] + j, Object.values(Loc_array)[LevelLoading.currentLevel].coins[0][1] + i)
                }
            }
        })
    }*/

    this.openDoors = function (doors, value) {
        loadImages(sources, function (images) {
            switch (doors) {
                case 1:
                    switch (value) {
                        case 1:
                            ctx1.drawImage(images.graydooropen, Object.values(Loc_array)[LevelLoading.currentLevel].greydoors[0][0], Object.values(Loc_array)[LevelLoading.currentLevel].greydoors[0][1])
                            break
                        case 2:
                            ctx1.drawImage(images.graydooropen, Object.values(Loc_array)[LevelLoading.currentLevel].greydoors[1][0], Object.values(Loc_array)[LevelLoading.currentLevel].greydoors[1][1])
                            break
                        case 3:
                            ctx1.drawImage(images.graydooropen, Object.values(Loc_array)[LevelLoading.currentLevel].greydoors[2][0], Object.values(Loc_array)[LevelLoading.currentLevel].greydoors[2][1])
                            break
                        case 4:
                            ctx1.drawImage(images.graydooropen, Object.values(Loc_array)[LevelLoading.currentLevel].greydoors[3][0], Object.values(Loc_array)[LevelLoading.currentLevel].greydoors[3][1])
                            break
                    }
                    break
                case 2:
                    switch (value) {
                        case 1:
                            ctx1.drawImage(images.browndooropen, Object.values(Loc_array)[LevelLoading.currentLevel].browndoors[0][0], Object.values(Loc_array)[LevelLoading.currentLevel].browndoors[0][1])
                            break
                        case 2:
                            ctx1.drawImage(images.browndooropen, Object.values(Loc_array)[LevelLoading.currentLevel].browndoors[1][0], Object.values(Loc_array)[LevelLoading.currentLevel].browndoors[1][1])
                            break
                        case 3:
                            ctx1.drawImage(images.browndooropen, Object.values(Loc_array)[LevelLoading.currentLevel].browndoors[2][0], Object.values(Loc_array)[LevelLoading.currentLevel].browndoors[2][1])
                            break
                        case 4:
                            ctx1.drawImage(images.browndooropen, Object.values(Loc_array)[LevelLoading.currentLevel].browndoors[3][0], Object.values(Loc_array)[LevelLoading.currentLevel].browndoors[3][1])
                            break
                    }
                    break
                case 3:
                    switch (value) {
                        case 1:
                            ctx1.drawImage(images.bluedooropen, Object.values(Loc_array)[LevelLoading.currentLevel].bluedoors[0][0], Object.values(Loc_array)[LevelLoading.currentLevel].bluedoors[0][1])
                            break
                        case 2:
                            ctx1.drawImage(images.bluedooropen, Object.values(Loc_array)[LevelLoading.currentLevel].bluedoors[1][0], Object.values(Loc_array)[LevelLoading.currentLevel].bluedoors[1][1])
                            break
                        case 3:
                            ctx1.drawImage(images.bluedooropen, Object.values(Loc_array)[LevelLoading.currentLevel].bluedoors[2][0], Object.values(Loc_array)[LevelLoading.currentLevel].bluedoors[2][1])
                            break
                        case 4:
                            ctx1.drawImage(images.bluedooropen, Object.values(Loc_array)[LevelLoading.currentLevel].bluedoors[3][0], Object.values(Loc_array)[LevelLoading.currentLevel].bluedoors[3][1])
                            break
                    }
                    break
                case 4:
                    switch (value) {
                        case 1:
                            ctx1.drawImage(images.golddooropen, Object.values(Loc_array)[LevelLoading.currentLevel].golddoors[0][0], Object.values(Loc_array)[LevelLoading.currentLevel].golddoors[0][1])
                            break
                        case 2:
                            ctx1.drawImage(images.golddooropen, Object.values(Loc_array)[LevelLoading.currentLevel].golddoors[1][0], Object.values(Loc_array)[LevelLoading.currentLevel].golddoors[1][1])
                            break
                        case 3:
                            ctx1.drawImage(images.golddooropen, Object.values(Loc_array)[LevelLoading.currentLevel].golddoors[2][0], Object.values(Loc_array)[LevelLoading.currentLevel].golddoors[2][1])
                            break
                        case 4:
                            ctx1.drawImage(images.golddooropen, Object.values(Loc_array)[LevelLoading.currentLevel].golddoors[3][0], Object.values(Loc_array)[LevelLoading.currentLevel].golddoors[3][1])
                            break
                    }
                    break
            }
        })
    }
}