// Import classes
import Player from './Player';
import Projectile from './Projectile';
import GridInvader from './GridInvader';
import Particle from './Particle';

// constants
const scoreHtml = document.querySelector('#score span');
const container = document.querySelector('.container');
const btnPlay = document.querySelector('.modal');
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const PLAYER_VELOCITY = 7;
const PLAYER_ROTATION = 0.2;
const PROJECTILE_VELOCITY = 8;

canvas.width = innerWidth;
canvas.height = innerHeight;

// variables
let player = new Player({ width: canvas.width, height: canvas.height });
let projectiles = [];
let gridInvaders = [];
let invaderProjectiles = [];
let particles = [];
let keys = {
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
let frames = 0;
let randomInterval = Math.floor(Math.random() * 500) + 500;
let game = {
  over: false,
  active: false,
};
let score = 0;

for (let i = 0; i < 100; i++) {
  particles.push(
    new Particle({
      position: {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
      },
      velocity: {
        x: 0,
        y: 0.2,
      },
      radius: Math.random() * 3,
      color: 'white',
      fades: false,
    })
  );
}

function playerMovement() {
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

function createParticules({ object, color, fades }) {
  for (let i = 0; i < 15; i++) {
    particles.push(
      new Particle({
        position: {
          x: object.position.x + object.width / 2,
          y: object.position.y + object.height / 2,
        },
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        },
        radius: Math.random() * 3,
        color: color,
        fades: fades,
      })
    );
  }
}

function particleAction() {
  particles.forEach((particle, index) => {
    if (particle.position.y - particle.radius >= canvas.height) {
      particle.position.x = Math.random() * canvas.width;
      particle.position.y = -particle.radius;
    }

    if (particle.opacity <= 0) {
      setTimeout(() => {
        particles.splice(index, 1);
      }, 0);
    } else particle.update(context);
  });
}

function invaderProjectileAction() {
  invaderProjectiles.forEach((invaderProjectile, index) => {
    if (
      invaderProjectile.position.y + invaderProjectile.height >=
      canvas.height
    ) {
      setTimeout(() => invaderProjectiles.splice(index, 1));
    } else invaderProjectile.update(context);

    const playerIsDead =
      invaderProjectile.position.y + invaderProjectile.height >=
        player.position.y &&
      invaderProjectile.position.x + invaderProjectile.width >=
        player.position.x &&
      invaderProjectile.position.x <= player.position.x + player.width;
    if (playerIsDead) {
      setTimeout(() => {
        player.opacity = 0;
        game.over = true;
      }, 0);
      setTimeout(() => {
        game.active = false;
        container.classList.add('active');
      }, 2000);
      createParticules({ object: player, color: 'white', fades: true });
    }
  });
}

function projectileAction() {
  projectiles.forEach((projectile, index) => {
    if (projectile.position.y <= 0) {
      setTimeout(() => projectiles.splice(index, 1), 0);
    } else {
      projectile.update(context);
    }
  });
}

function gridInvaderAction() {
  gridInvaders.forEach((gridInvader, gridIndex) => {
    gridInvader.update({ width: canvas.width, height: canvas.height });

    // Spawn projectile
    if (frames % 100 === 0 && gridInvader.invaders.length > 0) {
      gridInvader.invaders[
        Math.floor(Math.random() * gridInvader.invaders.length)
      ].shoot(invaderProjectiles);
    }

    gridInvader.invaders.forEach((invader, invaderIndex) => {
      invader.update(context, { velocity: gridInvader.velocity });

      projectiles.forEach((projectile, projectileIndex) => {
        // invader dead condition
        const invaderIsDead =
          projectile.position.y - projectile.radius <=
            invader.position.y + invader.height &&
          projectile.position.x + projectile.radius >= invader.position.x &&
          projectile.position.x - projectile.radius <=
            invader.position.x + invader.width &&
          projectile.position.y + projectile.radius >= invader.position.y;

        //if invader is dead Remove dead invader and projectile
        if (invaderIsDead) {
          setTimeout(() => {
            //  found invader dead
            const invaderFound = gridInvader.invaders.find(
              (invader2) => invader2 === invader
            );
            // found projectile dead
            const projectileFound = projectiles.find(
              (projectile2) => projectile2 === projectile
            );

            if (invaderFound && projectileFound) {
              score += 100;
              scoreHtml.innerHTML = score;
              // invader explosion
              createParticules({
                object: invader,
                color: '#BA49FF',
                fades: true,
              });
              // Delete invader
              gridInvader.invaders.splice(invaderIndex, 1);
              // Delete projectile
              projectiles.splice(projectileIndex, 1);
            }

            // remove grid invaders if all invaders in the grid is dead
            if (gridInvader.invaders.length > 0) {
              const firstInvader = gridInvader.invaders[0];
              const lastInvader =
                gridInvader.invaders[gridInvader.invaders.length - 1];
              gridInvader.width =
                lastInvader.position.x -
                firstInvader.position.x +
                lastInvader.width;
              gridInvader.position.x = firstInvader.position.x;
            } else {
              gridInvaders.splice(gridIndex, 1);
            }
          }, 0);
        }
      });
    });
  });
}

function init() {
  player = new Player({ width: canvas.width, height: canvas.height });
  projectiles = [];
  gridInvaders = [];
  invaderProjectiles = [];
  particles = [];
  frames = 0;
  randomInterval = Math.floor(Math.random() * 500) + 500;
  game = {
    over: false,
    active: true,
  };
  score = 0;
  for (let i = 0; i < 100; i++) {
    particles.push(
      new Particle({
        position: {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
        },
        velocity: {
          x: 0,
          y: 0.2,
        },
        radius: Math.random() * 3,
        color: 'white',
        fades: false,
      })
    );
  }
}

function animate() {
  requestAnimationFrame(animate);

  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  if (!game.active) return;

  player.update(context);

  particleAction();

  invaderProjectileAction();

  projectileAction();

  gridInvaderAction();

  playerMovement();

  if (frames % randomInterval === 0) {
    gridInvaders.push(new GridInvader());
    randomInterval = Math.floor(Math.random() * 500) + 500;
    frames = 0;
  }

  frames += 1;
}

document.addEventListener('keydown', (e) => {
  if (game.over) return;
  switch (e.key) {
    case 'ArrowRight':
      keys.arrowRight.pressed = true;
      break;
    case 'ArrowLeft':
      keys.arrowLeft.pressed = true;
      break;
    case ' ':
      projectiles.push(
        new Projectile({
          position: {
            x: player.position.x + player.width / 2,
            y: player.position.y,
          },
          velocity: {
            x: 0,
            y: -PROJECTILE_VELOCITY,
          },
        })
      );
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
  }
});

btnPlay.addEventListener('click', function () {
  container.classList.remove('active');
  scoreHtml.innerHTML = 0;
  setTimeout(() => {
    init();
  }, 500);
});

animate();
