import * as THREE from 'three';
import * as PointerLockControls from 'PointerLockControls';
//import { ds } from 'ds-heightmap';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const textureLoader = new THREE.TextureLoader();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const controls = new PointerLockControls.PointerLockControls(camera, document.body);

scene.background = new THREE.Color(0x87CEEB);
const light = new THREE.AmbientLight(0x404040);
scene.add(light);

const render = function() {
    requestAnimationFrame(render);
	renderer.render(scene, camera);
    // Camera movement
    controls.moveForward(movement.forward);
    controls.moveRight(movement.right);
    camera.position.y += movement.up;
}

const createBlock = function(material, pos) {
    console.log("Creating block")
    let block = new THREE.Mesh(geometry, material);
    scene.add(block);
    block.position.set(...pos);
}

const generateSpawnPlatform = function() {
    let placements = [0, 0, 0];
    while (1) {
        createBlock(materials.dirt, placements);
        placements[0]++;
        if (placements[0] > 30) {
            placements[0] = 0;
            placements[2]++;
        }
        if (placements[2] > 50) {
            break;
        }
    }

}

const generateTree = function(pos) {
    createBlock(materials.log, pos);
    for (let i=0; i<6;i++) { // Generate the stem
        createBlock(materials.log, [pos[0], pos[1]+i, pos[2]]);
    }
    // Generate the leaves XD
    createBlock(materials.leaves, [pos[0], pos[1]+6, pos[2]]);
    createBlock(materials.leaves, [pos[0]+1, pos[1]+5, pos[2]]);
    createBlock(materials.leaves, [pos[0]-1, pos[1]+5, pos[2]]);
    createBlock(materials.leaves, [pos[0], pos[1]+5, pos[2]+1]);
    createBlock(materials.leaves, [pos[0], pos[1]+5, pos[2]-1]);
}


// Player init
camera.position.z = 5;
const movement = {forward: 0, right: 0, up: 0};

const geometry = new THREE.BoxGeometry(1, 1, 1);

const materials = {
    stone: new THREE.MeshBasicMaterial({map: textureLoader.load("./assets/stone.png")}),
    log: new THREE.MeshBasicMaterial({map: textureLoader.load("./assets/oak_log.png")}),
    leaves: new THREE.MeshBasicMaterial({map: textureLoader.load("./assets/leaves.jpg")}),
    dirt: new THREE.MeshBasicMaterial({map: textureLoader.load("./assets/dirt.jpg")})
}
// Events
document.addEventListener("click", function(e) { controls.lock(); })
document.addEventListener("keydown", function(e) {
    switch (e.code) {
        case "KeyW": movement.forward = 0.1; break;
        case "KeyA": movement.right = -0.1; break;
        case "KeyS": movement.forward = -0.1; break;
        case "KeyD": movement.right = 0.1; break;
        case "Space": movement.up = 0.1; break;
        case "ShiftLeft": movement.up = -0.1; break;
    }
});
document.addEventListener("keyup", function() {movement.forward = 0; movement.right = 0; movement.up = 0;})

generateSpawnPlatform();
generateTree([0, 1, 0]);


render();
