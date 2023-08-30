const createImage = (src: string): HTMLImageElement => {
  const image = new Image();
  image.src = src;
  return image;
};

export default createImage;
