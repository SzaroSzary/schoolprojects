function EnemyModel(loader, scene, mixer, enemiestab) {
    var container = new THREE.Object3D();
    function init() {
        loader = new THREE.JSONLoader();
        var minotaurmodelMaterial = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture("img/minotaur.png"),
            morphTargets: true,
        });
        var minoobj = new THREE.Object3D()
        loader.load('models/minotaur.js', function (geometry) {
            minotaurModel = new THREE.Mesh(geometry, minotaurmodelMaterial)
            minotaurModel.name = "minotaur";
            minotaurModel.position.y = 0
            minotaurModel.rotateY(Math.PI/2)
            minotaurModel.scale.set(1.5, 1.5, 1.5);
            minotaurModel.castShadow = true
            minotaurModel.receiveShadow = true
            var enemy = minotaurModel.clone()
            mixer[mixer.length] = new THREE.AnimationMixer(enemy);
            mixer[mixer.length - 1].clipAction("stand").play()
            enemy.life = 10
            enemy.isKilled = false
            enemy.maxLife = 10
            enemiestab.push(enemy)
            container.add(enemy)
        });
    }
    init();
    this.getEnemy = function () {
        return container;
    }
}
