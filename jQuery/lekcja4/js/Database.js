var Database = {
    methods: {
        //utworzenie tabeli, przesyłam obiekt do wysłania Ajaxem
        createTables: function (obj) {
            return Ajax.send(obj, Settings.urls.databaseUrl)
        },
        dropTables: function (obj) {
            return Ajax.send(obj, Settings.urls.databaseUrl)
        },
        insertintoTables: function (obj) {
            return Ajax.send(obj, Settings.urls.databaseUrl)
        },
        deletefromTables: function (obj) {
            return Ajax.send(obj, Settings.urls.databaseUrl)
        },
        downloadfromTables: function (obj) {
            return Ajax.send(obj, Settings.urls.databaseUrl)
        },
        updateTables: function (obj) {
            return Ajax.send(obj, Settings.urls.databaseUrl)
        },
        updateColors: function (obj) {
            return Ajax.send(obj, Settings.urls.databaseUrl)
        },
        currentUser: function (obj) {
            return Ajax.send(obj, Settings.urls.databaseUrl)
        },
    }
}