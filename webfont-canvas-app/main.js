import { downloadImage, drawBaseImageAsync, fillCanvas } from './canvasUtils.js';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 500;
const DEFAULT_LOGO_VALUE = 'コードグリッド';

const initCanvasSize = canvas => {
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
};

const main = async () => {
  const canvas = document.querySelector('canvas');
  const selectedFontEl = document.querySelector('select');
  const textEditorEl = document.querySelector('input');
  const downloadButton = document.querySelector('button');

  const drawLogoAsync = async () => {
    const text = textEditorEl.value;
    const fontFamily = selectedFontEl.value;

    await document.fonts.load(`16px "${fontFamily}"`, text);

    fillCanvas(canvas);
    await drawBaseImageAsync(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#777';
    ctx.textAlign = 'center';
    ctx.font = `42px "${fontFamily}"`;
    ctx.fillText(text, 300, 200);
  };

  if (!canvas || !selectedFontEl || !textEditorEl || !downloadButton) return;
  textEditorEl.value = DEFAULT_LOGO_VALUE;
  initCanvasSize(canvas);
  downloadButton.addEventListener('click', () => {
    downloadImage(canvas);
  });

  document.fonts.ready.then(() => {
    drawLogoAsync();
    textEditorEl?.addEventListener('input', () => {
      drawLogoAsync();
    });
    selectedFontEl?.addEventListener('change', () => {
      drawLogoAsync();
    });
  });
};

main();
