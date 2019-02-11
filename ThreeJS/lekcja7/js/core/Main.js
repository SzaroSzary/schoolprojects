var Main = function () {
    var szerokosc = window.innerWidth
    var wysokosc = window.innerHeight
    var fov = 45
    var res = 4 / 3
    var minrender = 0.1
    var maxrender = 10000

    var scene = new THREE.Scene();
    var camera1 = new THREE.PerspectiveCamera(fov, res, minrender, maxrender);
    camera1.aspect = 16 / 9;
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(szerokosc, wysokosc)
    renderer.autoClear = false;
    document.getElementById("main").appendChild(renderer.domElement);

    startScreen = new StartScreen();
    document.body.appendChild(startScreen.getScreen());

    var sky = new Sky
    sky = sky.getSky()
    scene.add(sky)
    var helicopter
    var helicopter1
    var cameracontroller
    this.selectedhelicopter = ""
    var throttle
    var rudder
    var elevation
    var helload = false
    var treeload = false
    var geometry = new THREE.CubeGeometry(10, 10, 10, 1, 1, 1);
    var material = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        side: THREE.DoubleSide,
    });

    var light = new THREE.PointLight(0xffffff, 1, 5000);
    scene.add(light);

    var geometryground = new THREE.PlaneGeometry(50, 50, 1, 1);
    var materialground = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: THREE.ImageUtils.loadTexture("gfx/ground.jpg")
    });
    var treetab = []
    var change = false
    var tree = new Tree()
    tree.loadModel("models/tree/tree.xml", function (modelData) {
        for (var i = 0; i < Settings.wielkoscTerenu; i++) {
            treetab[i] = []
            for (var j = 0; j < Settings.wielkoscTerenu; j++) {
                var obj = new THREE.Object3D()
                var ground = new THREE.Mesh(geometryground, materialground)
                ground.rotateX(Math.PI / 2)
                if (i == 0 && j == 0) {
                    var meshtree = modelData
                    obj.add(meshtree)
                    obj.add(ground)
                    obj.position.x = i * 50 - ((Settings.wielkoscTerenu / 2) * 50) + 25
                    obj.position.z = j * 50 - ((Settings.wielkoscTerenu / 2) * 50) + 25
                    obj.position.y = 5
                }
                else {
                    var clone = meshtree.clone()
                    obj.add(clone)
                    obj.add(ground)
                    obj.position.x = i * 50 - ((Settings.wielkoscTerenu / 2) * 50) + 25
                    obj.position.z = j * 50 - ((Settings.wielkoscTerenu / 2) * 50) + 25
                    obj.position.y = 5
                    obj.add(clone)
                }
                treetab[i].push(obj)
                scene.add(obj)
            }
        }
        treeload = true
    })
    var t = setInterval(function () {
        if (treeload && helload) {
            animateScene()
            clearInterval(t)
        }
    }, 1)
    /*var turnleft = false
    var turnright = false
    var move = false
    document.addEventListener("keydown", onKeyDown, false)
    document.addEventListener("keyup", onKeyUp, false)
    function onKeyDown(event) {
        var keyCode = event.which;
        switch (keyCode) {
            case 37:
                turnleft = true
                break;
            case 39:
                turnright = true
                break;
            case 38:
                move = true
                break;
        }
    }
    function onKeyUp(event) {
        var keyCode = event.which;
        switch (keyCode) {
            case 37:
                turnleft = false
                break;
            case 39:
                turnright = false
                break;
            case 38:
                move = false
                break;
        }
    }*/

    function distanceVector(v1, v2) {
        var dx = v1.x - v2.x;
        var dy = v1.y - v2.y;
        var dz = v1.z - v2.z;

        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
    var side = Math.floor(treetab.length / 2)
    console.log(side)

    function animateScene() {
        cameracontroller.update()
        throttle.update()
        rudder.update()
        elevation.update()
        var skyVect = new THREE.Vector3(0, 0, 0)
        var skyPos = skyVect.applyMatrix4(helicopter.matrixWorld);
        sky.position.x = skyPos.x
        sky.position.y = skyPos.y
        sky.position.z = skyPos.z
        var lightVect = new THREE.Vector3(0, 500, -2000)
        var lightPos = lightVect.applyMatrix4(sky.matrixWorld);
        light.position.x = lightPos.x
        light.position.y = lightPos.y
        light.position.z = lightPos.z
        helicopter.translateZ(Settings.szybkoscLotu)
        helicopter.translateY(Settings.szybkoscWznoszenia)
        helicopter.rotateY(Settings.szybkoscObrotu)
        /*if (move) {
            helicopter.translateZ(1)
        }
        if (turnleft) {
            helicopter.rotation.y += Math.PI / 72
        }
        else if (turnright) {
            helicopter.rotation.y -= Math.PI / 72
        }*/
        if (distanceVector(treetab[side][treetab[side].length - 1].position, helicopter.position) > (treetab.length / 2) * 70 + 5) {
            for (var i = 0; i < treetab[side].length; i++) {
                treetab[i].unshift(treetab[i].pop())
                treetab[i][0].translateZ(-treetab.length * 50)
            }
        }

        else if (distanceVector(treetab[side][0].position, helicopter.position) > (treetab.length / 2) * 70 + 5) {
            for (var i = 0; i < treetab[side].length; i++) {
                treetab[i][0].translateZ(treetab.length * 50)
                treetab[i].push(treetab[i].shift())
            }
        }

        if (distanceVector(treetab[0][side].position, helicopter.position) > (treetab.length / 2) * 70 + 5) {
            for (var i = 0; i < treetab[0].length; i++) {
                treetab[0][i].translateX(treetab.length * 50)
            }
            treetab.push(treetab.shift())
        }

        else if (distanceVector(treetab[treetab[side].length - 1][0].position, helicopter.position) > (treetab.length / 2) * 70 + 5) {
            treetab.unshift(treetab.pop())
            for (var i = 0; i < treetab[0].length; i++) {
                treetab[0][i].translateX(-treetab.length * 50)
            }
        }

        for (var i = 0; i < treetab.length; i++) {
            for (var j = 0; j < treetab[i].length; j++) {
                if (distanceVector(treetab[i][j].position, helicopter.position) > (treetab.length / 2) * 50)
                    treetab[i][j].visible = false;
                else
                    treetab[i][j].visible = true;
            }
        }
        helicopter1.updateModel()
        camera1.updateProjectionMatrix();
        renderer.render(scene, camera1);
        requestAnimationFrame(animateScene);
    }
    this.loadmodel = function (index) {
        helicopter1 = new Helicopter1()
        helicopter1.loadModel(Materials.modelsxml[index], function (modelData) {
            helicopter = modelData
            helicopter.position.y = 100
            scene.add(helicopter)
            helload = true
            document.getElementById("StartScreen").style.opacity = 0
            var camselection = new MenuScreen()
            document.body.appendChild(camselection.getScreen())
            throttle = new Slider("throttle")
            document.body.appendChild(throttle.createSlider())
            rudder = new Slider("rudder")
            document.body.appendChild(rudder.createSlider())
            elevation = new Slider("elevation")
            document.body.appendChild(elevation.createSlider())
            cameracontroller = new CameraController(camera1, helicopter)
        })
    }
}