import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";

export default function playerMovement(
  player: THREE.Mesh,
  followPlayer: [THREE.PerspectiveCamera, CSS2DObject]
) {
  player.position.y -= 0.2;
  player.position.x += 0.05;
  followPlayer.forEach((x) => {
    x.position.x += 0.05;
  });
}
