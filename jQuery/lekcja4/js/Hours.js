var Hours = {
    bylo: true,
    hourscreate: function (response) {
        Hours.bylo = true
        var cokolwiek = []
        var idtoupdate = 0
        var oddo = 0
        cokolwiek = JSON.parse(response)
        cokolwiek = cokolwiek.godziny
        for (var i = 0; i < cokolwiek.length; i++) {
            var divhours = document.createElement("DIV")
            divhours.setAttribute("style", "width:60vw;height:3.5vh;font-size:3.4vh;position:relative;margin-top:1vh;left:calc(50% - 30vw);")
            divhours.id = i + "h"
            $("#hoursscreencontent").append(divhours)
            for (var j = 0; j < Object.keys(cokolwiek[i]).length; j++) {
                var divek = document.createElement("DIV")
                divek.setAttribute("style", "width:20vw;height:4vh;font-size:3.3vh;position:relative;float:left;")
                switch (j) {
                    case 0:
                        divek.append(cokolwiek[i].id)
                        break
                    case 1:
                        if (cokolwiek[i].odM.length == 1) {
                            divek.append(cokolwiek[i].odG + ":0" + cokolwiek[i].odM)
                        }
                        else {
                            divek.append(cokolwiek[i].odG + ":" + cokolwiek[i].odM)
                        }
                        j++
                        break
                    case 3:
                        if (cokolwiek[i].doM.length == 1) {
                            divek.append(cokolwiek[i].doG + ":0" + cokolwiek[i].doM)
                        }
                        else {
                            divek.append(cokolwiek[i].doG + ":" + cokolwiek[i].doM)
                        }
                        j++
                        break
                }
                divek.id = i + "_" + j + "h"
                $("#" + i + "h").append(divek)
                if (j != 0) {
                    $("#" + i + "_" + j + "h").on("mouseover", function () {
                        this.setAttribute("style", "width:20vw;height:4vh;font-size:3.3vh;position:relative;float:left;background:" + Settings.colors.color5 + ";cursor:pointer;")
                    })
                    $("#" + i + "_" + j + "h").on("mouseout", function () {
                        this.setAttribute("style", "width:20vw;height:4vh;font-size:3.3vh;position:relative;float:left;")
                    })
                    $("#" + i + "_" + j + "h").on("click", function () {
                        var wybrany = this.id
                        idtoupdate = $(this).parent()[0].children[0].innerHTML
                        if ($(this)[0].id.length == 4) {
                            if ($(this)[0].id[2] == 2) {
                                oddo = 2
                            }
                            else {
                                oddo = 4
                            }
                        }
                        else {
                            if ($(this)[0].id[3] == 2) {
                                oddo = 2
                            }
                            else {
                                oddo = 4
                            }
                        }
                        Hours.hourschangepanel(response, wybrany, idtoupdate, oddo)
                    })
                }
            }
        }
    },
    hourschangepanel: function (response, wybrany, idtoupdate, oddo) {
        $("#sethoursscreen").fadeIn(500, function () {
        })
        var innertext = $("#" + wybrany)
        innertext = innertext.html()
        innertext = innertext.split(":")
        $("#sethoursinfo").html(innertext[0] + ":" + innertext[1])
        for (var i = 7; i < 21; i++) {
            var hourshours = document.createElement("DIV")
            hourshours.setAttribute("style", "width:20vw;height:5vh;font-size:4vh;position:relative;margin-top:1vh;float:left;")
            hourshours.id = i + "hh"
            if (i < 10) {
                hourshours.innerHTML = "0" + i + ""
            }
            else {
                hourshours.innerHTML = i + ""
            }
            $("#sethourshours").append(hourshours)
            $("#" + i + "hh").on("mouseover", function () {
                this.setAttribute("style", "width:20vw;height:5vh;font-size:4vh;position:relative;margin-top:1vh;float:left;background:" + Settings.colors.color5 + ";cursor:pointer;")
            })
            $("#" + i + "hh").on("mouseout", function () {
                this.setAttribute("style", "width:20vw;height:5vh;font-size:4vh;position:relative;margin-top:1vh;float:left;")
            })
            $("#" + i + "hh").on("click", function () {
                var godzina = Hours.hourschange(response, this, innertext[0])
                innertext[0] = godzina
                $("#sethoursinfo").html(innertext[0] + ":" + innertext[1])
            })
        }
        for (var i = 0; i < 60; i = i + 5) {
            var hoursminutes = document.createElement("DIV")
            hoursminutes.setAttribute("style", "width:20vw;height:5vh;font-size:4vh;position:relative;margin-top:1vh;float:left;")
            hoursminutes.id = i + "mm"
            if (i < 10) {
                hoursminutes.innerHTML = "0"+ i + ""
            }
            else {
                hoursminutes.innerHTML = i + ""
            }
            $("#sethoursminutes").append(hoursminutes)
            $("#" + i + "mm").on("mouseover", function () {
                this.setAttribute("style", "width:20vw;height:5vh;font-size:4vh;position:relative;margin-top:1vh;float:left;background:" + Settings.colors.color5 + ";cursor:pointer;")
            })
            $("#" + i + "mm").on("mouseout", function () {
                this.setAttribute("style", "width:20vw;height:5vh;font-size:4vh;position:relative;margin-top:1vh;float:left;")
            })
            $("#" + i + "mm").on("click", function () {
                var minuta = Hours.minuteschange(response, this, innertext[1])
                innertext[1] = minuta
                $("#sethoursinfo").html(innertext[0] + ":" + innertext[1])
            })
        }
        $(".updatehours").on("click", function () {
            for (var i = 0; i < 2; i++) {
                Hours.updatehours(response, innertext, idtoupdate, oddo)
            }
        })
    },
    hourschange: function (response, wybraniec, toupdate) {
        toupdate = wybraniec.innerHTML
        return toupdate
    },
    minuteschange: function (response, wybraniec, toupdate) {
        toupdate = wybraniec.innerHTML
        return toupdate
    },
    updatehours: function (response, innertext, idtoupdate, oddo) {
        console.log(innertext[0], innertext[1], idtoupdate, oddo)
        var odG
        var odM
        var doG
        var doM
        var id
        if (oddo == 2) {
            odG = innertext[0]
            odM = innertext[1]
            id = idtoupdate
        }
        else {
            doG = innertext[0]
            doM = innertext[1]
            id = idtoupdate
        }
        oddo = oddo+""
        var obj = {
            action: "update",
            odG: odG,
            odM: odM,
            doG: doG,
            doM: doM,
            id: id,
            oddo:oddo,
        }
        Database.methods.updateTables(obj)
        .done(function (response) {
            console.log(response)
        })
        .fail(function (response) {
            alert(response)
        })
        var obj1 = {
            action: "download",
        }
        Database.methods.downloadfromTables(obj1)
        .done(function (response1) {
            $("#hoursscreencontent").empty()
            Hours.hourscreate(response1)
        })
        .fail(function (response1) {
            alert(response1.responseText)
        })
    }
}