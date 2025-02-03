import { COMPONENT_ID } from './Overlays.constants';
import { overlaysGlobals } from './Overlays.globals';

export interface IOverlayState {
  id: string;
  zIndex: number;
  args?: Record<string, unknown>;
  visible?: boolean;
  delayVisible?: boolean;
  keepMounted?: boolean;
}

export type IOverlaysState = Record<string, IOverlayState>;

export interface IOverlayAction {
  type: string;
  payload: {
    id: string;
    args?: Record<string, unknown>;
    flags?: Record<string, unknown>;
  };
}

export const overlaysInitialState: IOverlaysState = {};

export const overlaysReducer = (
  state: IOverlaysState = overlaysInitialState,
  action: IOverlayAction,
): IOverlaysState => {
  switch (action.type) {
    case `${COMPONENT_ID}/show`: {
      const { id: modalId, args } = action.payload;

      return {
        ...state,
        [modalId]: {
          ...state[modalId],
          id: modalId,
          args,
          // If modal is not mounted, mount it first then make it visible. There
          // is logic inside HOC wrapper to make it visible after its first
          // mount. This mechanism ensures the entering transition.
          visible: !!overlaysGlobals.alreadyMounted[modalId],
          delayVisible: !overlaysGlobals.alreadyMounted[modalId],
        },
      };
    }

    case `${COMPONENT_ID}/hide`: {
      const { id: modalId } = action.payload;
      if (!state[modalId]) {
        return state;
      }

      return {
        ...state,
        [modalId]: {
          ...state[modalId],
          visible: false,
        },
      };
    }

    case `${COMPONENT_ID}/remove`: {
      const { id: modalId } = action.payload;
      const newState = { ...state };
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete newState[modalId];

      return newState;
    }

    case `${COMPONENT_ID}/set-flags`: {
      const { id: modalId, flags } = action.payload;

      if (!state[modalId]) {
        return state;
      }

      return {
        ...state,
        [modalId]: {
          ...state[modalId],
          ...flags,
        },
      };
    }

    default:
      return state;
  }
};
