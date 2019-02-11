var Button = function (i, mode) {
    var helka
    var helcamera
    switch (mode) {
        case "start":
            helka = document.createElement("img")
            helka.setAttribute("style", "position:absolute;left:calc( 50% - " + (75 * Settings.helicoptermodels.length) + "px);top:100px;width:150px;height:150px;border-radius:100px;")
            helka.src = Materials.startscreen[i]
            helka.id = "" + i
            break;
        case "cameras":
            helcamera = document.createElement("img")
            helcamera.setAttribute("style", "position:absolute;left:" + ((18*i)) + "%;top:0;width:150px;height:100%;border-radius:100px;")
            switch (main.selectedhelicopter) {
                case "blackhawk":
                    helcamera.src = Materials.helicopter1icons[i]
                    break;
            }
            helcamera.id = "" + CameraModes.cameras[i]
            break;
    }
    
    this.getButton = function () {
        return helka;
    }
    this.getCameras = function () {
        return helcamera
    }
}