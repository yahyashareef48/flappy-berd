export default function boxMovement(element: THREE.Mesh) {
    element.position.y -= 0.2;

    if (element.position.y < -20) {
      element.position.y = 0;
    }
}