import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import jump from "./utils/jump";
import boxMovement from "./utils/boxMovement";

// Create a new scene
const scene = new THREE.Scene();

// Create a camera to view the scene
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.lookAt(0, 0, 0); // Make the camera look towards the center of the scene
camera.position.z = 10; // Set the camera's position along the z-axis

// Create a renderer to display the scene
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight); // Set the size of the renderer to match the window
document.body.appendChild(renderer.domElement); // Add the renderer's output to the webpage

// Create a blue material for the box
const blueMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });

// Create a box and position it in the scene
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const box = new THREE.Mesh(boxGeometry, blueMaterial);
box.position.x = -12; // Set the initial position of the box
scene.add(box); // Add the box to the scene

// Listen for key presses
addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    jump(box); // Call the jump function when the Space key is pressed
  }
  console.log(e.code); // Log the key code to the console
});

// Animation function
function animate() {
  requestAnimationFrame(animate); // Request the next animation frame
  boxMovement(box); // Update the position of the box
  renderer.render(scene, camera); // Render the scene with the camera
}

// Check if WebGL is available
if (WebGL.isWebGLAvailable()) {
  animate(); // Start the animation loop
} else {
  const warning = WebGL.getWebGLErrorMessage();
  const app = document.getElementById("app")!;
  app.appendChild(warning); // Display a warning message if WebGL is not available
}
