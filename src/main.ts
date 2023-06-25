import * as THREE from "three";
import { CSS2DRenderer, CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
import WebGL from "three/addons/capabilities/WebGL.js";
import jump from "./utils/jump";
import boxMovement from "./utils/boxMovement";
import { paragraph } from "./utils/paragraph";
import creeper from "../public/creeper.jpg";
import createWalls from "./utils/createWalls";

let startGame = false; // Flag to determine if the game has started or not

const scene = new THREE.Scene(); // Create a new scene

// Create a camera to view the scene
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.lookAt(0, 0, 0); // Set the camera to look towards the center of the scene
camera.position.z = 10; // Set the camera's position along the z-axis

// Create a renderer to display the scene
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight); // Set the size of the renderer to match the window
document.body.appendChild(renderer.domElement); // Add the renderer's output to the webpage

// Load the texture image. materials
const creeperTexture = new THREE.TextureLoader().load(creeper);
const greenMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// Create a box and apply the photo material
const box = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  new THREE.MeshBasicMaterial({ map: creeperTexture })
);
box.position.x = -12; // Set the initial position of the box
scene.add(box); // Add the box to the scene

const plainWall = new THREE.PlaneGeometry(1, 10);
createWalls(plainWall, greenMaterial, scene);

// Create a renderer for 2D labels
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(innerWidth, innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0px";
document.body.appendChild(labelRenderer.domElement);

// Create a start text object and add it to the scene
const startText = new CSS2DObject(paragraph("Press Space or Tap on the Screen to Start."));
!startGame && scene.add(startText);

// Listen for key presses
addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    startGame = true; // Start the game
    jump(box); // Call the jump function when the Space key is pressed
  }
});
addEventListener("click", () => {
  startGame = true; // Start the game
  jump(box); // Call the jump function when the Space key is pressed
});

// Animation function
function animate() {
  requestAnimationFrame(animate); // Request the next animation frame

  if (startGame) {
    scene.remove(startText); // Remove the start text from the scene when the game starts
    boxMovement(box); // Update the position of the box only if the game has started
  }

  // Check if the box's vertical position is below -20 or above 20
  if (box.position.y < -20 || box.position.y > 20) {
    scene.add(startText);
    startGame = false; // Stop the game if the box goes out of bounds
    box.position.y = 0; // Reset the box's vertical position to 0
  }

  labelRenderer.render(scene, camera); // Render 2D labels in the scene
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
