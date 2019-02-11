var Settings = {
    downloadfromserver: function(){
        var obj = {
            action: "downloadcolors",
            user: Settings.currentuser,
        }
        Database.methods.downloadfromTables(obj)
        .done(function (response) {
            var kolorki = []
            kolorki = JSON.parse(response)
            kolorki = kolorki.kolory
            Settings.colors.color2 = kolorki[0].color2
            Settings.colors.color3 = kolorki[0].color3
            Settings.colors.color4 = kolorki[0].color4
            Settings.font = kolorki[0].font
            Main.init()
        })
        .fail(function (response) {
            console.log(response)
        })
    },
    colors: {
        color1: "rgba(0,0,0, 0.9)",
        color2: "#ffffff",
        color3: "#333333",
        color4: "#111111",
        color5: "cornflowerblue",
        color6: "rgba(10, 10, 10, 0.9)"
    },
    urls: {
        databaseUrl: "http://localhost:56411/server/Database.aspx",
        register: "http://localhost:56411/server/Register.aspx",
    },
    currentuser: "0",
    font: "Lekton , sans-serif"
};