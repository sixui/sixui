export type ITransform = {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
};

export type ITransition = {
  property: string;
  easing: string;
  duration: string | number;
};

export const css = Object.freeze({
  translate: {
    toString: (transform: ITransform | null) => {
      if (!transform) {
        return;
      }

      const { x, y } = transform;

      return `translate3d(${x ? Math.round(x) : 0}px, ${
        y ? Math.round(y) : 0
      }px, 0)`;
    },
  },
  scale: {
    toString: (transform: ITransform | null) => {
      if (!transform) {
        return;
      }

      const { scaleX, scaleY } = transform;

      return `scaleX(${scaleX}) scaleY(${scaleY})`;
    },
  },
  transform: {
    toString: (transform: ITransform | null) => {
      if (!transform) {
        return;
      }

      return [
        css.translate.toString(transform),
        css.scale.toString(transform),
      ].join(' ');
    },
  },
  transition: {
    toString: ({ property, duration, easing }: ITransition) =>
      `${property} ${typeof duration === 'number' ? `${duration}ms` : duration} ${easing}`,
  },
});
