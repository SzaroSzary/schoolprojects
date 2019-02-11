function Helicopter1() {

    var daeModel
    var wirnik

    this.loadModel = function (url, callback) {

        var loader = new THREE.ColladaLoader();

        loader.load(url, function (collada) {

            daeModel = collada.scene;
            daeModel.scale.set(5, 5, 5)

            var material = new THREE.MeshPhongMaterial({
                side: THREE.DoubleSide,
                map: THREE.ImageUtils.loadTexture("models/helicopter1/Textures/fuselage.jpg")
            });
            wirnik = daeModel.getObjectByName("main_rotor", true)
            tylnywirnik = daeModel.getObjectByName("rear_rotor", true)  // o tym mowa w punkcie 3     

            //po załadowaniu jest możliwy dostęp do składników / meshów modelu:

            daeModel.traverse(function (mesh) {
                if (mesh instanceof THREE.Mesh) {
                    mesh.material = material
                    //  tu można pokolorować poszcególne meshe helikoptera     
                    // lub nałożyć im materiały     
                }
            });

            // callback czyli zwrócenie danych modelu na zewnątrz pliku 

            callback(daeModel)

        })
    }

    this.getModel = function () {
        return daeModel
    }

    this.updateModel = function () {
        wirnik.rotateZ(Settings.szybkoscWirnika)
        tylnywirnik.rotateX(Settings.szybkoscWirnika)
        //return daeModel
        // ruch wirnika      
    }

}