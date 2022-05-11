import { loadImage } from "./loadImage.js";

const DEFAULT_IMAGE_SRC = "./images/t-shirt.png";

export const fillCanvas = (canvas) => {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
};

export const drawBaseImageAsync = async (
  canvas,
  imageSrc = DEFAULT_IMAGE_SRC
) => {
  const img = await loadImage(imageSrc);
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.drawImage(img, 0, 0);
  }
};

export const downloadImage = (canvas) => {
  let link = document.createElement("a");
  link.href = canvas.toDataURL();
  link.download = "logo-t-shirt.png";
  link.click();
  link.remove();
};
