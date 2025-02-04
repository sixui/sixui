import { COMPONENT_ID } from './Overlays.constants';

export interface IOverlayState {
  id: string;
  args?: Record<string, unknown>;
  opened?: boolean;
  delayOpened?: boolean;
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
    case `${COMPONENT_ID}/open`: {
      const { id: overlayId, args } = action.payload;

      return {
        ...state,
        [overlayId]: {
          ...state[overlayId],
          id: overlayId,
          args,
          opened: true,
          // If modal is not mounted, mount it first then make it visible. There
          // is logic inside HOC wrapper to make it visible after its first
          // mount. This mechanism ensures the entering transition.
          // FIXME:
          // opened: !!overlaysGlobals.alreadyMounted[overlayId],
          // delayOpened: !overlaysGlobals.alreadyMounted[overlayId],
        },
      };
    }

    case `${COMPONENT_ID}/close`: {
      const { id: overlayId } = action.payload;
      if (!state[overlayId]) {
        return state;
      }

      return {
        ...state,
        [overlayId]: {
          ...state[overlayId],
          opened: false,
        },
      };
    }

    case `${COMPONENT_ID}/remove`: {
      const { id: overlayId } = action.payload;
      const newState = { ...state };
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete newState[overlayId];

      return newState;
    }

    case `${COMPONENT_ID}/set-flags`: {
      const { id: overlayId, flags } = action.payload;

      if (!state[overlayId]) {
        return state;
      }

      return {
        ...state,
        [overlayId]: {
          ...state[overlayId],
          ...flags,
        },
      };
    }

    default:
      return state;
  }
};
