import * as THREE from "three";

export default function createWalls(
  geometry: THREE.PlaneGeometry,
  material: THREE.MeshBasicMaterial,
  scene: THREE.Scene
) {
  for (let i = 0; i < 1000; i++) {
    const wall1 = new THREE.Mesh(geometry, material);
    const wall2 = new THREE.Mesh(geometry, material);

    let distance = 3.5;

    wall1.position.x = i * distance + i;
    wall1.position.y = Math.floor(Math.random() * (10 - 7 + 1)) + 7;

    wall2.position.x = i * distance + i;
    wall2.position.y = Math.floor(Math.random() * (-7 - -10 + 1)) + -10;

    scene.add(wall1, wall2);

    function wallAnimation() {
      const ani = requestAnimationFrame(wallAnimation);
      wall1.position.x -= 0.05;
      wall2.position.x -= 0.05;

      if (wall1.position.x <= -20 || wall2.position.x <= -20) {
        scene.remove(wall1, wall2);
        cancelAnimationFrame(ani);
      }
    }

    wallAnimation();
  }
}
