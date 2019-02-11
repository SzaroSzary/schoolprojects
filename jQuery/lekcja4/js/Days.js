var Days = {
        dayscreate: function (response) {
            var cokolwiek = []
            cokolwiek = JSON.parse(response)
            cokolwiek = cokolwiek.dzień
            for (var i = 0; i < cokolwiek.length; i++) {
                var divdays = document.createElement("DIV")
                divdays.setAttribute("style", "width:60vw;height:3.5vh;font-size:3.4vh;position:relative;margin-top:1vh;left:calc(50% - 30vw);")
                divdays.id = i + "d"
                $("#todayscreencontent").append(divdays)
                for (var j = 0; j < Object.keys(cokolwiek[i]).length; j++) {
                    var divek = document.createElement("DIV")
                    divek.setAttribute("style", "width:20vw;height:4vh;font-size:3.3vh;position:relative;float:left;")
                    switch (j) {
                        case 0:
                            divek.append(cokolwiek[i].lekcja)
                            break
                        case 1:
                            divek.append(cokolwiek[i].przedmiot)
                            break
                        case 2:
                            divek.append("s. "+cokolwiek[i].sala)
                            break
                    }
                    divek.id = i + "_" + j + "d"
                    $("#" + i + "d").append(divek)
                }
            }
        }
}