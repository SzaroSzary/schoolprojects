var StartScreen = function () {
    var screen = document.createElement("div")
    screen.setAttribute("style", "position:absolute;left:0;top:0;width:100%;height:100%;background:black;")
    screen.id = "StartScreen"
    
    for (var i = 0; i < Settings.helicoptermodels.length; i++) {
        var button = new Button(i,"start")
        button = button.getButton()
        button.onclick = function () {
            main.selectedhelicopter = Settings.helicoptermodels[parseInt(this.id)]
            main.loadmodel(parseInt(this.id))
            screen.setAttribute("style", "position:absolute;left:0;top:0;width:100%;height:100%;background:black;font-size:100px;color:white;font-family:Arial;text-align:center;")
            screen.innerHTML = "LOADING..."
        }
        screen.appendChild(button)
    }
    this.getScreen = function () {
        return screen;
    }
}