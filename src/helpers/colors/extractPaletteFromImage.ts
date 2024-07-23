import {
  argbFromRgb,
  hexFromArgb,
  QuantizerCelebi,
  Score,
} from '@material/material-color-utilities';

/**
 * Extract the colors color from an image.
 */
export const extractPaletteFromImage = async (
  image: HTMLImageElement,
  count: number,
): Promise<Array<string>> => {
  // Convert Image data to Pixel Array
  const imageBytes = await new Promise<Uint8ClampedArray>((resolve, reject) => {
    const canvas = document.createElement('canvas');

    const context = canvas.getContext('2d');
    if (!context) {
      reject(new Error('Could not get canvas context'));

      return;
    }

    const loadCallback = (): void => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      let rect = [0, 0, image.width, image.height];
      const area = image.dataset.area;
      if (area && /^\d+(\s*,\s*\d+){3}$/.test(area)) {
        rect = area.split(/\s*,\s*/).map((s) => {
          return parseInt(s, 10);
        });
      }
      const [sx, sy, sw, sh] = rect;
      resolve(context.getImageData(sx, sy, sw, sh).data);
    };

    const errorCallback = (): void => {
      reject(new Error('Image load failed'));
    };

    if (image.complete) {
      loadCallback();
    } else {
      // eslint-disable-next-line no-param-reassign
      image.onload = loadCallback;
      // eslint-disable-next-line no-param-reassign
      image.onerror = errorCallback;
    }
  });

  // Convert Image data to Pixel Array
  const pixels: Array<number> = [];
  for (let i = 0; i < imageBytes.length; i += 4) {
    const r = imageBytes[i];
    const g = imageBytes[i + 1];
    const b = imageBytes[i + 2];
    const a = imageBytes[i + 3];
    if (a >= 255) {
      const argb = argbFromRgb(r, g, b);
      pixels.push(argb);
    }
  }

  // Convert Pixels to Material Colors
  const quantizationResult = QuantizerCelebi.quantize(pixels, 128);
  const rankedColors = Score.score(quantizationResult);
  const colorPalette = rankedColors
    .slice(0, count)
    .concat(
      [...quantizationResult.keys()].slice(
        0,
        Math.max(0, count - rankedColors.length),
      ),
    );

  return colorPalette.map(hexFromArgb);
};
