import * as THREE from "three";

export function createBlock(x: number, y: number, z: number) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: "white" });
  const block = new THREE.Mesh(geometry, material);
  block.position.set(x, y, z);
  return block;
}
