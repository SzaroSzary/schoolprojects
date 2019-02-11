var UI = {
    init: function () {
        $(".menu").click(function () {
            switch ($(this).index()) {
                case 0:
                    $("#settingspanel").animate({ left: "0%" }, 'fast')
                    break;
                case 1:
                    $("#settingspanel").animate({ left: "-100%" }, 'fast')
                    $("#todayscreen").fadeIn(500, function () {
                    })
                    if ($("#todayscreencontent").children().length == 0) {
                        var day = new Date()
                        var dayh = day.getDay()
                        var obj1 = {
                            action: "download",
                            day: dayh,
                            user: Settings.currentuser,
                        }
                        Database.methods.downloadfromTables(obj1)
                        .done(function (response) {
                            $("#todayscreencontent").empty()
                            Days.dayscreate(response)
                        })
                        .fail(function (response1) {
                            alert(response1.responseText)
                        })
                    }
                    break;
                case 2:
                    $("#settingspanel").animate({ left: "-100%" }, 'fast')
                    $("#weekscreen").fadeIn(500, function () {
                    })
                    if ($("#weekscreencontent").children().length == 0) {
                        var day = new Date()
                        var dayh = day.getDay()
                        var obj1 = {
                            action: "download",
                            day: dayh,
                            user: Settings.currentuser,
                        }
                        Database.methods.downloadfromTables(obj1)
                        .done(function (response) {
                            $("#weekscreencontent").empty()
                            Weeks.weekscreate(response)
                        })
                        .fail(function (response1) {
                            alert(response1.responseText)
                        })
                    }
                    break;
            }
        })
        var menu = false
        $(".openmenu").click(function () {
            if (menu) {
                $("#menu").animate({ left: "-100%" }, 'fast')
                menu = false
            }
            else {
                $("#menu").animate({ left: "0%" }, 'fast')
                menu = true
            }
        })
        $(".openhoursscreen").click(function () {
            $("#settingspanel").animate({ left: "-100%" }, 'fast')
            $("#hoursscreen").fadeIn(500, function () { })
            console.log($("#hoursscreencontent").children().length)
            if ($("#hoursscreencontent").children().length == 0) {
                var day = new Date()
                var dayh = day.getDay()
                var obj1 = {
                    action: "download",
                    day: dayh,
                    user: Settings.currentuser,
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
        })
        $(".opendatabasepanel").click(function () {
            $("#settingspanel").animate({ left: "-100%" }, 'fast')
            $("#databasepanel").animate({ left: "0%" }, 'fast')
        })
        $("#colors").click(function () {
            $("#settingspanel").animate({ left: "-100%" }, 'fast')
            $("#colorspanel").fadeIn(500, function () {
                Colors.generatecolors()
            })
        })
        $(".close").click(function () {
            $("#todayscreen").fadeOut(500, function () {
                $("#todayscreencontent").empty()
            })
            $("#weekscreen").fadeOut(500, function () {
                $("#weekscreencontent").empty()
            })
            $("#hoursscreen").fadeOut(500, function () {
                $("#hoursscreencontent").empty()
            })
        })
        $(".closecolorspanel").click(function () {
            $("#settingspanel").animate({ left: "0%" }, 'fast')
            $("#colorspanel").fadeOut(500, function () {
                $("#colorsoptions").remove()
                Settings.downloadfromserver()
            })
        })
        $(".closesettings").click(function () {
            $("#settingspanel").animate({ left: "-100%" }, 'fast')
        })
        $(".closesethours").click(function () {
            $("#sethoursscreen").fadeOut(500, function () {
                $("#sethourshours").empty()
                $("#sethoursminutes").empty()
                $("#sethoursinfo").empty()
            })
        })
        $(".closedatabasepanel").click(function () {
            $("#settingspanel").animate({ left: "0%" }, 'fast')
            $("#databasepanel").animate({ left: "-100%" }, 'fast')
        })
        $(".closedatabase").click(function () {
            $("#dataadded").fadeOut(500, function () { })
            $("#datadeleted").fadeOut(500, function () { })
            $("#tablescreated").fadeOut(500, function () { })
            $("#tablesdeleted").fadeOut(500, function () { })
        })
        $(".databasepanel").click(function () {
            switch ($(this).index()) {
                case 2:
                    var obj = {
                        action: "create",
                    }
                    Database.methods.createTables(obj)
                     .done(function (response) {
                         UI.methods.createTablesshowAlert(response)
                         UI.methods.createTablescloseAlert()
                     })
                     .fail(function (response) {
                         alert(response.responseText)
                     })
                    break;
                case 3:
                    var obj = {
                        action: "drop",
                    }
                    Database.methods.dropTables(obj)
                     .done(function (response) {
                         UI.methods.deleteTablesshowAlert(response)
                         UI.methods.deleteTablescloseAlert()
                     })
                     .fail(function (response) {
                         alert(response.responseText)
                     })
                    break;
                case 4:
                    var obj = {
                        action: "insert",
                        user: Settings.currentuser,
                    }
                    Database.methods.insertintoTables(obj)
                     .done(function (response) {
                         UI.methods.addDatashowAlert(response)
                         UI.methods.addDatacloseAlert()
                     })
                     .fail(function (response) {
                         alert(response.responseText)
                     })
                    break;
                case 5:
                    var obj = {
                        action: "delete",
                    }
                    Database.methods.deletefromTables(obj)
                     .done(function (response) {
                         UI.methods.deleteDatashowAlert(response)
                         UI.methods.deleteDatacloseAlert()
                     })
                     .fail(function (response) {
                         alert(response.responseText)
                     })
                    break;
                case 6:
                    var day = new Date()
                    var dayh = day.getDay()
                    console.log(dayh)
                    var obj = {
                        action: "download",
                        day: dayh,
                        user: Settings.currentuser,
                    }
                    Database.methods.downloadfromTables(obj)
                     .done(function (response) {
                         UI.methods.downloadDatashowAlert(response)
                         UI.methods.downloadDatacloseAlert()
                     })
                     .fail(function (response) {
                         alert(response.responseText)
                     })
                    break;
            }
        })
    },
    methods: {
        createTablesshowAlert: function (response) {
            $("#tablescreated").fadeIn(500, function () {
            })
            $("#tablescreated").html(response)
        },
        createTablescloseAlert: function () {
            $("#tablescreated").fadeOut(500, function () {
            })
        },
        deleteTablesshowAlert: function (response) {
            $("#tablesdeleted").fadeIn(500, function () {
            })
            $("#tablesdeleted").html(response)
        },
        deleteTablescloseAlert: function () {
            $("#tablesdeleted").fadeOut(500, function () {
            })
        },
        addDatashowAlert: function (response) {
            $("#dataadded").fadeIn(500, function () {
            })
            $("#dataadded").html(response)
        },
        addDatacloseAlert: function () {
            $("#dataadded").fadeOut(500, function () {
            })
        },
        deleteDatashowAlert: function (response) {
            $("#datadeleted").fadeIn(500, function () {
            })
            $("#datadeleted").html(response)
        },
        deleteDatacloseAlert: function () {
            $("#datadeleted").fadeOut(500, function () {
            })
        },
        downloadDatashowAlert: function (response) {
            $("#datadownloaded").fadeIn(500, function () {
            })
            $("#datadownloaded").html(response)
            Hours.hourscreate(response)
            Days.dayscreate(response)
            Weeks.weekscreate(response)
        },
        downloadDatacloseAlert: function () {
            $("#datadownloaded").fadeOut(500, function () {
            })
        },
    },
}