function Fire(scene) {
    var container = new THREE.Object3D();
    var firetab = []
    function firegen() {
        var material = new THREE.MeshBasicMaterial({
            color: 0xff6600,
            transparent: true,
            opacity: 1,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
        for (var i = 0; i < 50; i++) {
            var randsize = Math.floor((Math.random() * 5))
            var geometry = new THREE.BoxGeometry(randsize, randsize, randsize, 1, 1, 1)
            var particle = new THREE.Mesh(geometry, material.clone())
            particle.position.x = Math.floor((Math.random() * 5));
            particle.position.y = Math.floor((Math.random() * 10));
            particle.position.z = Math.floor((Math.random() * 5));
            firetab[i] = particle
            container.add(particle)
        }
    }
    firegen()
    this.getFire = function(){
        return container
    }
    this.updateFire = function (firetab) {
        for (var i = 0; i < firetab.children.length; i++) {
            firetab.children[i].position.y += 1;
            firetab.children[i].material.opacity -= 0.05
            if (firetab.children[i].position.y == 20) {
                firetab.children[i].position.y = Math.floor((Math.random() * 10));
                firetab.children[i].material.opacity = 1
            }
        }
    }
}