function Level(){
    this.init = function () {
        var mixer = []
        var leveldata = new LevelData()
        window.addEventListener("load", function () {
            var szerokosc = window.innerWidth
            var wysokosc = window.innerHeight
            var fov = 45
            var res = 4 / 3
            var minrender = 0.1
            var maxrender = 10000
            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(
                fov,
                res,
                minrender,
                maxrender
            );
            var intensity = 4
            var lighttab = new THREE.Object3D
            var character
            var firetab = new THREE.Object3D
            var fireanim
            var fireon = false
            var outsidefire = new Fire()
            var outsidelight = new MyLight()
            var laser
            var enlaser
            var laserobj
            var enlaserobj
            var enlasertab = []
            var enlaserupdate = []
            var enemiestab = []
            var enemiesobjtab = []
            var playerlife = 30
            var playerammo = 30
            var renderer = new THREE.WebGLRenderer();
            renderer.setClearColor(0xffffff);
            renderer.setSize(szerokosc, wysokosc);
            renderer.shadowMap.enabled = true
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            var levelinfo = leveldata.getData()
            var size = levelinfo.size
            var corect = ((size * 100) / 2) - 50
            var floor = new THREE.PlaneGeometry(size * 100, size * 100, 64, 64);
            var floormaterial = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                specular: 0xffffff,
                shininess: 30,
                side: THREE.BackSide,
                map: THREE.ImageUtils.loadTexture("img/floor.jpg"),
            })
            var floormesh = new THREE.Mesh(floor, floormaterial);
            floormesh.rotateX(Math.PI / 2)
            floormesh.receiveShadow = true
            floormesh.material.map.repeat.set(16, 16);
            floormesh.material.map.wrapS = floormesh.material.map.wrapT = THREE.RepeatWrapping;
            scene.add(floormesh);
            var ceiling = new THREE.PlaneGeometry(size * 100, size * 100, 64, 64)
            var ceilingmaterial = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                specular: 0xffffff,
                shininess: 30,
                side: THREE.FrontSide,
                map: THREE.ImageUtils.loadTexture("img/ceiling.jpg"),
            })
            var ceilingmesh = new THREE.Mesh(ceiling, ceilingmaterial)
            ceilingmesh.rotateX(Math.PI / 2)
            ceilingmesh.receiveShadow = true
            ceilingmesh.position.y = 100
            ceilingmesh.material.map.repeat.set(16, 16);
            ceilingmesh.material.map.wrapS = ceilingmesh.material.map.wrapT = THREE.RepeatWrapping;
            scene.add(ceilingmesh);
            function wall() {
                var wall = new THREE.Object3D()
                var geometry = new THREE.CubeGeometry(100, 100, 100, 1, 1, 1);
                var frontMaterial = new THREE.MeshPhongMaterial({
                    color: 0xffffff,
                    specular: 0xffffff,
                    shininess: 30,
                    side: THREE.FrontSide,
                    map: THREE.ImageUtils.loadTexture("img/wall.jpg"),
                    transparent: true
                })
                var backMaterial = new THREE.MeshPhongMaterial({
                    side: THREE.BackSide,
                    color: 0xff0000,
                    opacity: 0.5,
                    transparent: true
                })
                var materials = [frontMaterial, backMaterial];
                var mesh = THREE.SceneUtils.createMultiMaterialObject(geometry, materials)
                wall.add(mesh)
                return wall
            }
            function light() {
                var light = new MyLight(scene)
                var main = light
                light = light.getLight();
                light.castShadow = true
                return light
            }
            function fire() {
                var insidefire = new Fire()
                fireanim = insidefire
                insidefire = insidefire.getFire()
                return insidefire
            }
            var loader = []
            function player() {
                var newplayer = new PlayerModel(loader, scene, mixer)
                newplayer = newplayer.getPlayer()
                newplayer.position.y = 26
                return newplayer
            }
            function enemy() {
                var enemies = new EnemyModel(loader, scene, mixer, enemiestab)
                enemies = enemies.getEnemy()
                return enemies
            }
            function lasercreate() {
                laser = new Laser(character.position.x, character.position.y, character.position.z)
                laserobj = laser.playerLaser()
                return laserobj
            }
            function enlasercreate(x, y, z) {
                enlaser = new EnemyLaser(x, y, z)
                enlaserupdate.push(enlaser)
                enlaserobj = enlaser.enemyLaser()
                return enlaserobj
            }
            for (var i = 0; i < levelinfo.level.length; i++) {
                switch (levelinfo.level[i].type) {
                    case "wall":
                        var walls = new wall()
                        walls.position.x = (levelinfo.level[i].x * 100) - corect
                        walls.position.z = (levelinfo.level[i].z * 100) - corect
                        walls.position.y = 50
                        scene.add(walls)
                        break
                    case "enemy":
                        var mino = new enemy()
                        var minolaser = new enlasercreate()
                        mino.position.x = (levelinfo.level[i].x * 100) - corect
                        mino.position.z = (levelinfo.level[i].z * 100) - corect
                        mino.position.y = 36
                        enemiesobjtab.push(mino)
                        scene.add(mino)
                        minolaser.position.x = (levelinfo.level[i].x * 100) - corect
                        minolaser.position.z = (levelinfo.level[i].z * 100) - corect
                        minolaser.position.y = 36
                        enlasertab.push(minolaser)
                        scene.add(minolaser)
                        console.log(enlasertab)
                        break
                    case "light":
                        var lights = new light()
                        var fires = new fire()
                        fires.position.x = lights.position.x = (levelinfo.level[i].x * 100) - corect
                        fires.position.z = lights.position.z = (levelinfo.level[i].z * 100) - corect
                        fires.position.y = lights.position.y = 5
                        lighttab.add(lights)
                        firetab.add(fires)
                        break
                }
                if (!character) {
                    character = new player()
                    character.position.x = -600
                    character.position.z = 700
                    scene.add(character)
                }
                if (i == levelinfo.level.length - 1) {
                    fireon = true
                    scene.add(firetab)
                    scene.add(lighttab)

                }
            }
            document.getElementById("fov").oninput = function () {
                camera.fov = parseInt(document.getElementById("fov").value)
            }
            document.getElementById("camlength").oninput = function () {
                camvectx = parseInt(document.getElementById("camlength").value)
            }
            document.getElementById("camheight").oninput = function () {
                camvecty = parseInt(document.getElementById("camheight").value)
            }
            document.getElementById("shadows").onchange = function () {
                if (renderer.shadowMap.enabled) {
                    renderer.shadowMap.enabled = false
                }
                else {
                    renderer.shadowMap.enabled = true
                }
            }
            document.getElementById("intensity").oninput = function () {
                for (var i = 0; i < lighttab.children.length; i++) {
                    lighttab.children[i].children[0].intensity = parseInt(document.getElementById("intensity").value)
                }
            }
            document.addEventListener("keydown", onKeyDown, false)
            document.addEventListener("keyup", onKeyUp, false)
            var move = false
            var turnleft = false
            var turnright = false
            var laserbool = false
            var enlaserbool = false
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
                        mixer[0].uncacheRoot(mixer[0].getRoot())
                        mixer[0].clipAction("run").play()
                        break;
                    case 32:
                        if (!laserbool) {
                            laserobj = lasercreate()
                        }
                        laserbool = true
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
                        mixer[0].uncacheRoot(mixer[0].getRoot())
                        mixer[0].clipAction("stand").play()
                        break;
                    case 32:
                        scene.remove(laserobj)
                        laserbool = false
                        break
                }
            }
            var camvectz = -100
            var camvecty = 25
            document.getElementById("main").appendChild(renderer.domElement);
            var pos = 1000
            var stats = new Stats();
            stats.showPanel(0);
            stats.begin();
            document.body.appendChild(stats.dom);
            var clock = new THREE.Clock();
            var raycaster = new THREE.Raycaster()
            var hitcounter = 0
            var hpcounter = 40
            var ammocounter = 0
            var playerhpcounter = 40
            function animateScene() {
                if (hpcounter == 50) {
                    if (document.getElementById("enemy0")) {
                        for (var f = 0; f < enemiestab.length; f++) {
                            var elem = document.getElementById("enemy" + f);
                            elem.parentNode.removeChild(elem);
                        }
                    }
                    for (var f = 0; f < enemiestab.length; f++) {
                        var g = document.createElement("div")
                        g.setAttribute("style", "position:absolute;left:0;top:" + (120 + (f * 50)) + "px;width:250px;height:50px;")
                        g.id = "enemy" + f
                        document.body.appendChild(g)
                        for (var h = 0; h < enemiestab[f].life; h++) {
                            var k = document.createElement("img")
                            k.src = "img/heart.png"
                            k.setAttribute("style", "position:absolute;left:" + (25 * h) + "px;top:0;width:25px;height:25px;")
                            g.appendChild(k)
                        }
                    }
                    hpcounter = 0
                }
                hpcounter++
                stats.begin();
                var delta = clock.getDelta();
                for (var i = 0; i < mixer.length; i++) {
                    if (mixer[i]) { mixer[i].update(delta) }
                }
                if (fireon) {
                    for (var i = 0; i < firetab.children.length; i++) {
                        outsidefire.updateFire(firetab.children[i])
                    }
                }
                var camVect = new THREE.Vector3(0, camvecty, camvectz)
                var camPos = camVect.applyMatrix4(character.matrixWorld);
                camera.position.x = camPos.x
                camera.position.y = camPos.y
                camera.position.z = camPos.z
                camera.lookAt(character.position)
                if (move) {
                    character.translateZ(5)
                }
                if (turnleft) {
                    character.rotation.y += Math.PI / 72
                }
                else if (turnright) {
                    character.rotation.y -= Math.PI / 72
                }
                if (laserbool) {
                    scene.remove(laserobj)
                    var laservectx = 0
                    var laserVect = new THREE.Vector3(0, 0, 0)
                    var laserPos = laserVect.applyMatrix4(character.matrixWorld);
                    laserobj.position.x = laserPos.x
                    laserobj.position.y = laserPos.y
                    laserobj.position.z = laserPos.z
                    laserobj.rotation.y = character.rotation.y
                    laserobj.rotateY(-Math.PI/2)
                    scene.add(laserobj)
                    laser.update(character.position.x, character.position.y, character.position.z)
                    if (ammocounter == 70) {
                        playerammo--
                        ammocounter = 0
                    }
                    ammocounter++
                }
                for (var i = 0; i < enemiesobjtab.length; i++) {
                    enemiesobjtab[i].lookAt(character.position)
                }
                for (var i = 0; i < enlasertab.length; i++) {
                    scene.remove(enlasertab[i])
                    scene.add(enlasertab[i])
                    enlasertab[i].lookAt(character.position)
                    enlasertab[i].rotateY(-Math.PI/2)
                    enlaserupdate[i].update()
                }
                var ray = new THREE.Ray(character.position, character.getWorldDirection())
                raycaster.ray = ray
                var intersects = raycaster.intersectObjects(enemiestab);
                if (intersects.length > 0 && laserbool && intersects[0].distance < 200) {
                    hitcounter++
                    if (hitcounter == 50) {
                        intersects[0].object.life--
                        hitcounter = 0
                    }
                    console.log(intersects[0].object.life)
                }
                if (!laserbool) {
                    hitcounter = 0
                    ammocounter = 0
                }
                if (character && playerhpcounter == 50) {
                    if (document.getElementById("playerdata")) {
                        var elem = document.getElementById("playerdata");
                        elem.parentNode.removeChild(elem);
                    }
                    var o = document.createElement("div")
                    o.setAttribute("style", "position:absolute;right:0;top:500px;width:750px;height:100px;")
                    o.id = "playerdata"
                    document.body.appendChild(o)
                    for (var h = 0; h < playerlife; h++) {
                        var k = document.createElement("img")
                        k.src = "img/heart.png"
                        k.setAttribute("style", "position:absolute;right:" + (25 * h) + "px;top:0;width:25px;height:25px;")
                        o.appendChild(k)
                    }
                    for (var h = 0; h < playerammo; h++) {
                        var k = document.createElement("img")
                        k.src = "img/beam.png"
                        k.setAttribute("style", "position:absolute;right:" + (25 * h) + "px;top:50px;width:25px;height:25px;")
                        o.appendChild(k)
                    }
                    playerhpcounter = 0
                }
                playerhpcounter++
                stats.begin();
                camera.updateProjectionMatrix();
                renderer.render(scene, camera);
                stats.end();
                requestAnimationFrame(animateScene);
            }
            animateScene();
        })
    }
}