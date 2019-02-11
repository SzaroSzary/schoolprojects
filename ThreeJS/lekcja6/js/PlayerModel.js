function PlayerModel(loader, scene, mixer) {
    var container = new THREE.Object3D();
    function init() {
        loader = new THREE.JSONLoader();
        var billymodelMaterial = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture("img/billywork.png"),
            morphTargets: true,
        });
        var billyobj = new THREE.Object3D()
        loader.load('models/billy.js', function (geometry) {
            billyModel = new THREE.Mesh(geometry, billymodelMaterial)
            billyModel.name = "minotaur";
            billyModel.position.y = 0
            billyModel.rotateY(Math.PI/2)
            billyModel.castShadow = true
            billyModel.receiveShadow = true
            var player = billyModel.clone()
            mixer[mixer.length] = new THREE.AnimationMixer(player);
            mixer[mixer.length - 1].clipAction("stand").play()
            container.add(player)
        });
    }
    init();
    this.getPlayer = function () {
        return container;
    }
}
