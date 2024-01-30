import { Scene, Engine, FreeCamera, Vector3, MeshBuilder, HemisphericLight } from "npm:babylonjs";

const canvas = document.getElementById("game");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const engine = new Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});

const createScene = () => {
  const scene = new Scene(engine);
  const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);
  camera.setTarget(Vector3.Zero())
  camera.attachControl(canvas, false);
  const lighting = new HemisphericLight('light1', new Vector3(0, 1, 0), scene)
  const sphere = MeshBuilder.CreateBox('box1', { width: 2, height: 2 })
  sphere.position.y = 1;
  return scene;
}

const scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
})

window.addEventListener("resize", () => {
  engine.resize();
})