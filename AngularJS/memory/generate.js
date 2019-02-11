var memory = angular.module("memory",["ngRoute"]);
memory.controller("menu",function($scope){
    $scope.menuon = true;
    $scope.select = function(){
        $scope.menuon = false;
    }
})
memory.controller("gameparams",function($scope, $routeParams){
    $routeParams = Object.values($routeParams)[0]
    $scope.variables=$routeParams;
})
memory.config(function($routeProvider) {
    $routeProvider
    .when("/tryb/:90", {
        templateUrl: "start.html",
        controller: "gameparams"
    })
    .when("/tryb/:60", {
        templateUrl: "start.html",
        controller: "gameparams"
    })
    .when("/tryb/:30", {
        templateUrl: "start.html",
        controller: "gameparams"
    })
    .when("/", {
        templateUrl: "menu.html",
        controller: "gameparams"
    });
})
memory.controller("main",function($scope,currentTime,$interval){
    $scope.positions = []
    $scope.winner = false
    $scope.first = true
    $scope.timeInterval
    var los = function(){
        return Math.floor((Math.random() * 8));
    }
    var available = []
    for(var i =0;i<8;i++){
        available[i]=2;
    }
    for(var i = 0;i<4;i++){
        $scope.positions[i] = []
        for(var j = 0;j<4;j++){
            var done = false
            while(!done){
                var licz = los()
                if(available[licz]!=0){
                    $scope.positions[i][j]=licz+1
                    available[licz]--
                    done = true
                }
            }
        }
    }
    var count = 0, selected = 0, oldrow, oldcol, blockade = false;
    $scope.uncover = function(x,y){
        if($scope.first){
            $scope.first = false
            currentTime.setStart(true)
            $scope.timeInterval = $interval($scope.timecheck,5)
        }
        var picture = document.getElementById(x+""+y)
        if(!blockade && picture.title!="guessed"){
            var path = $scope.positions[x][y]
            picture.style.backgroundImage = "url(img/"+path+".jpg)"
            if(count==1){
                blockade = true
                var t = setTimeout(function(){
                    if(selected == path ){
                        document.getElementById(oldrow+""+oldcol).title = "guessed"
                        document.getElementById(x+""+y).title = "guessed"
                    }
                    count = 0
                    $scope.reset()
                    blockade = false
                    if($scope.win()){
                        currentTime.setWin = true
                        $scope.end(true)
                    }
                },500)
            }
            else{
                selected = path
                oldrow = x
                oldcol =y
                count++
            }
        }
    }
    $scope.reset = function(){
        for(var i = 0;i<4;i++){
            for(var j = 0;j<4;j++){
                var x = document.getElementById(i+""+j)
                if(x.title!="guessed"){
                    x.style.backgroundImage = "url(img/0.jpg)"
                }
            }
        }
    }
    $scope.win = function(){
        for(var i = 0;i<4;i++){
            for(var j = 0;j<4;j++){
                var x = document.getElementById(i+""+j)
                if(x.title!="guessed"){
                    return false
                }
            }
        }
        return true
    }
    $scope.end = function(b){
        if(b){
            $scope.winner = true
            $interval.cancel($scope.timeInterval)
            alert("wygrales!")
        }
    }
    $scope.timecheck = function(){
        console.log(currentTime.getTime())
        if(currentTime.getTime() == "00:00.000"){
            alert("Koniec czasu!")
            $interval.cancel($scope.timeInterval)
        }
    }
})
memory.controller("timer",function($scope,currentTime,$interval){
    var time = $scope.variables
    var start = true
    var endtime
    var stop = false
    var bar = document.getElementById("timestamp")
    var checkStart = $interval(function(){
        if(currentTime.getStart()){
            $interval.cancel(checkStart)
            var checkTime = $interval(function(){
                var t = Date.now()
                if(start){
                    endtime = new Date().getTime()
                    endtime = parseInt(endtime)+(parseInt(time)*1000) 
                    start = false
                    base = endtime-t
                }
                var obecny = endtime-t
                bar.style.width = (obecny/base)*100+"%"
                if((obecny/base)*100<20){
                    bar.style.backgroundColor = "red"
                }
                obecny = obecny % (60*60*1000)
                var minuty = Math.floor(obecny/(60*1000))
                obecny = obecny % (60*1000)
                var sekundy = Math.floor(obecny/1000)
                var milisekundy = obecny%1000
                if(obecny<0){
                    stop = true
                }
                if(currentTime.getWin()){
                    console.log("win")
                    $interval.cancel(checkTime)
                    currentTime.setTime("")
                    currentTime.setStart(false)
                    currentTime.setWin(false)
                }
                minuty = minuty.toString()
                sekundy = sekundy.toString()
                milisekundy = milisekundy.toString()
                if(minuty.length==1){
                    minuty = "0"+minuty
                }
                if(sekundy.length==1){
                    sekundy = "0"+sekundy
                }
                if(milisekundy.length==1){
                    milisekundy = "0"+milisekundy
                }
                if(milisekundy.length==2){
                    milisekundy = "0"+milisekundy
                }
                var stoperan = minuty+":"+sekundy+"."+milisekundy.toString()
                document.getElementById("timestamp").innerHTML = stoperan
                currentTime.setTime(stoperan)
                if(stop){
                    document.getElementById("timestamp").innerHTML = "00:00.000"
                    currentTime.setTime("00:00.000")
                    $interval.cancel(checkTime)
                }
                $scope.$on('$destroy', function() {
                    $interval.cancel(checkTime);
                    currentTime.setTime("")
                    currentTime.setStart(false)
                    currentTime.setWin(false)
                });
            },1)
        }
    },1)
    
})
memory.directive("myGame", function(){
    return{
        templateUrl: "game.html",
        controller: "main"
    }
})
memory.directive("myTime", function(){
    return{
        templateUrl: "time.html",
        controller: "timer"
    }
})
memory.service("currentTime",function(){
    var time = ""
    var start = false
    var win = false
    return {
        getTime: function () {
            return time;
        },
        setTime: function(value) {
            time = value;
        },
        getStart: function () {
            return start;
        },
        setStart: function(value) {
            start = value;
        },
        getWin: function () {
            return win;
        },
        setWin: function(value) {
            win = value;
        }
    };
})