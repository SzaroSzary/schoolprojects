/*
    klasa obsługująca komunikację Ajax - em z serwerem
*/

function Net() {
    /*
        funkcja publiczna możliwa do uruchomienia 
        z innych klas
    */

    this.sendData = function () {
        var username = document.getElementById("login").value
        console.log(username)
        $.ajax({
            url: "http://localhost:3000",
            data: {
                akcja: "ADD_USER",
                user: username,
            },
            type: "POST",
            success: function (data) {
                data = data.split(";")
                if (data[0] == "Nicki nie mogą się powtarzać") {
                    ui.serverInfo(data[0])
                }
                else if (data[0] == "Pomyślnie dodano użytkownika. Czekaj na drugiego gracza...") {
                    game.setPlayer("1")
                    game.preparePawns(data[1])
                    game.startGame()
                    game.setCamera("player 1")
                    ui.serverInfo(data[0], true, false)
                    net.checkPlayer()
                }
                else {
                    game.setPlayer("2")
                    game.preparePawns(data[1])
                    game.startGame()
                    game.setCamera("player 2")
                    ui.serverInfo(data[0], true, true)
                }
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        })
    }
    this.deleteData = function () {
        $.ajax({
            url: "http://localhost:3000",
            data: {
                akcja: "DELETE_USERS",
            },
            type: "POST",
            success: function (data) {
                console.log(data)
                ui.serverInfo(data)
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        })
    }
    this.checkPlayer = function () {
        $.ajax({
            url: "http://localhost:3000",
            data: {
                akcja: "CHECK_USERS",
            },
            type: "POST",
            success: function (data) {
                console.log(data)
                if (data == "Przygotuj się do gry...") {
                    ui.serverInfo(data, true, true)
                    $("#info").fadeOut(1000)
                }
                else{
                    var x = setTimeout(net.checkPlayer(), 500)
                }
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message)
            }
        })
    }
    this.updateGameTab = function (userdata,player) {
        $.ajax({
            url: "http://localhost:3000",
            data: {
                akcja: "UPDATE_GAMETAB",
                oldx:userdata.oldx,
                oldz:userdata.oldz,
                x:userdata.x,
                z: userdata.z,
                player: player
            },
            type: "POST",
            success: function (data) {
                game.preparePawns(data)
                console.log(data)
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message)
            }
        })
    }
    this.compareGameTab = function (gametab, player) {
        $.ajax({
            url: "http://localhost:3000",
            data: {
                akcja: "COMPARE_GAMETAB",
                gametab:gametab,
                player: player
            },
            type: "POST",
            success: function (data) {
                if (data == "next") {
                    console.log(data)
                    game.preparePawns(data)
                }
                else {
                    var x = setTimeout(net.compareGameTab(), 500)
                }
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message)
            }
        })
    }
}