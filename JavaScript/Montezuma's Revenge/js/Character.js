var Character = function () {

    var charactersources = Textures.charactersources
    this.character = []

    var loadCharacterImages = function (charactersources, callback) {
        var images = {}
        var loadedImages = 0
        var numImages = 0

        for (var src in charactersources) {
            numImages++
        }
        for (var src in charactersources) {
            images[src] = new Image()
            images[src].onload = function () {
                if (++loadedImages >= numImages) {
                    callback(images)
                }
            }
            images[src].src = charactersources[src]
        }
    }

    this.loadWhenReady = function () {
        loadCharacterImages(charactersources, function (images) {
            var charactersprite = new Image();
            Character.character.push(Sprites.sprite({
                context: ctx2,
                width: 144,
                height: 84,
                image: charactersprite,
                numberOfFrames: 3,
                ticksPerFrame: 10,
                offsetX: 450,
                offsetY: 436,
                random: false,
                character: true,
                stand: true,
                laser: true
            }));
            charactersprite.src = "img/characterstandright.png";
            charactersprite.addEventListener("load", Movement.characterLoop);
            console.log(Character.character)
        })
    }
}