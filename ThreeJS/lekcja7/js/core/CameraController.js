function CameraController(camera1, helicopter) {
    this.update = function () {
        var cam1Vect
        switch (CameraModes.currentcamera) {
            case "front":
                cam1Vect = new THREE.Vector3(0, 10, 50)
                break;
            case "back":
                cam1Vect = new THREE.Vector3(0, 10, -50)
                break;
            case "top":
                cam1Vect = new THREE.Vector3(0, 60, 0.1)
                break;
            case "bottom":
                cam1Vect = new THREE.Vector3(0, -60, 0.1)
                break;
            case "inside":
                cam1Vect = new THREE.Vector3(0, 0.5, 3.5)
                break;
            case "left":
                cam1Vect = new THREE.Vector3(50, 0, 0)
                break;
        }
        var cam1Pos = cam1Vect.applyMatrix4(helicopter.matrixWorld);
        camera1.position.x = cam1Pos.x
        camera1.position.y = cam1Pos.y
        camera1.position.z = cam1Pos.z
        camera1.lookAt(helicopter.position)
    }
}