/// <reference lib="dom" />
// deno-lint-ignore-file no-window
//
import * as THREE from "https://unpkg.com/three@latest/build/three.module.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.append(renderer.domElement);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial(),
);
scene.add(cube);
camera.position.z = 5;

function render() {
  requestAnimationFrame(render);
  cube.rotation.x += 0.01;
  renderer.render(scene, camera);
}
render();
