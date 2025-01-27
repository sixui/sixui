import type { IInteraction, IInteractions } from '~/hooks/useInteractions';

export const combineInteractionsState = (
  /** The current interaction state of the trigger. */
  state: IInteractions,

  /**
   * The ordered list of interaction status to determine the combined state.
   * @defaultValue ['disabled', 'dragged', 'pressed', 'hovered', 'focused']
   */
  priorities: Array<IInteraction> = [
    'dragged',
    'pressed',
    'hovered',
    'focused',
  ],
): IInteraction | undefined => {
  const combinedStatus = priorities.find((status) => state[status]);

  return combinedStatus;
};
