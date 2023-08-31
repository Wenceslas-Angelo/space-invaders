import Invader from "../modules/Invader";
import Projectile from "../modules/Projectile";

const invaderIsDead = (projectile: Projectile, invader: Invader): boolean => {
  const distanceX = Math.abs(projectile.x - (invader.x + invader.width / 2));
  const distanceY = Math.abs(projectile.y - (invader.y + invader.height / 2));

  if (distanceX > invader.width / 2 + projectile.radius) return false;
  if (distanceY > invader.height / 2 + projectile.radius) return false;

  if (distanceX <= invader.width / 2) return true;
  if (distanceY <= invader.height / 2) return true;

  const cornerDistanceSq =
    (distanceX - invader.width / 2) ** 2 +
    (distanceY - invader.height / 2) ** 2;

  return cornerDistanceSq <= projectile.radius ** 2;
};

export default invaderIsDead;
