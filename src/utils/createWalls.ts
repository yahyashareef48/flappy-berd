import * as THREE from "three";

/**
 * Creates multiple walls in a Three.js scene.
 * @param {THREE.Scene} scene - The scene to which the walls will be added.
 */
export default function createWalls(scene: THREE.Scene, meshBB: THREE.Box3, handleFunction: any) {
  const plainWall = new THREE.BoxGeometry(1, 10, 0);
  const greenMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

  // Create walls
  for (let i = 0; i < 500; i++) {
    const topWall = new THREE.Mesh(plainWall, greenMaterial);
    const bottomWall = new THREE.Mesh(plainWall, greenMaterial);

    let distance = 3.5;

    // Set the position of the first wall
    topWall.position.x = 16 + i * distance + i;
    topWall.position.y = Math.floor(Math.random() * (10 - 7 + 1)) + 7;

    // Set the position of the second wall
    bottomWall.position.x = 16 + i * distance + i;
    bottomWall.position.y = Math.floor(Math.random() * (-7 - -10 + 1)) + -10;

    // Add the walls to the scene
    scene.add(topWall, bottomWall);

    // Create bounding boxes for the top walls
    const topWallBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    topWallBB.setFromObject(topWall);
    // Create bounding boxes for the bottom walls
    const bottomWallBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    bottomWallBB.setFromObject(bottomWall);

    // Function to animate the walls
    //This function is called recursively to animate the walls and check for collisions with the player mesh.
    function wallAnimation() {
      const ani = requestAnimationFrame(wallAnimation);

      // Function to handle the end of the game.
      // This function is called when the player collides with a wall, triggering the end of the game.
      const theEnd = () => {
        handleFunction();
        cancelAnimationFrame(ani);
      };

      // Check for collisions between walls and the player mesh
      topWallBB.intersectsBox(meshBB) && theEnd();
      bottomWallBB.intersectsBox(meshBB) && theEnd();

      // Remove the walls from the scene when they reach a certain position
      if (topWall.position.x <= -50 || bottomWall.position.x <= -50) {
        console.log("hello");
        scene.remove(topWall, bottomWall);
        cancelAnimationFrame(ani);
      }
    }

    // Start the wall animation
    wallAnimation();
  }
}
