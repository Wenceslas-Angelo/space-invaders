import invaderImage from './../images/invader.png';
import InvaderProjectile from './InvaderProjectile';

class Invader {
  /**
   *
   * @param {Object} position
   * @param {number} position.x
   * @param {number} position.y
   */
  constructor({ position }) {
    this.rotaion = 0;

    const image = new Image();
    image.src = invaderImage;
    image.onload = () => {
      const scale = 1;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
      this.position = {
        x: position.x,
        y: position.y,
      };
    };
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  draw(context) {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param {Object} velocity
   * @param {number} velocity.x
   * @param {number} velocity.y
   */
  update(context, { velocity }) {
    if (this.image) {
      this.draw(context);
      this.position.x += velocity.x;
      this.position.y += velocity.y;
    }
  }

  /**
   *
   * @param {Array} invaderProjectiles
   */
  shoot(invaderProjectiles) {
    invaderProjectiles.push(
      new InvaderProjectile({
        position: {
          x: this.position.x + this.width / 2,
          y: this.position.y + this.height,
        },
        velocity: {
          x: 0,
          y: 5,
        },
      })
    );
  }
}

export default Invader;
