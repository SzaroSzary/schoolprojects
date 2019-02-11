var Menu = function () {
    this.generateItemInfo = function () {
        for (var i = 0; i < 2; i++) {
            var sides = document.createElement("img")
            sides.src = "img/menubar1.png"
            switch (i) {
                case 0:
                    sides.setAttribute("style", "position:absolute;left:0;top:0;")
                    break;
                case 1:
                    sides.setAttribute("style", "position:absolute;left:264px;top:0;")
                    break;
            }
            itemdiv.appendChild(sides)
        }
        var top = document.createElement("img")
        top.src = "img/menubar2.png"
        top.setAttribute("style", "position:absolute;left:24px;top:0;")
        itemdiv.appendChild(top)
        var bottom = document.createElement("img")
        bottom.src = "img/menubar3.png"
        bottom.setAttribute("style", "position:absolute;left:24px;top:88px;")
        itemdiv.appendChild(bottom)
        for (var i = 0; i < 5; i++) {
            var life = document.createElement("img")
            life.src = "img/menubar4.png"
            life.setAttribute("style", "position:absolute;left: "+(24 + (i*48))+"px;top:84px;")
            itemdiv.appendChild(life)
        }
    }

    this.generatePointInfo = function () {
        for (var i = 0; i < 2; i++) {
            var sides = document.createElement("img")
            sides.src = "img/menubar1.png"
            switch (i) {
                case 0:
                    sides.setAttribute("style", "position:absolute;left:0;top:0;")
                    break;
                case 1:
                    sides.setAttribute("style", "position:absolute;left:336px;top:0;")
                    break;
            }
            pointdiv.appendChild(sides)
        }
        var top = document.createElement("img")
        top.src = "img/menubar2long.png"
        top.setAttribute("style", "position:absolute;left:24px;top:0;")
        pointdiv.appendChild(top)
        var bottom = document.createElement("img")
        bottom.src = "img/menubar3long.png"
        bottom.setAttribute("style", "position:absolute;left:24px;top:88px;")
        pointdiv.appendChild(bottom)
    }
}