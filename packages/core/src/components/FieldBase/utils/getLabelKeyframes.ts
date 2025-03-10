export const getLabelKeyframes = (
  floatingLabelRef: React.RefObject<HTMLDivElement | null>,
  restingLabelRef: React.RefObject<HTMLDivElement | null>,
  focused?: boolean,
  populated?: boolean,
): Array<Keyframe> => {
  const floatingLabelEl = floatingLabelRef.current;
  const restingLabelEl = restingLabelRef.current;
  if (!floatingLabelEl || !restingLabelEl) {
    return [];
  }

  const {
    x: floatingX,
    y: floatingY,
    height: floatingHeight,
  } = floatingLabelEl.getBoundingClientRect();
  const {
    x: restingX,
    y: restingY,
    height: restingHeight,
  } = restingLabelEl.getBoundingClientRect();
  const floatingScrollWidth = floatingLabelEl.scrollWidth;
  const restingScrollWidth = restingLabelEl.scrollWidth;
  // Scale by width ratio instead of font size since letter-spacing will scale
  // incorrectly. Using the width we can better approximate the adjusted
  // scale and compensate for tracking and overflow.
  // (use scrollWidth instead of width to account for clipped labels)
  const scale = restingScrollWidth / floatingScrollWidth;
  const xDelta = restingX - floatingX;
  // The line-height of the resting and floating label are different. When
  // we move the floating label down to the resting label's position, it won't
  // exactly match because of this. We need to adjust by half of what the
  // final scaled floating label's height will be.
  const yDelta =
    restingY -
    floatingY +
    Math.round((restingHeight - floatingHeight * scale) / 2);

  // Create the two transforms: floating to resting (using the calculations
  // above), and resting to floating (re-setting the transform to initial
  // values).
  const restTransform = `translateX(${xDelta}px) translateY(${yDelta}px) scale(${scale})`;
  const floatTransform = `translateX(0) translateY(0) scale(1)`;

  // Constrain the floating labels width to a scaled percentage of the
  // resting label's width. This will prevent long clipped labels from
  // overflowing the container.
  const restingClientWidth = restingLabelEl.clientWidth;
  const isRestingClipped = restingScrollWidth > restingClientWidth;
  const width = isRestingClipped ? `${restingClientWidth / scale}px` : '';
  if (focused || populated) {
    return [
      { transform: restTransform, width },
      { transform: floatTransform, width },
    ];
  }

  return [
    { transform: floatTransform, width },
    { transform: restTransform, width },
  ];
};
