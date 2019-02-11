var Movement = function () {

    var left = false
    var right = false
    var jump = false
    var bottom = false
    var blockheight = 28
    var diff = 0
    var block = false
    var falling = false
    var ladder = 0
    var clicked = false
    var onladder = false
    this.stopCheck = false
    var posx
    var posy = 4
    var x
    var hitCol
    var lCol
    var rCol
    var dCol
    var uCol
    var lslidCol
    var rslidCol
    var chainCol
    var greykeyCol
    var brownkeyCol
    var bluekeyCol
    var goldkeyCol
    var pipeCol
    var laserCol
    var greydoorCol
    var browndoorCol
    var bluedoorCol
    var golddoorCol
    var coinCol

    this.move = function () {
        document.onkeydown = function (e) {
            switch (e.which) {
                case 37:
                    if (!falling) {
                        left = true
                    }
                    break;
                case 39:
                    if (!falling) {
                        right = true
                    }
                    break;
                case 38:
                    if (!block && !falling) {
                        diff = 0
                        jump = true
                        block = true
                    }
                    clicked = true
                    break;
                case 40:
                    bottom = true
                    break;
            }
        }
        document.onkeyup = function (e) {
            switch (e.which) {
                case 37:
                    left = false
                    var charactersprite = new Image();
                    charactersprite.src = "img/characterstandleft.png";
                    Character.character[0].image = charactersprite
                    Character.character[0].stand = true
                    break;
                case 39:
                    right = false
                    var charactersprite = new Image();
                    charactersprite.src = "img/characterstandright.png";
                    Character.character[0].image = charactersprite
                    Character.character[0].stand = true
                    break;
                case 38:
                    clicked = false
                    break;
                case 40:
                    bottom = false
                    break;
            }
        }
    }

    this.characterLoop = function () {
        window.requestAnimationFrame(Movement.characterLoop);
        for (var i = 0; i < Character.character.length; i++) {

            posx = 4
            posy = 4
            x
            hitCol = Collision.checkhitCollision()
            lCol = Collision.checkleftCollision()
            rCol = Collision.checkrightCollision()
            dCol = Collision.checkdownCollision()
            uCol = Collision.checkupCollision()
            lslidCol = Collision.checkleftsliderCollision()
            rslidCol = Collision.checkrightsliderCollision()
            chainCol = Collision.checkchainCollision()
            greykeyCol = Collision.checkgreykeyCollision()
            brownkeyCol = Collision.checkbrownkeyCollision()
            bluekeyCol = Collision.checkbluekeyCollision()
            goldkeyCol = Collision.checkgoldkeyCollision()
            pipeCol = Collision.checkpipeCollision()
            laserCol = Collision.laserCollision()
            greydoorCol = Collision.greydoorCollision()
            browndoorCol = Collision.browndoorCollision()
            bluedoorCol = Collision.bluedoorCollision()
            golddoorCol = Collision.golddoorCollision()
            coinCol = Collision.checkcoinCollision()
            console.log(hitCol)
            if (!hitCol) {
                Character.character = []
                break
            }
            if (greydoorCol != 0 && Items.greykeys > 0) {
                Items.greykeys--
                LevelLoading.openDoors(1, greydoorCol)
            }
            if (browndoorCol != 0 && Items.brownkeys > 0) {
                Items.brownkeys--
                LevelLoading.openDoors(2, browndoorCol)
            }
            if (bluedoorCol != 0 && Items.bluekeys > 0) {
                Items.bluekeys--
                LevelLoading.openDoors(3, bluedoorCol)
            }
            if (golddoorCol != 0 && Items.goldkeys > 0) {
                Items.goldkeys--
                LevelLoading.openDoors(4, golddoorCol)
            }

            if (!Movement.stopCheck) {
                if (Character.character[0].offsetX <= 0) {
                    LevelLoading.loadLevel("left")
                }
                if (Character.character[0].offsetY <= 0) {
                    LevelLoading.loadLevel("top")
                }
                if (Character.character[0].offsetX >= 940) {
                    LevelLoading.loadLevel("right")
                }
                if (Character.character[0].offsetY >= 700) {
                    LevelLoading.loadLevel("bottom")
                }
            }

            if (!block) {
                x = Physics.check()
            }

            if (!pipeCol ) {
                left = false
                right = false
                Character.character[0].offsetY = Character.character[0].offsetY + 5
            }

            if (left && !lCol) {
                var charactersprite = new Image();
                charactersprite.src = "img/characterleftmovesprite.png";
                Character.character[0].offsetX = Character.character[0].offsetX - posx
                Character.character[0].image = charactersprite
                Character.character[0].stand = false
            }
            else if (right && !rCol) {
                var charactersprite = new Image();
                charactersprite.src = "img/characterrightmovesprite.png";
                Character.character[0].offsetX = Character.character[0].offsetX + posx
                Character.character[0].image = charactersprite
                Character.character[0].stand = false
            }
            if (jump && !laserCol) {
                var charactersprite = new Image();
                charactersprite.src = "img/characterstandleft.png";
                if (diff <= 2 * blockheight) {
                    Character.character[0].offsetY = Character.character[0].offsetY - 5
                    ctx2.clearRect(Character.character[0].offsetX - 10, Character.character[0].offsetY - 10, Character.character[0].width + 15, Character.character[0].height + 15)
                    diff += 5
                    x = false
                }
                else {
                    setTimeout(function () {
                        jump = false
                        block = false
                    }, 100)
                }
                Character.character[0].image = charactersprite
                Character.character[0].stand = true
            }
            else if ((jump && !uCol && clicked) || (jump && !chainCol && clicked)) {
                var charactersprite = new Image();
                if (ladder >= 20){
                    charactersprite.src = "img/characterladder1.png";
                    ladder = 0
                }
                else if (ladder < 10) {
                    charactersprite.src = "img/characterladder1.png";
                    ladder++
                }
                else {
                    charactersprite.src = "img/characterladder2.png";
                    ladder++
                }
                Character.character[0].offsetY = Character.character[0].offsetY - posy
                Character.character[0].image = charactersprite
                Character.character[0].stand = true

            }
            else if ((!uCol && !clicked && !bottom) || (!chainCol && !clicked && !bottom)) {
                var charactersprite = new Image();
                if (ladder >= 20) {
                    charactersprite.src = "img/characterladder1.png";
                }
                else if (ladder < 10) {
                    charactersprite.src = "img/characterladder1.png";
                }
                else {
                    charactersprite.src = "img/characterladder2.png";
                }
            }
            else if (jump) {
                var charactersprite = new Image();
                charactersprite.src = "img/characterstandleft.png"; 
                if (diff <= 2 * blockheight && uCol) {
                    Character.character[0].offsetY = Character.character[0].offsetY - 5
                    ctx2.clearRect(Character.character[0].offsetX - 10, Character.character[0].offsetY - 10, Character.character[0].width + 15, Character.character[0].height + 15)
                    diff += 5
                    x = false
                }
                else {
                    setTimeout(function () {
                        jump = false
                        block = false
                    }, 120)
                }
                Character.character[0].image = charactersprite
                Character.character[0].stand = true
            }
            else if (bottom && !dCol) {
                var charactersprite = new Image();
                if (ladder >= 20) {
                    charactersprite.src = "img/characterladder1.png";
                    ladder = 0
                }
                else if (ladder < 10) {
                    charactersprite.src = "img/characterladder1.png";
                    ladder++
                }
                else {
                    charactersprite.src = "img/characterladder2.png";
                    ladder++
                }
                Character.character[0].offsetY = Character.character[0].offsetY + posy
                Character.character[0].stand = true
                Character.character[0].image = charactersprite
            }
            else if (bottom && !chainCol) {
                var charactersprite = new Image();
                if (ladder >= 20) {
                    charactersprite.src = "img/characterladder1.png";
                    ladder = 0
                }
                else if (ladder < 10) {
                    charactersprite.src = "img/characterladder1.png";
                    ladder++
                }
                else {
                    charactersprite.src = "img/characterladder2.png";
                    ladder++
                }
                Character.character[0].offsetY = Character.character[0].offsetY + posy
                Character.character[0].stand = true
                Character.character[0].image = charactersprite
            }
            else if (bottom && dCol) {
                var charactersprite = new Image();
                charactersprite.src = "img/characterstandleft.png";
                Character.character[0].image = charactersprite
            }

            if (!lslidCol) {
                Character.character[0].offsetX = Character.character[0].offsetX - (posx/2)
            }

            if (x) {
                var charactersprite = new Image();
                charactersprite.src = "img/characterstandright.png";
                Character.character[0].offsetY = Character.character[0].offsetY + posy
                Character.character[0].image = charactersprite
                Character.character[0].stand = true
                falling = true
            }
            else {
                falling = false
            }

            if (!greykeyCol) {
                LevelLoading.getKey(1)
                Items.greykeys++
            }
            if (!brownkeyCol) {
                LevelLoading.getKey(2)
                Items.brownkeys++
            }
            if (!bluekeyCol) {
                LevelLoading.getKey(3)
                Items.bluekeys++
            }
            if (!goldkeyCol) {
                LevelLoading.getKey(4)
                Items.goldkeys++
            }
            if (!coinCol) {
                //LevelLoading.getCoin()
                Items.points += 1000
            }

            Character.character[i].update();
            Character.character[i].render();
        }
    }
    
}