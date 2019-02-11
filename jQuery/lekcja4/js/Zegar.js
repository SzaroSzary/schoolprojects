var Zegar = {    
    init: function () {
        Zegar.makeZegar();
        setInterval(Zegar.makeZegar, 1000);
    },
    makeZegar: function(){
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        $("#clock").text(h + ":" + m + ":" + s);
        function checkTime(i) {
            if (i < 10) {
                i = "0" + i
            };
            return i;
        }
    }
}