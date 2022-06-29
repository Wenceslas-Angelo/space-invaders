// Import classes
import Player from './Player';

// constants
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const PLAYER_VELOCITY = 7;
const PLAYER_ROTATION = 0.2;

canvas.width = innerWidth;
canvas.height = innerHeight;

const player = new Player({ width: canvas.width, height: canvas.height });
const keys = {
  arrowRight: {
    pressed: false,
  },
  arrowLeft: {
    pressed: false,
  },
  space: {
    pressed: false,
  },
};

function animate() {
  requestAnimationFrame(animate);
  context.fillRect(0, 0, canvas.width, canvas.height);
  player.update(context);

  const isCanMovingRight =
    keys.arrowRight.pressed && player.position.x <= canvas.width - player.width;
  const isCanMovingLeft = keys.arrowLeft.pressed && player.position.x >= 0;

  if (isCanMovingRight) {
    player.velocity.x = PLAYER_VELOCITY;
    player.rotation = PLAYER_ROTATION;
  } else if (isCanMovingLeft) {
    player.velocity.x = -PLAYER_VELOCITY;
    player.rotation = -PLAYER_ROTATION;
  } else {
    player.velocity.x = 0;
    player.rotation = 0;
  }
}

animate();

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowRight':
      keys.arrowRight.pressed = true;
      break;
    case 'ArrowLeft':
      keys.arrowLeft.pressed = true;
      break;
    case ' ':
      console.log('Shooot');
      break;
  }
});

document.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'ArrowRight':
      keys.arrowRight.pressed = false;
      break;
    case 'ArrowLeft':
      keys.arrowLeft.pressed = false;
      break;
    case ' ':
      console.log('stop Shooot');
      break;
  }
});
