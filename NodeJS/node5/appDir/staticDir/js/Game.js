/*
    klasa Game
*/

function Game() {

    /*
        zmienna prywatna widoczna tylko w tej funkcji (klasie)
    */

    var camx = 0
    var camy = 600
    var camz = 1200
    var camera
    var mesh
    var material
    var redmat
    var yelmat
    var scene
    var renderer
    var raycaster
    var mouseVector
    var player
    var gametab = []

    /*
        zmienna publiczna, dostępna z innych klas/plików, nie używać
    */
    //this.test = 0; 

    /*
        funkcja prywatna widoczna tylko w tej funkcji (klasie)
    */
    function initEngine() {
        var szerokosc = window.innerWidth
        var wysokosc = window.innerHeight
        var fov = 45
        var res = 4 / 3
        var minrender = 0.1
        var maxrender = 10000
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
            fov,
            res,
            minrender,
            maxrender
            );
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x000000);
        renderer.setSize(szerokosc, wysokosc);
    }
    function initMaterials() {
        material = new THREE.MeshBasicMaterial({
            color: 0x0000ff, side: THREE.DoubleSide, wireframe: true
        });
        /*redmat = new THREE.MeshBasicMaterial({
            color: 0xff0000, side: THREE.DoubleSide
        });
        yelmat = new THREE.MeshBasicMaterial({
            color: 0xffff00, side: THREE.DoubleSide
        });*/
    }
    function initObjects() {
        var plansza = new THREE.PlaneGeometry(1000, 1000, 8, 8)
        mesh = new THREE.Mesh(plansza, material);
        mesh.rotateX(Math.PI / 2)
        scene.add(mesh);

        /*var redbox = new THREE.BoxGeometry(250, 125, 125, 1, 1, 1)
        var redmesh = new THREE.Mesh(redbox, redmat);
        redmesh.position.x = 0
        redmesh.position.y = 62.5
        redmesh.position.z = 437.5
        scene.add(redmesh)

        var yelbox = new THREE.BoxGeometry(250, 125, 125, 1, 1, 1)
        var yelmesh = new THREE.Mesh(yelbox, yelmat);
        yelmesh.position.x = 0
        yelmesh.position.y = 62.5
        yelmesh.position.z = -437.5
        scene.add(yelmesh)*/

        var axis = new THREE.AxisHelper(500);
        scene.add(axis);
        document.getElementById("plansza").appendChild(renderer.domElement);
        camera.position.x = camx;
        camera.position.y = camy;
        camera.position.z = camz;
        camera.lookAt(mesh.position);
    }

    function initEvents() {

    }
    function initChessboard() {
        var szachownica = [
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1]
        ];
        var color
        for (var i = -500, k = 0; k < 8 ; k++, i += 125) {
            for (var j = -500, m = 0; m < 8 ; m++, j += 125) {
                var pole = new THREE.BoxGeometry(125, 125, 10, 1, 1, 1)
                var polematerial
                if (szachownica[k][m] == 0) {
                    polematerial = new THREE.MeshBasicMaterial({
                        side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('img/white.jpg')
                    });
                    color = "white"
                }
                else {
                    polematerial = new THREE.MeshBasicMaterial({
                        side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('img/black.jpg')
                    });
                    color = "black"
                }
                var polemesh = new THREE.Mesh(pole, polematerial)
                polemesh.rotateX(Math.PI / 2)
                polemesh.name = color
                polemesh.position.z = i + 62.5;
                polemesh.position.x = j + 62.5;
                scene.add(polemesh)
            }
        }
    }
    function initPawns() {
        for (var i = -500, k = 0; k < 8 ; k++, i += 125) {
            for (var j = -500, m = 0; m < 8 ; m++, j += 125) {
                var pionek = new THREE.CylinderGeometry(40, 40, 20, 30)
                var pionekmaterial
                if (gametab[k][m] == 1) {
                    pionekmat = new THREE.MeshBasicMaterial({
                        color: 0xff0000, side: THREE.DoubleSide
                    });

                    var pionekmesh = new THREE.Mesh(pionek, pionekmat)
                    pionekmesh.position.z = i + 62.5;
                    pionekmesh.position.x = j + 62.5;
                    pionekmesh.position.y += 10
                    pionekmesh.name = "red"
                    pionekmesh.userData = { color: "red", x: (j / 125) + 4, z: (i / 125) + 4, oldx: (j / 125) + 4, oldz: (i / 125) + 4 }
                    scene.add(pionekmesh)
                }
                else if (gametab[k][m] == 2) {
                    pionekmat = new THREE.MeshBasicMaterial({
                        color: 0xffff00, side: THREE.DoubleSide
                    });

                    var pionekmesh = new THREE.Mesh(pionek, pionekmat)
                    pionekmesh.position.z = i + 62.5;
                    pionekmesh.position.x = j + 62.5;
                    pionekmesh.position.y += 10
                    pionekmesh.name = "yellow"
                    pionekmesh.userData = { color: "yellow", x: (j / 125) + 4, z: (i / 125) + 4, oldx: (j / 125) + 4, oldz: (i / 125) + 4 }
                    scene.add(pionekmesh)
                }
            }
        }
    }
    function createConnectionObject(oldx, oldy, oldz, newx, newy, newz) {
        return {
            oldx: oldx,
            oldy: oldy,
            oldz: oldz,
            newx: newx,
            newy: newy,
            newz: newz,
        }
    }
    function printGameTab() {
        var x = document.createElement("div")
        x.setAttribute("style", "width:150px;height:150px;position:absolute;left:0;bottom:0;font-size:10;color:yellow;")
        if (player == 1) {
            console.log(player)
            for (var i = gametab.length - 1; i >= 0; i--) {
                for (var j = gametab[i].length-1; j >= 0; j--) {
                    x.innerHTML = x.innerHTML + gametab[i][j] + "   "
                }
                x.innerHTML = x.innerHTML + "<br/>"
            }
        }
        else {
            console.log(player)
            for (var i = 0; i < gametab.length; i++) {
                for (var j = 0; j < gametab[i].length; j++) {
                    x.innerHTML = x.innerHTML + gametab[i][j] + "   "
                }
                x.innerHTML = x.innerHTML + "<br/>"
            }
        }
        x.id = "gametab"
        document.body.appendChild(x)
    }
    var sel = false
    var pawn
    var currentpawndata
    function onMouseDown(event) {
        raycaster = new THREE.Raycaster()
        mouseVector = new THREE.Vector2()
        mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);
        var intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
            console.log(player)
            if (player == "1") {
                if (intersects[0].object.name == "red") {
                    pawn = intersects[0].object
                    pawn.material = new THREE.MeshBasicMaterial({
                        color: 0x0f0f0f, side: THREE.DoubleSide
                    });
                    pawn.name = "selected"
                    currentpawndata = pawn.userData
                    console.log(currentpawndata)
                    sel = true
                }
            }
            else {
                if (intersects[0].object.name == "yellow") {
                    pawn = intersects[0].object
                    pawn.material = new THREE.MeshBasicMaterial({
                        color: 0xff00ff, side: THREE.DoubleSide
                    });
                    pawn.name = "selected"
                    currentpawndata = pawn.userData
                    console.log(currentpawndata)
                    sel = true
                }
            }
            if (intersects[0].object.name == "black") {
                if (sel) {
                    console.log(pawn)
                    var field = intersects[0].object
                    createConnectionObject(pawn.position.x, pawn.position.y, pawn.position.z, field.position.x, field.position.y, field.position.z)
                    pawn.position.x = field.position.x
                    pawn.position.y = field.position.y
                    pawn.position.z = field.position.z
                    pawn.userData.oldx = pawn.userData.x
                    pawn.userData.oldz = pawn.userData.z
                    pawn.userData.x = (pawn.position.x/125)+3.5
                    pawn.userData.z = (pawn.position.z/125)+3.5
                    if (player == "1") {
                        pawn.name = "red"
                        pawn.material = new THREE.MeshBasicMaterial({
                            color: 0xff0000, side: THREE.DoubleSide
                        });
                    }
                    else {
                        pawn.name = "yellow"
                        pawn.material = new THREE.MeshBasicMaterial({
                            color: 0xffff00, side: THREE.DoubleSide
                        });
                    }
                    net.updateGameTab(pawn.userData, player) 
                    pawn = null
                    sel = false
                }
            }
        }
        var data = new createConnectionObject()
    }
    function animateScene() {
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        requestAnimationFrame(animateScene);
    }

    initEngine() 	// scena, kamera, 
    initMaterials() // wszystkie materiały
    initObjects() 	// obiekty gry - geometrie, osie, meshe
    initEvents() 	// eventy - mysz, klawiatura, resize etc        
    initChessboard()
    //initPawns()
    animateScene(); // pętla głowna gry

    /*
        funkcje publiczne możliwe do wywołania z innych funkcji (klas)
    */


    /*this.setTest = function (val) {
        test = val;
        alert("ustawiam test w klasie Game na: " + test)
    }

    this.getTest = function () {
        return test;
    }*/
    this.setCamera = function (x) {
        switch (x) {
            case "player 1":
                camera.position.x = 0
                camera.position.y = 600
                camera.position.z = -1200
                camera.lookAt(mesh.position);
                break;
            case "player 2":
                camera.position.x = 0
                camera.position.y = 600
                camera.position.z = 1200
                camera.lookAt(mesh.position);
                break;
            case "flat":
                camera.position.x = 0
                camera.position.y = 0
                camera.position.z = -1200
                camera.lookAt(mesh.position);
                break;
            case "bird":
                camera.position.x = 0
                camera.position.y = 2000
                camera.position.z = 0
                camera.lookAt(mesh.position);
                break;
        }
    }
    this.startGame = function () {
        initPawns()
    }
    this.setPlayer = function (value) {
        player = value
        console.log(player)
    }
    this.preparePawns = function (data) {
        if (document.getElementById("gametab")) {
            var x = document.getElementById("gametab").parentNode
            x.removeChild(document.getElementById("gametab"))
        }
        gametab = JSON.parse(data)
        console.log(gametab)
        printGameTab()
        net.compareGameTab(gametab, player)
    }
    document.addEventListener("mousedown", onMouseDown, false);
}