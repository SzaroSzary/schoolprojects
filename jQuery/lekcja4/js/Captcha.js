var Captcha = {
    clearcaptcha: function(){
        $("#captchareload").on("click", function () {
            $("#captchaoptions").empty()
            Captcha.createcaptcha()
        })
    },
    validatecaptcha: function(){
        $("#captchaaccept").on("click",function(){
            if (Captcha.id[10] == '1' || Captcha.id[11] == '2' || Captcha.id[13] == '3') {
                var overlay = document.createElement("DIV")
                overlay.setAttribute("style", "position:absolute;display:none;width:100%;height:100%;color:" + Settings.colors.color2 + ";background:" + Settings.colors.color1 + ";text-align:center;font-size: 8vh;")
                overlay.innerHTML = "ZAREJESTRUJ SIĘ ALBO SIĘ ZALOGUJ"
                overlay.setAttribute("id", "over1")
                document.body.appendChild(overlay)
                $("#over1").fadeIn(500, function () { })
                $("#over1").fadeOut(500, function () {
                    $("#over1").remove()
                    $("#captcha").fadeOut(500, function () { })
                    Register.registerpanel()
                })
            }
            else {
                var overlay = document.createElement("DIV")
                overlay.setAttribute("style", "position:absolute;display:none;width:100%;height:100%;color:" + Settings.colors.color2 + ";background:" + Settings.colors.color1 + ";text-align:center;font-size: 8vh;")
                overlay.innerHTML = "BŁĘDNA CAPTCHA"
                overlay.setAttribute("id", "over1")
                document.body.appendChild(overlay)
                $("#over1").fadeIn(1000, function () { })
                $("#over1").fadeOut(1000, function () {
                    $("#over1").remove()
                    Captcha.createcaptcha()
                })
            }
        })
    },
    liczby: 0,
    id: "",
    powtarzanie: 0,
    clicked: false,
    createcaptcha: function () {
        Captcha.numberrandomizer()
        if (Captcha.powtarzanie == 0) {
        }
        else if (Captcha.powtarzanie == Captcha.liczby) {
            Captcha.createcaptcha()
        }
        var los = []
        for (var i = 0; i < 4; i++) {
            los[i] = 0
        }
        $("#captchaoptions").empty()
        Captcha.clicked = false
        for (var i = 1; i < 5; i++) {
            var losowa = Math.round((Math.random() * 4) + 1);
            if (los[i-1] == 0) {
                los[i-1] = losowa
            }
            var capimg = document.createElement("IMG")
            capimg.setAttribute("style", "width:25%;height:100%;position:absolute;left:" + ((i - 1) * 25) + "%;")
            switch (Captcha.liczby) {
                case 1:
                    capimg.src = "gfx/food" + i + ".jpg"
                    capimg.setAttribute("id", "capimgfood" + i)
                    capimg.setAttribute("onclick","Captcha.foodopts(this)")
                    Captcha.powtarzanie = 1
                    break;
                case 2:
                    capimg.src = "gfx/meme" + i + ".jpg"
                    capimg.setAttribute("id", "capimgmemes" + i)
                    capimg.setAttribute("onclick", "Captcha.memeopts(this)")
                    Captcha.powtarzanie = 2
                    break;
                case 3:
                    capimg.src = "gfx/tractor" + i + ".jpg"
                    capimg.setAttribute("id", "capimgtractor" + i)
                    capimg.setAttribute("onclick", "Captcha.tractoropts(this)")
                    Captcha.powtarzanie = 3
                    break;
            }
            $("#captchaoptions").append(capimg)
        }
    },
    numberrandomizer: function () {
        Captcha.liczby = Math.floor((Math.random() * 3) + 1);
    },
    foodopts: function (x) {
        if (Captcha.clicked == false) {
            x.style.opacity = 0.2
            Captcha.id = x.id
            Captcha.clicked = true
        }
        else {
            var last = "#" + Captcha.id
            $(last)[0].style.opacity = 1
            x.style.opacity = 0.2
            Captcha.id = x.id
            Captcha.clicked = true
        }
    },
    memeopts: function (x) {
        if (Captcha.clicked == false) {
            x.style.opacity = 0.2
            Captcha.id = x.id
            Captcha.clicked = true
        }
        else {
            var last = "#" + Captcha.id
            $(last)[0].style.opacity = 1
            x.style.opacity = 0.2
            Captcha.id = x.id
            Captcha.clicked = true
        }
    },
    tractoropts: function (x) {
        if (Captcha.clicked == false) {
            x.style.opacity = 0.2
            Captcha.id = x.id
            Captcha.clicked = true
        }
        else {
            var last = "#" + Captcha.id
            $(last)[0].style.opacity = 1
            x.style.opacity = 0.2
            Captcha.id = x.id
            Captcha.clicked = true
        }
    },
}