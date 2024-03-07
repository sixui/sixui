/**
 * Force layout / reflow
 *
 * @see https://gist.github.com/paulirish/5d52fb081b3570c81e3a/565c05680b27c9cfd9f5e971d295cd558c3e1843
 */
export const forceReflow = (node: HTMLElement): void => void node.scrollTop;
