import * as THREE from "three";

/**
 * Creates multiple walls in a Three.js scene.
 *
 * @param {THREE.PlaneGeometry} geometry - The geometry of the walls.
 * @param {THREE.MeshBasicMaterial} material - The material applied to the walls.
 * @param {THREE.Scene} scene - The scene to which the walls will be added.
 */
export default function createWalls(
  geometry: THREE.PlaneGeometry,
  material: THREE.MeshBasicMaterial,
  scene: THREE.Scene
) {
  // Create 1000 walls
  for (let i = 0; i < 1000; i++) {
    const wall1 = new THREE.Mesh(geometry, material);
    const wall2 = new THREE.Mesh(geometry, material);

    let distance = 3.5;

    // Set the position of the first wall
    wall1.position.x = i * distance + i;
    wall1.position.y = Math.floor(Math.random() * (10 - 7 + 1)) + 7;

    // Set the position of the second wall
    wall2.position.x = i * distance + i;
    wall2.position.y = Math.floor(Math.random() * (-7 - -10 + 1)) + -10;

    // Add the walls to the scene
    scene.add(wall1, wall2);

    // Function to animate the walls
    function wallAnimation() {
      const ani = requestAnimationFrame(wallAnimation);

      // Move the walls towards the left
      wall1.position.x -= 0.05;
      wall2.position.x -= 0.05;

      // Remove the walls from the scene when they reach a certain position
      if (wall1.position.x <= -20 || wall2.position.x <= -20) {
        scene.remove(wall1, wall2);
        cancelAnimationFrame(ani);
      }
    }

    // Start the wall animation
    wallAnimation();
  }
}
