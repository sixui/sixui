// Warning: this function uses React internals that may change in the future.
export const triggerChangeEvent = (
  element: HTMLElement & {
    _valueTracker?: { setValue: (value: string) => void };
  },
): void => {
  // https://stackoverflow.com/a/78712814/7628220
  const tracker = element._valueTracker;
  if (tracker) {
    tracker.setValue('some-unlikely-fake-value');
  }
  const event = new Event('change', { bubbles: true });
  element.dispatchEvent(event);
};
