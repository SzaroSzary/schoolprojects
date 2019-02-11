var Sky = function () {

    var obj

    function init() {
        var geometry = new THREE.CubeGeometry(5000, 5000, 5000, 1, 1, 1);
        var materials = [];
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('gfx/snow_negative_x.jpg') }));
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('gfx/snow_positive_x.jpg') }));
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('gfx/snow_positive_y.jpg') }));
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('gfx/snow_negative_y.jpg') }));
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('gfx/snow_negative_z.jpg') }));
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('gfx/snow_positive_z.jpg') }));
        var faceMaterial = new THREE.MeshFaceMaterial(materials);
        obj = new THREE.Mesh(geometry, faceMaterial);
    }

    init()

    this.getSky = function () {
        return obj
    }
}