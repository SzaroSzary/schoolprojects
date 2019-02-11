var Weeks = {
    weekscreate: function (response) {
        var cokolwiek = []
        cokolwiek = JSON.parse(response)
        cokolwiek = cokolwiek.tydzień
        for (var i = 0; i < 14; i++) {
            var divtyg = document.createElement("DIV")
            divtyg.id = i + "w"
            $("#weekscreencontent").append(divtyg)
            if (i == 0) {
                for (var k = 0; k < 14; k++) {
                    var ide = document.createElement("DIV")
                    ide.setAttribute("style", "width:15vw;height:4vh;font-size:3.3vh;position:absolute;top:" + (((k+1) * 20)-6) + "%;")
                    ide.id = i + "wid"
                    ide.innerHTML = ""+(k+1)
                    $("#" + i + "w").append(ide)
                }
            }
            for (var j = 0, k = 1; j < 5; j++, k++) {
                if (i == 0) {
                    var ide = document.createElement("DIV")
                    ide.setAttribute("style", "width:15vw;height:2vh;font-size:3.3vh;position:absolute;left:" + (k * 15) + "%;")
                    ide.id = i + "day"
                    switch (j) {
                        case 0:
                            ide.innerHTML = "PN"
                            break
                        case 1:
                            ide.innerHTML = "WT"
                            break
                        case 2:
                            ide.innerHTML = "ŚR"
                            break
                        case 3:
                            ide.innerHTML = "CZ"
                            break
                        case 4:
                            ide.innerHTML = "PT"
                            break
                    }
                    $("#" + i + "w").append(ide)
                }
                var divek = document.createElement("DIV")
                divek.setAttribute("style", "width:15vw;height:4vh;font-size:3.3vh;position:absolute;left:" + (k * 15) + "%;top:" + (((i+1) * 20)-10) + "%;")
                var x = cokolwiek[i + (j * 14)]
                divek.innerHTML = x.przedmiot + "<br/>" + x.sala
                divek.id = i +"_"+ j + "w"
                $("#"+i+"w").append(divek)
            }
        }
    }
}