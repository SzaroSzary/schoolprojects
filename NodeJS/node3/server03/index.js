module.exports = function (req, res) {

    var agent = req.headers["user-agent"]
    var name
    console.log(agent)
    if ((agent.indexOf("Chrome") != -1) && ((agent.indexOf("OPR") != -1) || (agent.indexOf("Opera") != -1))) {
        name = "Opera"
    }
    else if ((agent.indexOf("Chrome") != -1)) {
        name = "Google Chrome"
    }
    else if (agent.indexOf("Firefox") != -1) {
        name = "Mozilla Firefox"
    }
    else if ((agent.indexOf("Trident") != -1) || (agent.indexOf("MSIE") != -1)) {
        name = "Internet Explorer"
    }
    /*
    // potem metodą indexOf sprawdź czy w stringu agent 
    // występuje jeden z poniższych stringów:
	
    "Firefox"
    "Chrome"
    "Opera"
    "MSIE"
	
    // po sprawdzeniu zwróć obiekt zawierający informację 
    // z jakiej przeglądarki wchodzisz

    */
    return { browser: name+"" }

}