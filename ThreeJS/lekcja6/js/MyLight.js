function MyLight(scene) {
    var light
    var intensity = 4
    var container = new THREE.Object3D();
    function init() {
        light = new THREE.PointLight(0xffff00, intensity, 400, 1);
        light.castShadow = true
        container.add(light);
    }
    init();
    this.getLight = function () {
        return container;
    }
}
