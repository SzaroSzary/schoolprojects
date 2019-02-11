var Slider = function (name) {

    var slider
    var controller
    var down
    var shadow

    var selected = null
    var mousex = 0
    var mousey = 0

    function init() {
        slider = document.createElement("div")
        slider.id = "s" + name
        console.log(name)
        switch (name) {
            case "throttle":
                slider.setAttribute("style", "position:absolute;left:0;top:10%;width:5%;height:80%;background:rgba(0,0,0,0.3);")
                controller = document.createElement("div")
                controller.id = name + "control"
                controller.setAttribute("style", "position:absolute;left:0;top:45%;width:100%;height:10%;background:rgba(255,255,0,0.6);z-index:10;")
                slider.appendChild(controller)
                controller.onmousedown = function () {
                    drag(this);
                    return false;
                }
                shadow = document.createElement("div")
                shadow.id = name + "shadow"
                shadow.setAttribute("style", "position:absolute;left:0;top:45%;width:100%;height:10%;background:rgba(255,255,255,0.3);")
                slider.appendChild(shadow)
                break;
            case "rudder":
                slider.setAttribute("style", "position:absolute;left:10%;top:90%;width:80%;height:10%;background:rgba(0,0,0,0.3);")
                controller = document.createElement("div")
                controller.id = name + "control"
                controller.setAttribute("style", "position:absolute;left:45%;top:0;width:10%;height:100%;background:rgba(255,255,0,0.6);z-index:10;")
                slider.appendChild(controller)
                controller.onmousedown = function () {
                    drag(this);
                    return false;
                }
                shadow = document.createElement("div")
                shadow.id = name + "shadow"
                shadow.setAttribute("style", "position:absolute;left:45%;top:0;width:10%;height:100%;background:rgba(255,255,255,0.3);")
                slider.appendChild(shadow)
                break;
            case "elevation":
                slider.setAttribute("style", "position:absolute;right:0;top:10%;width:5%;height:80%;background:rgba(0,0,0,0.3);")
                controller = document.createElement("div")
                controller.id = name + "control"
                controller.setAttribute("style", "position:absolute;right:0;top:45%;width:100%;height:10%;background:rgba(255,255,0,0.6);z-index:10;")
                slider.appendChild(controller)
                controller.onmousedown = function () {
                    drag(this);
                    return false;
                }
                shadow = document.createElement("div")
                shadow.id = name + "shadow"
                shadow.setAttribute("style", "position:absolute;left:0;top:45%;width:100%;height:10%;background:rgba(255,255,255,0.3);")
                slider.appendChild(shadow)
                break;
        }
        slider.onmousemove = move
        slider.onmouseup = destroy
    }
    init()
    
    function drag(elem) {
        selected = elem
    }
    
    function move(e) {
        if (selected !== null) {
            if (selected.id == "throttlecontrol" || selected.id == "elevationcontrol") {
                if (selected.offsetTop >= 0 && selected.offsetTop <= selected.parentNode.clientHeight - selected.clientHeight) {
                    mousey = document.all ? window.event.clientY : e.pageY
                    selected.style.top = (mousey - (selected.clientHeight * 2)) + "px"
                }
                if (selected.offsetTop < 0) {
                    selected.style.top = "0px"
                }
                if (selected.offsetTop > selected.parentNode.clientHeight - selected.clientHeight) {
                    selected.style.top = (selected.parentNode.clientHeight - selected.clientHeight) + "px"
                }
            }
            else {
                if (selected.offsetLeft >= 0 && selected.offsetLeft <= selected.parentNode.clientWidth - selected.clientWidth) {
                    mousex = document.all ? window.event.clientX : e.pageX
                    selected.style.left = (mousex - (selected.clientWidth * 2)) + "px"
                }
                if (selected.offsetLeft < 0) {
                    selected.style.left = "0px"
                }
                if (selected.offsetLeft > selected.parentNode.clientWidth - selected.clientWidth) {
                    selected.style.left = (selected.parentNode.clientWidth - selected.clientWidth) + "px"
                }
            }
        }
    }
    
    function destroy() {
        selected = null
        mousex = 0
        mousey = 0
    }

    this.createSlider = function () {
        return slider
    }
    this.update = function () {
        if (shadow.offsetTop < controller.offsetTop) {
            shadow.style.top = (shadow.offsetTop + 1) + "px"
            if (name == "throttle") {
                Settings.szybkoscLotu -= 0.03
            }
            else {
                Settings.szybkoscWznoszenia -= 0.01
            }
        }
        else {
            shadow.style.top = (shadow.offsetTop - 1) + "px"
            if (name == "throttle") {
                Settings.szybkoscLotu += 0.03
            }
            else {
                Settings.szybkoscWznoszenia += 0.01
            }
        }
        if (shadow.offsetLeft < controller.offsetLeft) {
            shadow.style.left = (shadow.offsetLeft + 1) + "px"
            Settings.szybkoscObrotu -= 0.0001
        }
        else {
            shadow.style.left = (shadow.offsetLeft - 1) + "px"
            Settings.szybkoscObrotu += 0.0001
        }
    }
}