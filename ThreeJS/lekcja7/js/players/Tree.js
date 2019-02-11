function Tree() {

    var daeModel

    this.loadModel = function (url, callback) {

        var loader = new THREE.ColladaLoader();

        loader.load("models/tree/tree.xml", function (collada) {

            daeModel = collada.scene;
            daeModel.scale.set(10, 10, 10)
            daeModel.rotateX(-Math.PI / 2)
            var material = new THREE.MeshPhongMaterial({
                side: THREE.DoubleSide,
                map: THREE.ImageUtils.loadTexture("gfx/leaves.jpg")
            });

            //po załadowaniu jest możliwy dostęp do składników / meshów modelu:

            daeModel.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = material       
                }
            });

            // callback czyli zwrócenie danych modelu na zewnątrz pliku 

            callback(daeModel)

        })
    }

    this.getModel = function () {
        return daeModel
    }

}