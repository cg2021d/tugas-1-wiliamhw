import * as THREE from 'three';

const createShape = {
    cube: () => {
        const geometry  = new THREE.BoxGeometry( 1, 1, 1 );
        const material  = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x00a1cb })
        const cone      = new THREE.Mesh( geometry, material );
        cone.position.set(-4, 0, 0);
        return cone;
    },
    sphere: () => {
        const geometry  = new THREE.SphereGeometry(0.5, 32, 32)
        const material  = new THREE.MeshLambertMaterial({ color: 0xfcffa6 })
        const sphere    = new THREE.Mesh(geometry, material);
        sphere.position.set(0, 0, 0);
        return sphere
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
};

const createLight = {
    dLight: () => {
        const dLight = new THREE.DirectionalLight(0xffffff, 1);
        dLight.position.set(1, 0, 1).normalize();
        return dLight;
    },
    aLight: () => {
        const aLight = new THREE.AmbientLight(0xffffff, 1);
        aLight.position.set(0, 0, 10);
        return aLight;
    },
    pLight: () => {
        const pLight = new THREE.PointLight(0xffffff, 1, 100);
        pLight.position.set(-10, 0, 0);
        return pLight;
    },
    hLight: () => {
        const hLight = new THREE.HemisphereLight(0xffffff, '#ffb703', 0.8);
        hLight.position.set(-10, 10, 20);
        return hLight;
    },
    sLight: () => {
        const sLight = new THREE.SpotLight(0xffffff, 1, 50);
        sLight.position.set(5, 10, 10);
        return sLight;
    },
    rLight: () => {
        const rectLight = new THREE.RectAreaLight( 0xffffff, 0.5,  0.5, 0.5 );
        rectLight.position.set( 5, 5, 0 );
        rectLight.lookAt( 0, 0, 0 );
        return rectLight;
    },
};

export { THREE, createShape, createLight };