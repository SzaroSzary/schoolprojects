var Enemies = function () {

    var enemyLeftCol
    var enemyRightCol
    var lefthit = true
    var righthit = false
    var enemiessources = Textures.enemiessources
    this.skull1 = []
    this.skull2 = []
    this.snake = []
    this.scorpion = []
    this.active = true

    this.enemiesLoop = function () {

        for (var i = 0; i < Enemies.skull1.length; i++) {
            enemyLeftCol = Collision.skullleftCollision(Enemies.skull1[i])
            enemyRightCol = Collision.skullrightCollision(Enemies.skull1[i])
            console.log(enemyRightCol)
            if (!enemyRightCol && lefthit) {
                var charactersprite = new Image();
                charactersprite.src = "img/skullspriteright.png";
                Enemies.skull1[i].offsetX = Enemies.skull1[i].offsetX + 3
                Enemies.skull1[i].image = charactersprite
                Enemies.skull1[i].stand = false
            }
            else {
                righthit = true
                lefthit = false
            }
            if (!enemyLeftCol && righthit) {
                var charactersprite = new Image();
                charactersprite.src = "img/skullspriteleft.png";
                Enemies.skull1[i].offsetX = Enemies.skull1[i].offsetX - 3
                Enemies.skull1[i].image = charactersprite
                Enemies.skull1[i].stand = false
            }
            else {
                lefthit = true
                righthit = false
            }
        }
        if (Enemies.active) {
            window.requestAnimationFrame(Enemies.enemiesLoop);
        }
    }

    var loadEnemiesImages = function (enemiessources, callback) {
        var images = {}
        var loadedImages = 0
        var numImages = 0

        for (var src in enemiessources) {
            numImages++
        }
        for (var src in enemiessources) {
            images[src] = new Image()
            images[src].onload = function () {
                if (++loadedImages >= numImages) {
                    callback(images)
                }
            }
            images[src].src = enemiessources[src]
        }
    }

    this.loadWhenReady = function () {
        loadEnemiesImages(enemiessources, function (images) {
            for (var i = 0; i < Object.values(Loc_array)[LevelLoading.currentLevel].skull1.length; i++) {
                var skullsprite = new Image();
                Enemies.skull1.push(Sprites.sprite({
                    context: ctx3,
                    width: 768,
                    height: 56,
                    image: skullsprite,
                    numberOfFrames: 16,
                    ticksPerFrame: 3,
                    offsetX: Object.values(Loc_array)[LevelLoading.currentLevel].skull1[i][0],
                    offsetY: Object.values(Loc_array)[LevelLoading.currentLevel].skull1[i][1],
                    random: false,
                    character: false,
                    stand: false,
                    laser: false,
                    enemy: true
                }));
                skullsprite.src = "img/skullspriteleft.png";
            }
            for (var i = 0; i < Object.values(Loc_array)[LevelLoading.currentLevel].skull2.length; i++) {
                var skullsprite = new Image();
                Enemies.skull2.push(Sprites.sprite({
                    context: ctx3,
                    width: 768,
                    height: 56,
                    image: skullsprite,
                    numberOfFrames: 16,
                    ticksPerFrame: 3,
                    offsetX: Object.values(Loc_array)[LevelLoading.currentLevel].skull2[i][0],
                    offsetY: Object.values(Loc_array)[LevelLoading.currentLevel].skull2[i][1],
                    random: false,
                    character: false,
                    stand: false,
                    laser: false,
                    enemy: true
                }));
                skullsprite.src = "img/skull2sprite.png";
            }
            for (var i = 0; i < Object.values(Loc_array)[LevelLoading.currentLevel].snake.length; i++) {
                var snakesprite = new Image();
                Enemies.snake.push(Sprites.sprite({
                    context: ctx3,
                    width: 96,
                    height: 56,
                    image: snakesprite,
                    numberOfFrames: 2,
                    ticksPerFrame: 3,
                    offsetX: Object.values(Loc_array)[LevelLoading.currentLevel].snake[i][0],
                    offsetY: Object.values(Loc_array)[LevelLoading.currentLevel].snake[i][1],
                    random: false,
                    character: false,
                    stand: false,
                    laser: false,
                    enemy: true
                }));
                console.log(Enemies.snake)
                snakesprite.src = "img/snakesprite.png";
            }
            for (var i = 0; i < Object.values(Loc_array)[LevelLoading.currentLevel].scorpion.length; i++) {
                var skullsprite = new Image();
                Enemies.scorpion.push(Sprites.sprite({
                    context: ctx3,
                    width: 768,
                    height: 56,
                    image: skullsprite,
                    numberOfFrames: 16,
                    ticksPerFrame: 3,
                    offsetX: Object.values(Loc_array)[LevelLoading.currentLevel].scorpion[i][0],
                    offsetY: Object.values(Loc_array)[LevelLoading.currentLevel].scorpion[i][1],
                    random: false,
                    character: false,
                    stand: false,
                    laser: false,
                    enemy: true
                }));
                skullsprite.src = "img/skullspriteleft.png";
            }
            Enemies.active = true
        })
    }
}