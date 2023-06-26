import * as THREE from "three";

/**
 * Creates multiple walls in a Three.js scene.
 * @param {THREE.Scene} scene - The scene to which the walls will be added.
 */
export default function createWalls(scene: THREE.Scene, meshBB: THREE.Box3, handleFunction: any) {
  const plainWall = new THREE.BoxGeometry(1, 10, 0);
  const greenMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

  // Create 1000 walls
  for (let i = 0; i < 1; i++) {
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

    const topWallBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    topWallBB.setFromObject(topWall);

    const bottomWallBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    bottomWallBB.setFromObject(bottomWall);

    // Function to animate the walls
    function wallAnimation() {
      const ani = requestAnimationFrame(wallAnimation);

      // Move the walls towards the left
      topWall.position.x -= 0.05;
      bottomWall.position.x -= 0.05;

      const boundingBox1 = topWall.geometry.boundingBox;
      boundingBox1 && topWallBB.copy(boundingBox1).applyMatrix4(topWall.matrixWorld);
      const boundingBox2 = bottomWall.geometry.boundingBox;
      boundingBox2 && bottomWallBB.copy(boundingBox2).applyMatrix4(bottomWall.matrixWorld);

      const theEnd = () => {
        handleFunction();
        cancelAnimationFrame(ani);
      };
      topWallBB.intersectsBox(meshBB) || (bottomWallBB.intersectsBox(meshBB) && theEnd());

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
