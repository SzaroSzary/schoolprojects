var MenuScreen = function () {
    var screen = document.createElement("div")
    screen.setAttribute("style", "position:absolute;left:10%;top:0;width:80%;height:20%;background:rgba(0,0,0,0.3);")
    screen.id = "MenuScreen"

    for (var i = 0; i < Materials.helicopter1icons.length; i++) {
        var button = new Button(i,"cameras")
        button = button.getCameras()
        button.onclick = function () {
            CameraModes.currentcamera = this.id +""
        }
        screen.appendChild(button)
    }
    this.getScreen = function () {
        return screen;
    }
}