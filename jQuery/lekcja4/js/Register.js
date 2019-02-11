var Register = {
    registerpanel: function () {
        $("#register").fadeIn(500, function () { })
    },
    forbidden: ['\"','\'','<','>',"javascript"],
    safe: true,
    registeroptions: function () {
        $("#send").on("click", function () {
            console.log("shdh")
            for (var i = 0; i < Register.forbidden.length; i++) {
                if ($("#logintext").val().search(Register.forbidden[i]) != -1 || $("#passwordtext").val().search(Register.forbidden[i]) != -1) {
                    var overlay = document.createElement("DIV")
                    overlay.setAttribute("style", "position:absolute;display:none;width:100%;height:100%;color:" + Settings.colors.color2 + ";background:" + Settings.colors.color1 + ";text-align:center;font-size: 8vh;")
                    overlay.innerHTML = "NIEDOZWOLONE ZNAKI"
                    overlay.setAttribute("id", "over1")
                    document.body.appendChild(overlay)
                    $("#over1").fadeIn(500, function () { })
                    $("#over1").fadeOut(500, function () {
                        $("#over1").remove()
                    })
                    Register.safe = false
                }
            }
            if(Register.safe) {
                var obj = {
                    login: $("#logintext").val(),
                    password: $("#passwordtext").val(),
                    color1: Settings.colors.color2,
                    color2: Settings.colors.color3,
                    color3: Settings.colors.color4,
                    font: Settings.font,
                }
                return Ajax.send(obj, Settings.urls.register)
                .done(function (response) {
                    var overlay = document.createElement("DIV")
                    overlay.setAttribute("style", "position:absolute;display:none;width:100%;height:100%;color:" + Settings.colors.color2 + ";background:" + Settings.colors.color1 + ";text-align:center;font-size: 8vh;")
                    overlay.innerHTML = response + ""
                    Settings.currentuser = response.substring(9, response.length)
                    overlay.setAttribute("id", "over1")
                    document.body.appendChild(overlay)
                    $("#over1").fadeIn(500, function () { })
                    $("#over1").fadeOut(500, function () {
                        $("#over1").remove()
                    })
                    if (response != "BŁĘDNE HASŁO") {
                        $("#register").fadeOut(500, function () { })
                    }
                    if (response == "REJESTRACJA") {
                        var obj1 = {
                            action: "insert",
                        }
                        Database.methods.insertintoTables(obj1)
                        var obj2 = {
                            action: "currentuser",
                        }
                        Database.methods.currentUser(obj2)
                        .done(function (response) {
                            Settings.currentuser = response
                            console.log(response)
                            console.log(Settings.currentuser)
                            Settings.downloadfromserver()
                        })
                        .fail(function (response) {
                            console.log(response)
                        })
                    }
                    Settings.downloadfromserver()
                    console.log(Settings.currentuser)
                })
                .fail(function (response1) {
                    console.log(response1.responseText)
                    console.log(response)
                })
            }
            Register.safe = true
        })
    },
}