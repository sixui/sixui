import type { ISize } from './types';

export const getImageSizeFromFile = async (file: File): Promise<ISize> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.onload = () => {
        const { width, height } = image;
        resolve({ width, height });
      };
      image.onerror = () => {
        reject(new Error('Failed to load image.'));
      };
      image.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
