Colors = {
    generatecolors: function () {
        var coloroptions = document.createElement("DIV")
        coloroptions.setAttribute("style", "width:100%;height:100%;position:absolute;")
        coloroptions.setAttribute("id", "colorsoptions")
        $("#colorspanel").append(coloroptions)
        var fontcolor = document.createElement("DIV")
        fontcolor.setAttribute("id", "fontcolor")
        fontcolor.setAttribute("style", "position:absolute;top:10%;left:5%;width:20%;height:25%;display:block;")
        $("#colorsoptions").append(fontcolor)
        for (var i = 0; i < 255; i = i + 15) {
            var fontcolors = document.createElement("div")
            fontcolors.setAttribute("id", "fontcolor"+i)
            fontcolors.setAttribute("style", "position:relative;top:10%;left:5%;width:100%;height:15%;background: rgb("+i+","+i+","+i+");")
            $("#fontcolor").append(fontcolors)
            $("#fontcolor" + i).on("click", function () {
                var x = $(this)[0].style.background
                Settings.colors.color2 = x
                Main.init()
                console.log(x)
            })
        }
        var backgroundone = document.createElement("DIV")
        backgroundone.setAttribute("id", "backgroundone")
        backgroundone.setAttribute("style", "position:absolute;top:10%;left:30%;width:20%;height:25%;display:block;")
        $("#colorsoptions").append(backgroundone)
        for (var i = 0; i < 255; i = i + 15) {
            var backgroundones = document.createElement("div")
            backgroundones.setAttribute("id", "backgroundone" + i)
            backgroundones.setAttribute("style", "position:relative;top:10%;left:5%;width:100%;height:15%;background: hsl("+i+", 100%, 50%)")
            $("#backgroundone").append(backgroundones)
            $("#backgroundone" + i).on("click", function () {
                var x = $(this)[0].style.background
                Settings.colors.color4 = x
                Main.init()
                console.log(x)
            })
        }
        var backgroundtwo = document.createElement("DIV")
        backgroundtwo.setAttribute("id", "backgroundtwo")
        backgroundtwo.setAttribute("style", "position:absolute;top:10%;left:55%;width:20%;height:25%;display:block;")
        $("#colorsoptions").append(backgroundtwo)
        for (var i = 0; i < 255; i = i + 15) {
            var backgroundtwos = document.createElement("div")
            backgroundtwos.setAttribute("id", "backgroundtwo" + i)
            backgroundtwos.setAttribute("style", "position:relative;top:10%;left:5%;width:100%;height:15%;background: hsl(" + i + ",100%, 25%);")
            $("#backgroundtwo").append(backgroundtwos)
            $("#backgroundtwo" + i).on("click", function () {
                var x = $(this)[0].style.background
                Settings.colors.color3 = x
                Main.init()
                console.log(x)
            })
        }
        var fonts = document.createElement("DIV")
        fonts.setAttribute("id", "fonts")
        fonts.setAttribute("style", "position:absolute;top:15%;left:80%;width:15%;height:70%;display:block;")
        $("#colorsoptions").append(fonts)
        for (var i = 0; i < 6; i++) {
            var fontsopts = document.createElement("DIV")
            fontsopts.setAttribute("id", "fonts"+i)
            fontsopts.setAttribute("style", "postion:absolute;top:" + (i * 10) + "px;left:0;width:100%;height:10%;display:block;color:"+Settings.colors.color2+";font-size:4vh;")
            if (i == 0) {
                $(fontsopts).css("font-family", "Arial")
                fontsopts.innerHTML = "Lorem Ipsum"
            }
            if (i == 1) {
                $(fontsopts).css("font-family", "Calibri")
                fontsopts.innerHTML = "Lorem Ipsum"
            }
            if (i == 2) {
                $(fontsopts).css("font-family", "Comic Sans")
                fontsopts.innerHTML = "Lorem Ipsum"
            }
            if (i == 3) {
                $(fontsopts).css("font-family", "Impact")
                fontsopts.innerHTML = "Lorem Ipsum"
            }
            if (i == 4) {
                $(fontsopts).css("font-family", "Roboto")
                fontsopts.innerHTML = "Lorem Ipsum"
            }
            if (i == 5) {
                $(fontsopts).css("font-family", "Verdana")
                fontsopts.innerHTML = "Lorem Ipsum"
            }
            $("#fonts").append(fontsopts)
            $("#fonts" + i).on("click", function () {
                console.log($(this).css("font-family"))
                Settings.font = $(this).css("font-family")
                Main.init()
            })
        }
        var zwroc = document.createElement("IMG")
        zwroc.setAttribute("id", "returncolors")
        zwroc.setAttribute("src", "gfx/return.png")
        zwroc.setAttribute("class", "returncolors")
        $("#colorsoptions").append(zwroc)
        $("#returncolors").on("click", function () {
            var obj = {
                action: "colors",
                color2: "#ffffff",
                color3: "#333333",
                color4: "#111111",
                font: "Lekton , sans-serif",
                user: Settings.currentuser,
            }
            Database.methods.updateColors(obj)
            .done(function (response) {
                console.log(response)
                Settings.downloadfromserver()
            })
            .fail(function (response) {
                alert(response)
            })
        })
        var accept = document.createElement("IMG")
        accept.setAttribute("id","acceptcolors")
        accept.setAttribute("src", "gfx/ok.png")
        accept.setAttribute("class","updatecolors")
        $("#colorsoptions").append(accept)
        $("#acceptcolors").on("click", function () {
            var obj = {
                action: "colors",
                color2: Settings.colors.color2,
                color3: Settings.colors.color3,
                color4: Settings.colors.color4,
                font: Settings.font,
                user: Settings.currentuser,
            }
            Database.methods.updateColors(obj)
            .done(function (response) {
                console.log(response)
            })
            .fail(function (response) {
                alert(response)
            })
        })
    }
}