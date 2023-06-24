import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";

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
scene.add(box);

addEventListener("keydown", (e) => {
  const jump = () => {
    let increment = 0.1;
    let totalFrames = 100;
    let currentFrame = 0;

    const animateJump = () => {
      currentFrame++;

      if (currentFrame <= totalFrames / 2) {
        box.position.y += increment;
      } else {
        box.position.y -= increment;
      }

      if (currentFrame < totalFrames) {
        requestAnimationFrame(animateJump);
      }
    };

    animateJump();
  };


  switch (e.code) {
    case "KeyW":
      box.position.y += 0.2;
      break;
    case "KeyS":
      box.position.y += -0.2;
      break;
    case "KeyD":
      box.position.x += 0.2;
      break;
    case "KeyA":
      box.position.x += -0.2;
      break;
    case "Space":
      jump();
      break;
  }
  console.log(e.code);
});

function animate() {
  requestAnimationFrame(animate);
  box.rotation.y += 0.01;
  box.rotation.x += 0.01;
  renderer.render(scene, camera);
}

if (WebGL.isWebGLAvailable()) {
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  const app = document.getElementById("app")!;
  app.appendChild(warning);
}
