export default function jump(element: THREE.Mesh) {
  let animationId: number;

  function animate() {
    element.position.y += 0.3;

    animationId = requestAnimationFrame(animate);
  }

  animate();

  setTimeout(() => {
    cancelAnimationFrame(animationId);
  }, 200);
}
