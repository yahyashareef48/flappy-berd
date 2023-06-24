import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import jump from "./utils/jump";
import boxMovement from "./utils/boxMovement";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.lookAt(0, 0, 0);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const blueMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const box = new THREE.Mesh(boxGeometry, blueMaterial);
box.position.x = -12;
scene.add(box);

addEventListener("keydown", (e) => {
  switch (e.code) {
    case "Space":
      jump(box);
      break;
  }
  console.log(e.code);
});

function animate() {
  requestAnimationFrame(animate);
  boxMovement(box);
  renderer.render(scene, camera);
}

if (WebGL.isWebGLAvailable()) {
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  const app = document.getElementById("app")!;
  app.appendChild(warning);
}
