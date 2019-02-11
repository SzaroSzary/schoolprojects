function EnemyLaser(x, y, z) {
    var v1 = new THREE.Vector3(0, 0, 0)
    var v2 = new THREE.Vector3(0, 0, 120)
    var v3 = new THREE.Vector3(0, 0, 120)

    var object = new THREE.Object3D()
    var particles = new THREE.Geometry()
    var particleSystem

    function init() {
        function laser(vec1, vec2) {
            var subV = new THREE.Vector3(
                vec2.x - vec1.x,
                vec2.y - vec1.y,
                vec2.z - vec1.z
            )
            return subV
        }
        var particleMaterial = new THREE.PointsMaterial(
            {
                color: 0x00ff00,
                size: 50,
                map: THREE.ImageUtils.loadTexture("img/particle.png"),
                blending: THREE.AdditiveBlending,
                transparent: true,
                depthWrite: false,
                opacity: 0.6
            });
        var subV = new laser(v1, v3)
        var stepV = subV.divideScalar(50)
        for (var i = 0; i < 50; i++) {
            var particle = new THREE.Vector3(
                v1.x + (Math.floor((Math.random() * 5))),
                v1.y + (Math.floor((Math.random() * 5))),
                v1.z + (Math.floor((Math.random() * 5))))
            particles.vertices.push(particle);
        }
        particleSystem = new THREE.Points(particles, particleMaterial);
        object.add(particleSystem)
    }
    init()

    this.enemyLaser = function () {
        return object
    }

    this.update = function () {
        var verts = particles.vertices

        for (var i = 0; i < verts.length; i++) {
            var particle = verts[i]
            particle.x = particle.x + (Math.floor((Math.random() * 2)))
            if (particle.x > 50) {
                particle.x = 0
            }
        }

        particleSystem.geometry.verticesNeedUpdate = true;
        particleSystem.material.size = 60
    }
}