/*
    klasa światła, utworzona w pliku MyLight.js
*/

function MyLight(color,scene) {

    //puste zmienne: materiał , geometria, światło, mesh
    var material
    var geometry
    var light
    var colors = "0xffffff"
    // kontener
    var container = new THREE.Object3D();
    // init
    function init() {
        geometry = new THREE.ConeBufferGeometry(20, 40, 6);
        material = new THREE.MeshBasicMaterial({ color: colors, side: THREE.DoubleSide, wireframe: true });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.rotateX(Math.Pi/2)
        container.add(mesh)

        light = new THREE.SpotLight(color, 5, 400, 1);
        light.castShadow = true
        container.add(light);
        // tu utwórz materiał , geometria, światło, mesh
        // i dodaj je do kontenera (add)

    }

    init();

    // funkcja publiczna zwracająca obiekt kontenera
    // czyli nasze światło wraz z bryłą

    this.getLight = function () {
        console.log("dziala")
        return container;
    }

    // inne funkcje publiczne, np zmiana koloru bryły, zmiana koloru światła

    this.changeLightColor = function (color) {
        color = color.slice(1, color.length)
        color="0x"+color
        console.log(color)
        light.color.setHex(color)
        return container
        //console.log("zmiana koloru na " + color)
    }

}
