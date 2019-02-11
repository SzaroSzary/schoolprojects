var Main = function(client, player) {

    /*
        zmienna prywatna widoczna tylko w tej funkcji (klasie)
    */

    var camx = 0
    var camy = 50
    var camz = -300
    var camera
    var scene
    var renderer
    var cannon1
    var cannon2
    var angle = parseInt(document.getElementById("angle").value)
    var bullet1
    var bullet2
    var speed = 100
    var boom = false
    var t = 0
    var lufapos
    var plain
    var odrzutbool = false
    var odrzutlicz = 0
    var shaker = false

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
        renderer.setClearColor(0xffffff);
        renderer.setSize(szerokosc, wysokosc);
    }
    function initObjects() {

        var axis = new THREE.AxisHelper(500);
        scene.add(axis);
        document.getElementById("plansza").appendChild(renderer.domElement);
        camera.position.x = camx;
        camera.position.y = camy;
        camera.position.z = camz;
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        for (var i = -30; i < 30; i++) {
            for (var j = -30; j < 30; j++) {

                var plain = new Plain()
                plain = plain.create()
                scene.add(plain)
                plain.position.x = i * 10
                plain.position.z = j * 10
            }
        }

    }
    function initBullet() {
        scene.remove(bullet1)
        scene.remove(bullet2)
        bullet1 = new Bullet()
        bullet1 = bullet1.create()
        scene.add(bullet1)
        bullet1.position.y = 35
        bullet1.position.z = 20
        bullet2 = new Bullet()
        bullet2 = bullet2.create()
        scene.add(bullet2)
        bullet2.position.x = 70
        bullet2.position.y = 35
        bullet2.position.z = 20
    }
    function initCannon() {
        scene.remove(cannon1)
        scene.remove(cannon2)
        cannon1 = new Cannon()
        cannon1 = cannon1.create()
        scene.add(cannon1)
        cannon2 = new Cannon()
        cannon2 = cannon2.create()
        scene.add(cannon2)
        cannon2.position.x = 70
    }
    function animateScene() {
        if (boom) {
            if (player == 1) {
                bullet1.position.x = speed * t * cannon1.getWorldDirection().x
                bullet1.position.y = speed * t * Math.sin(angle) - ((9.8105 * t * t) / 2)
                bullet1.position.z = speed * t * cannon1.getWorldDirection().z
                t += 0.1
                if (odrzutbool) {
                    var odrzutvector = new THREE.Vector3(0, 0, -40)
                    var armPos = odrzutvector.applyMatrix4(cannon1.matrixWorld);
                    cannon1.position.x = armPos.x
                    cannon1.position.y = armPos.y
                    cannon1.position.z = armPos.z
                    odrzutbool = false
                }
                else {
                    if (odrzutlicz <= 40) {
                        var odrzutvector = new THREE.Vector3(0, 0, 1)
                        var armPos = odrzutvector.applyMatrix4(cannon1.matrixWorld);
                        cannon1.position.x = armPos.x
                        cannon1.position.y = armPos.y
                        cannon1.position.z = armPos.z
                        odrzutlicz++
                    }
                }
                if (bullet1.position.y < -50) {
                    shaker = true
                }
                if (shaker) {
                    var shaking = Math.random() * 0.05
                    camera.rotation.z = Math.PI + shaking
                    setTimeout(function () {
                        shaker = false
                        boom = false
                        odrzutlicz = 0
                        camera.rotation.z = Math.PI
                        t = 0
                        scene.remove(bullet1)
                        initBullet()
                        var theta = (document.getElementById("turn").value) * (Math.PI / 180)
                        var theta2 = (document.getElementById("angle").value) * (Math.PI / 180)
                        bullet1.position.x = 30 * Math.cos(theta2) * Math.sin(theta)
                        bullet1.position.y = 30 * Math.sin(theta2) + 15
                        bullet1.position.z = 30 * Math.cos(theta2) * Math.cos(theta)
                    }, 500)
                }
                client.emit("shotdata", {
                    bulletx: bullet1.position.x,
                    bullety: bullet1.position.y,
                    bulletz: bullet1.position.z,
                    camerarot: camera.rotation.z,
                    cannonx: cannon1.position.x,
                    cannony: cannon1.position.y,
                    cannonz: cannon1.position.z
                })
            }
            else {
                bullet2.position.x = speed * t * cannon2.getWorldDirection().x + 100
                bullet2.position.y = speed * t * Math.sin(angle) - ((9.8105 * t * t) / 2)
                bullet2.position.z = speed * t * cannon2.getWorldDirection().z
                t += 0.1
                if (odrzutbool) {
                    var odrzutvector = new THREE.Vector3(0, 0, -40)
                    var armPos = odrzutvector.applyMatrix4(cannon2.matrixWorld);
                    cannon2.position.x = armPos.x
                    cannon2.position.y = armPos.y
                    cannon2.position.z = armPos.z
                    odrzutbool = false
                }
                else {
                    if (odrzutlicz <= 40) {
                        var odrzutvector = new THREE.Vector3(0, 0, 1)
                        var armPos = odrzutvector.applyMatrix4(cannon2.matrixWorld);
                        cannon2.position.x = armPos.x
                        cannon2.position.y = armPos.y
                        cannon2.position.z = armPos.z
                        odrzutlicz++
                    }
                }
                console.log(bullet2.position.y)
                if (bullet2.position.y < -50) {
                    shaker = true
                }
                if (shaker) {
                    var shaking = Math.random() * 0.05
                    camera.rotation.z = Math.PI + shaking
                    setTimeout(function () {
                        shaker = false
                        boom = false
                        odrzutlicz = 0
                        camera.rotation.z = Math.PI
                        t = 0
                        scene.remove(bullet2)
                        initBullet()
                        var theta = (document.getElementById("turn").value) * (Math.PI / 180)
                        var theta2 = (document.getElementById("angle").value) * (Math.PI / 180)
                        bullet2.position.x = 30 * Math.cos(theta2) * Math.sin(theta) + 70
                        bullet2.position.y = 30 * Math.sin(theta2) + 15
                        bullet2.position.z = 30 * Math.cos(theta2) * Math.cos(theta)
                    }, 500)
                }
                client.emit("shotdata", {
                    bulletx: bullet2.position.x,
                    bullety: bullet2.position.y,
                    bulletz: bullet2.position.z,
                    camerarot: camera.rotation.z,
                    cannonx: cannon2.position.x,
                    cannony: cannon2.position.y,
                    cannonz: cannon2.position.z
                })
            }
        }
        client.emit("boom", {
            boom: boom
        })
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        requestAnimationFrame(animateScene);
    }
    document.getElementById("turn").oninput = function () {
        if (player == 1) {
            scene.remove(cannon1)
            cannon1 = new Cannon()
            var cannon12 = cannon1
            angle = parseInt(document.getElementById("angle").value) * (Math.PI / 180)
            cannon1 = cannon1.rotatelufa((Math.PI / 2) - angle)
            cannon1 = cannon12.rotatearmata(parseInt(document.getElementById("turn").value) * Math.PI / 180)
            var theta = (document.getElementById("turn").value) * (Math.PI / 180)
            var theta2 = (document.getElementById("angle").value) * (Math.PI / 180)
            bullet1.position.x = 30 * Math.cos(theta2) * Math.sin(theta)
            bullet1.position.y = 30 * Math.sin(theta2) + 15
            bullet1.position.z = 30 * Math.cos(theta2) * Math.cos(theta)
            scene.add(cannon1)
            client.emit("positiondata", {
                theta: theta,
                theta2: theta2,
                angle: angle
            })
        }
        else {
            scene.remove(cannon2)
            cannon2 = new Cannon()
            var cannon22 = cannon2
            angle = parseInt(document.getElementById("angle").value) * (Math.PI / 180)
            cannon2 = cannon2.rotatelufa((Math.PI / 2) - angle)
            cannon2 = cannon22.rotatearmata(parseInt(document.getElementById("turn").value) * Math.PI / 180)
            cannon2.position.x = 70
            var theta = (document.getElementById("turn").value) * (Math.PI / 180)
            var theta2 = (document.getElementById("angle").value) * (Math.PI / 180)
            bullet2.position.x = 30 * Math.cos(theta2) * Math.sin(theta)+70
            bullet2.position.y = 30 * Math.sin(theta2) + 15
            bullet2.position.z = 30 * Math.cos(theta2) * Math.cos(theta)
            scene.add(cannon2)
            client.emit("positiondata", {
                theta: theta,
                theta2: theta2,
                angle: angle
            })
        }
    }
    document.getElementById("angle").oninput = function () {
        if (player == 1) {
            scene.remove(cannon1)
            cannon1 = new Cannon()
            var cannon12 = cannon1
            angle = parseInt(document.getElementById("angle").value) * (Math.PI / 180)
            cannon1 = cannon1.rotatelufa((Math.PI / 2) - angle)
            cannon1 = cannon12.rotatearmata(parseInt(document.getElementById("turn").value) * Math.PI / 180)
            var theta = (document.getElementById("turn").value) * (Math.PI / 180)
            var theta2 = (document.getElementById("angle").value) * (Math.PI / 180)
            bullet1.position.x = 30 * Math.cos(theta2) * Math.sin(theta)
            bullet1.position.y = 30 * Math.sin(theta2) + 15
            bullet1.position.z = 30 * Math.cos(theta2) * Math.cos(theta)
            scene.add(cannon1)
            client.emit("positiondata", {
                theta: theta,
                theta2: theta2,
                angle: angle
            })
        }
        else {
            scene.remove(cannon2)
            cannon2 = new Cannon()
            var cannon22 = cannon2
            angle = parseInt(document.getElementById("angle").value) * (Math.PI / 180)
            cannon2 = cannon2.rotatelufa((Math.PI / 2) - angle)
            cannon2 = cannon22.rotatearmata(parseInt(document.getElementById("turn").value) * Math.PI / 180)
            cannon2.position.x = 70
            var theta = (document.getElementById("turn").value) * (Math.PI / 180)
            var theta2 = (document.getElementById("angle").value) * (Math.PI / 180)
            bullet2.position.x = 30 * Math.cos(theta2) * Math.sin(theta) + 70
            bullet2.position.y = 30 * Math.sin(theta2) + 15
            bullet2.position.z = 30 * Math.cos(theta2) * Math.cos(theta)
            scene.add(cannon2)
            client.emit("positiondata", {
                theta: theta,
                theta2: theta2,
                angle: angle
            })
        }
    }

    this.updateCannon = function (angle, theta, theta2) {
        if (player == 1) {
            scene.remove(cannon2)
            cannon2 = new Cannon()
            var cannon22 = cannon2
            cannon2 = cannon2.rotatelufa((Math.PI / 2) - angle)
            cannon2 = cannon22.rotatearmata(theta)
            cannon2.position.x = 70
            bullet2.position.x = 30 * Math.cos(theta2) * Math.sin(theta) + 70
            bullet2.position.y = 30 * Math.sin(theta2) + 15
            bullet2.position.z = 30 * Math.cos(theta2) * Math.cos(theta)
            scene.add(cannon2)
        }
        else {
            scene.remove(cannon1)
            cannon1 = new Cannon()
            var cannon12 = cannon1
            cannon1 = cannon1.rotatelufa((Math.PI / 2) - angle)
            cannon1 = cannon12.rotatearmata(theta)
            bullet1.position.x = 30 * Math.cos(theta2) * Math.sin(theta)
            bullet1.position.y = 30 * Math.sin(theta2) + 15
            bullet1.position.z = 30 * Math.cos(theta2) * Math.cos(theta)
            scene.add(cannon1)
        }
    }

    this.updateShot = function (bulletx, bullety, bulletz, camerarot, cannonx, cannony, cannonz) {
        if (player == 1) {
            bullet2.position.x = bulletx
            bullet2.position.y = bullety
            bullet2.position.z = bulletz
            camera.rotation.z = camerarot
            cannon2.position.x = cannonx
            cannon2.position.y = cannony
            cannon2.position.z = cannonz
        }
        else {
            bullet1.position.x = bulletx
            bullet1.position.y = bullety
            bullet1.position.z = bulletz
            camera.rotation.z = camerarot
            cannon1.position.x = cannonx
            cannon1.position.y = cannony
            cannon1.position.z = cannonz
        }
    }
    this.comeback = function (boomer) {
        camera.rotation.z = Math.PI
        /*if (boomer == false) {
            if (player == 1) {
                var theta = (document.getElementById("turn").value) * (Math.PI / 180)
                var theta2 = (document.getElementById("angle").value) * (Math.PI / 180)
                bullet2.position.x = 30 * Math.cos(theta2) * Math.sin(theta) + 70
                bullet2.position.y = 30 * Math.sin(theta2) + 15
                bullet2.position.z = 30 * Math.cos(theta2) * Math.cos(theta)
            }
            else {
                var theta = (document.getElementById("turn").value) * (Math.PI / 180)
                var theta2 = (document.getElementById("angle").value) * (Math.PI / 180)
                bullet1.position.x = 30 * Math.cos(theta2) * Math.sin(theta)
                bullet1.position.y = 30 * Math.sin(theta2) + 15
                bullet1.position.z = 30 * Math.cos(theta2) * Math.cos(theta)
            }
        }*/
    }
    document.getElementById("boom").onclick = function () {
        boom = true
        odrzutbool = true
    }

    initEngine()
    initObjects()
    initBullet()
    initCannon()
    animateScene()

}