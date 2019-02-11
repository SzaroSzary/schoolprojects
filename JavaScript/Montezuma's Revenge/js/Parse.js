var Parse = function () {

    this.Loc_array

    var loadJSON = function (path, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    if (success)
                        success(JSON.parse(xhr.responseText));
                } else {
                    if (error)
                        error(xhr);
                }
            }
        };
        xhr.open("GET", path, true);
        xhr.send();
    }

    this.parseWhenReady = function () {
        loadJSON('levels/level1/LevelData.json',
            function (data) {
                Loc_array = data;
                LevelLoading.loadWhenReady()
                Character.loadWhenReady()
                Enemies.loadWhenReady()
                Sprites.gameLoop()
                Enemies.enemiesLoop()
                console.log(Loc_array)
            },
            function (xhr) {
                console.error(xhr);
            }
        );
    }

}
