import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
console.log(1);

/**
 * Variable definition
 */
let scene, camera, renderer, controls;
let cubesCount = 0;
let rayCast, mouse;
let selected;
let speed = 10000; // auto generate cube in milisecond

const colors = [
    0xA8D8EA,
    0xAA96DA,
    0xFCBAD3,
    0xFFFFD2,
    0xB1E693,
    0x911F27,
];
const clock = new THREE.Clock();

/**
 * Main
 */
const init = () => {
    // create scene and its background
    scene = new THREE.Scene();
    const spaceTexture = new THREE.TextureLoader().load('./assets/space.jpg');
    scene.background = spaceTexture;

    // create and locate the camera  
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0.640, 0.8337, 0.694);

    // create canvas
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.body.appendChild(renderer.domElement); 

    // create 30 cubes and auto generates it at some interval
    autoGenerateCubes(30);

    // create orbit control
    controls = new OrbitControls(camera, renderer.domElement);

    // create raycast
    rayCast = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    mouse.setX(-1); mouse.setY(-1);

    // toggle selected collor
    toggleColor();
};

const mainLoop = () => {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(mainLoop);
};

/**
 * Generate cubes
 */
const addCube = () => {
    const geometry = new THREE.BoxGeometry( 3, 3, 3 );
    const material = new THREE.MeshBasicMaterial({ color: getRandomColor() });
    const cubeMesh = new THREE.Mesh( geometry, material );
    cubeMesh.position.set(getRandomFloat(-10, 30), getRandomFloat(-10, 30), getRandomFloat(-10, 30));
    scene.add(cubeMesh);
    cubesCount += 1;
    return cubeMesh;
};

const autoGenerateCubes = (num = 5) => {
    Array(num).fill(0).forEach(addCube);
    console.log('cube added')
    setTimeout(autoGenerateCubes, speed);
};

/**
 * Manipulate selected cube
 */
const deselect = () => {
    if (selected == null) return;
    selected.obj.material.color.setHex(selected.init_color);
    selected = null;
}

const dispose = (object) => {
    object.geometry.dispose();
    object.material.dispose();
    scene.remove(object);
    renderer.renderLists.dispose();
}

const toggleColor = () => {
    if (selected) {
        const currentColor = selected.obj.material.color.getHex();
        selected.obj.material.color.setHex(
            (currentColor === 0xffffff)
            ? selected.init_color
            : 0xffffff
        );
    }
    setTimeout(toggleColor, 500);
};

/** 
 * Raycast detection & evaluation
 */ 
document.addEventListener("click", (e) => {
    // normalize
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    rayCast.setFromCamera(mouse, camera);

    let intersects = rayCast.intersectObjects(scene.children, false);

    // deselect object
    if (!intersects[0]) {
        deselect();
        return;
    }
    let firstObject = intersects[0].object;

    // compare and dispose if color is the same
    if (selected != null) {
        evaluateObject(firstObject);
        return;
    }

    // select first object
    selected = ({
        obj: firstObject,
        init_color: firstObject.material.color.getHex(),
    });
    
});

const evaluateObject = (conObject) => {
    if (selected.obj.uuid === conObject.uuid) {
        return;
    }
    const first  = selected.init_color;
    const second = conObject.material.color.getHex();

    console.log(first);
    console.log(second);

    if (first === second) {
        dispose(selected.obj);
        dispose(conObject);
        console.log('correct');
    } else {
        console.log('wrong');
    }
    deselect();
}

/**
 * Helper
 */
 window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}, false);

const getRandomFloat = (max, min) => {
    return Math.random() * (max - min) + max;
};

const getRandomColor = () => {
    return colors[Math.floor(Math.random()*colors.length)];
};

/** 
 * Runner
 */ 
init();
mainLoop();
