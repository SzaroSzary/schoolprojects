function Laser(x, y, z) {
    var v1 = new THREE.Vector3(0, 0, 0)
    var v2 = new THREE.Vector3(120, 0, 0 )
    var v3 = new THREE.Vector3(120, 0, 0 )

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
                color: 0xff3300,
                size: 200,
                map: THREE.ImageUtils.loadTexture("img/particle.png"),
                blending: THREE.AdditiveBlending,
                transparent: true,
                depthWrite: false,
                opacity: 0.6
            });
        var subV = new laser(v1, v3)
        var stepV = subV.divideScalar(50)
        for (var i = 0; i < 100; i++) {
            var particle = new THREE.Vector3(
                v1.x + stepV.x * i,
                v1.y + stepV.y * i,
                v1.z + stepV.z * i)
            particles.vertices.push(particle);
        }
        particleSystem = new THREE.Points(particles, particleMaterial);
        object.add(particleSystem)
    }
    init()

    this.playerLaser = function () {
        return object
    }

    this.update = function (charx, chary, charz) {
        var verts = particles.vertices

        for (var i = 0; i < verts.length; i++) {
            var particle = verts[i]
            particle.x = particle.x + (Math.floor((Math.random() * 2)))
            if (particle.x > 200) {
                particle.x = 0
                particle.y = 0
                particle.z = 0
            }
        }

        particleSystem.geometry.verticesNeedUpdate = true;
        particleSystem.material.size = 30
    }
}