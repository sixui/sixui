// Inspiration:
// - https://github.com/sudodoki/toggle-selection/blob/gh-pages/index.js

export const deselectCurrent = (): (() => void) | undefined => {
  const selection = document.getSelection();
  if (!selection?.rangeCount) {
    return undefined;
  }

  const activeElement = document.activeElement;
  if (!activeElement) {
    return undefined;
  }

  const ranges = Array.from({ length: selection.rangeCount }, (_, i) =>
    selection.getRangeAt(i),
  );

  switch (activeElement.tagName.toLowerCase()) {
    case 'input':
    case 'textarea':
      (activeElement as HTMLElement).blur();
      break;
  }

  selection.removeAllRanges();

  const reselectPrevious = (): void => {
    if (selection.type === 'Caret') {
      // The selection is collapsed (i.e. the caret is placed on some text, but
      // no range has been selected).
      selection.removeAllRanges();
    }

    if (selection.rangeCount <= 0) {
      ranges.forEach(function (range) {
        selection.addRange(range);
      });
    }

    switch (activeElement.tagName.toLowerCase()) {
      case 'input':
      case 'textarea':
        (activeElement as HTMLElement).focus();
        break;
    }
  };

  return reselectPrevious;
};
