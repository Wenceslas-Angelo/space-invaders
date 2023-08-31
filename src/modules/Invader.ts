import invaderImage from "../assets/invader.png";
import { INVADER_SCALE } from "../constants";
import createImage from "../utils/createImage";

class Invader {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  private image: HTMLImageElement;

  constructor(x: number, y: number) {
    this.image = createImage(invaderImage);
    this.x = x;
    this.y = y;
    this.width = 0;
    this.height = 0;
    this.image.onload = () => {
      this.width = this.image.width * INVADER_SCALE;
      this.height = this.image.height * INVADER_SCALE;
    };
  }

  update(speedX: number, speedY: number) {
    this.x += speedX;
    this.y += speedY;
  }

  shoot() {}

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

export default Invader;
