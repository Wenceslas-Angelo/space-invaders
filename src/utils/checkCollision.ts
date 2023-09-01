type Circle = {
  x: number;
  y: number;
  radius: number;
};
type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const twoCircleIsCollide = (
  circle1: Circle,
  circle2: Circle
): boolean => {
  const dx = circle1.x - circle2.x;
  const dy = circle1.y - circle2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance < circle1.radius + circle2.radius;
};

const checkCollision = (object1: Circle, object2: Rect): boolean => {
  const distanceX = Math.abs(object1.x - (object2.x + object2.width / 2));
  const distanceY = Math.abs(object1.y - (object2.y + object2.height / 2));

  if (distanceX > object2.width / 2 + object1.radius) return false;
  if (distanceY > object2.height / 2 + object1.radius) return false;

  if (distanceX <= object2.width / 2) return true;
  if (distanceY <= object2.height / 2) return true;

  const cornerDistanceSq =
    (distanceX - object2.width / 2) ** 2 +
    (distanceY - object2.height / 2) ** 2;

  return cornerDistanceSq <= object1.radius ** 2;
};

export default checkCollision;
