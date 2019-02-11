/*
    UI - obsługa interfejsu użytkownika
*/

function Ui() {
    var nazwy = ["[przełącz kamerę]","player 1","player 2","flat","bird"]
    for (var i = 0; i < 5; i++) {
        var opcje = document.createElement("option")
        opcje.innerHTML = nazwy[i]
        opcje.value = nazwy[i]
        document.getElementById("kamera").appendChild(opcje)
        document.getElementById("kamera").onchange = function () {
            game.setCamera(this.value)
        }
    }
    document.getElementById("accept").addEventListener("click", function () {
        net.sendData()
    })
    document.getElementById("reset").addEventListener("click", function () {
        console.log("dfz")
        net.deleteData()
    })
    this.serverInfo = function (text, removeloginscreen, removeinfo) {
        console.log("śmiga")
        var x = document.createElement("DIV")
        x.setAttribute("style", "width:100%;height:100%;background:rgba(255,0,0,0.8);position:absolute;top:0;left:0;color:white;font-size:30px;text-align:center;z-index:10;display:none;")
        x.innerHTML = text + ""
        x.id = "info"
        document.body.appendChild(x)
        $(x).fadeIn(1000);
        if (removeinfo) {
            $(x).fadeOut(1000);
        }
        if (removeloginscreen) {
            $("#loginscreen").fadeOut(1000);
        }
    }
}