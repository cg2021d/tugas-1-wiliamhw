import * as THREE from 'three';

const createShape = {
    avatar: () => {
        const kleeTexture = new THREE.TextureLoader().load('klee.jpg');
        const geometry    = new THREE.BoxGeometry( 1, 1, 1 );
        const material    = new THREE.MeshBasicMaterial({ map: kleeTexture })
        const avatar      = new THREE.Mesh( geometry, material );
        avatar.position.set(-4, 0, 0);
        return avatar;
    },
    moon: () => {
        const moonTexture = new THREE.TextureLoader().load('moon.jpg');
        const normalTexture = new THREE.TextureLoader().load('normal.jpg');

        const geometry  = new THREE.SphereGeometry(0.75, 32, 32)
        const material  = new THREE.MeshStandardMaterial({
            map: moonTexture,
            normalMap: normalTexture,
        });
        const moon      = new THREE.Mesh(geometry, material);
        moon.position.set(0, 0, 0);
        return moon
    },
    cone: () => {
        const geometry  = new THREE.ConeGeometry(0.5, 1, 32)
        const material  = new THREE.MeshMatcapMaterial({ color: 0xc1ffd7 });
        const cone      = new THREE.Mesh(geometry, material);
        cone.position.set(2, -2, 0);
        return cone;
    },
    torus: () => {
        const geometry  = new THREE.TorusGeometry(0.5, 0.15, 32, 32)
        const material  = new THREE.MeshNormalMaterial({ wireframe: false })
        const torus     = new THREE.Mesh(geometry, material);
        torus.position.set(2, 2, 0);
        return torus;
    },
    plane: () => {
        const geometry = new THREE.PlaneGeometry(1, 1);
        const material = new THREE.MeshPhongMaterial({
            color: 0xb5deff, side: THREE.DoubleSide, shininess: 150
        });
        const plane = new THREE.Mesh( geometry, material );
        plane.position.set(2, 0, 0);
        return plane;
    },
    octahedron: () => {
        const geometry   = new THREE.OctahedronGeometry(0.5)
        const material   = new THREE.MeshPhysicalMaterial({ clearcoat: 1, reflectivity: 1 })
        const octahedron = new THREE.Mesh(geometry, material);
        octahedron.position.set(-2, 2, 0);
        return octahedron;
    },
    circle: () => {
        const geometry = new THREE.CircleGeometry( 0.5, 32 );
        const material = new THREE.MeshStandardMaterial( { color: 0xa2d2ff } );
        const circle = new THREE.Mesh( geometry, material );
        circle.position.set(-2, 0, 0);
        return circle;
    },
    edge: () => {
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const edges = new THREE.EdgesGeometry( geometry );
        const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
        line.position.set(4, 0, 0);
        return line;
    },
    tetrahedron: () => {
        const geometry   = new THREE.TetrahedronGeometry(0.5)
        const material   = new THREE.MeshToonMaterial({ color: 0x0077ff })
        const octahedron = new THREE.Mesh(geometry, material);
        octahedron.position.set(-2, -2, 0);
        return octahedron;
    },
    wireframe: () => {
        const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32)
        const wireframe = new THREE.WireframeGeometry( geometry );
        const line = new THREE.LineSegments( wireframe );
        line.material.depthTest = false;
        line.material.opacity = 0.25;
        line.material.transparent = true;
        line.position.set(0, 2, 0)
        return line;
    },
    cylinder: () => {
        const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32)
        const material = new THREE.MeshLambertMaterial({color: 0x448800, emissive:0x0})
        const cylinder = new THREE.Mesh(geometry, material);
        cylinder.position.set(0, -2, 0);
        return cylinder;
    },
    icosahedron: () => {
        const geometry   = new THREE.IcosahedronGeometry(0.5)
        const material   = new THREE.MeshDepthMaterial()
        const octahedron = new THREE.Mesh(geometry, material);
        octahedron.position.set(4, 2, 0);
        return octahedron;
    },
    ring: () => {
        const geometry = new THREE.RingGeometry( 0.2, 0.5, 32 );
        const material = new THREE.MeshToonMaterial( { color: 0xffff00 } );
        const ring = new THREE.Mesh( geometry, material );
        ring.position.set(4, -2, 0);
        return ring;
    },
    torusKnot: () => {
        const geometry = new THREE.TorusKnotGeometry( 0.4, 0.05, 100, 16 );
        const material =new THREE.MeshToonMaterial({ color: 0xC89595 });
        const torusKnot = new THREE.Mesh( geometry, material );
        torusKnot.position.set(-4, 2, 0);
        return torusKnot;
    },
    dedocahedron: () => {
        const geometry   = new THREE.DodecahedronGeometry(0.5)
        const material   = new THREE.MeshToonMaterial({ color: 0xDDBEBE, wireframe: true })
        const dedocahedron = new THREE.Mesh(geometry, material);
        dedocahedron.position.set(-4, -2, 0);
        return dedocahedron;
    },
};

const createLight = {
    dLight: () => {
        const dLight = new THREE.DirectionalLight(0xffffff, 1);
        dLight.position.set(5, 5, 5);

        const lightHelper = new THREE.DirectionalLightHelper(dLight);
        return [dLight, lightHelper];
    },
    aLight: () => {
        const aLight = new THREE.AmbientLight(0xffffff, 1);
        return [aLight, null];
    },
    pLight: () => {
        const pLight = new THREE.PointLight(0xffffff, 1, 100);
        pLight.position.set(5, 5, 5);

        const lightHelper = new THREE.PointLightHelper(pLight);
        return [pLight, lightHelper];
    },
    hLight: () => {
        const hLight = new THREE.HemisphereLight(0xffffff, '#ffb703', 0.8);
        hLight.position.set(5, 5, 5);

        const lightHelper = new THREE.HemisphereLightHelper(hLight);
        return [hLight, lightHelper];
    },
    sLight: () => {
        const sLight = new THREE.SpotLight(0xffffff, 1, 50);
        sLight.position.set(5, 5, 5);

        const lightHelper = new THREE.SpotLightHelper(sLight);
        return [sLight, lightHelper];
    },
};

export { THREE, createShape, createLight };