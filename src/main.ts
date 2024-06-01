import * as THREE from "three";
import { createBlock } from "./block";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function render() {
  renderer.render(scene, camera);
  block.rotation.x += 0.01;
  block.rotation.y += 0.01;
}
camera.position.z = 5;
const block = createBlock(0, 0, 0);
scene.add(block);

renderer.setAnimationLoop(render);
