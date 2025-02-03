import { COMPONENT_ID } from './Layers.constants';
import { layersGlobals } from './Layers.globals';

export interface ILayerState {
  id: string;
  args?: Record<string, unknown>;
  visible?: boolean;
  delayVisible?: boolean;
  keepMounted?: boolean;
}

export type ILayersState = Record<string, ILayerState>;

export interface ILayerAction {
  type: string;
  payload: {
    modalId: string;
    args?: Record<string, unknown>;
    flags?: Record<string, unknown>;
  };
}

export const layersInitialState: ILayersState = {};

export const layersReducer = (
  state: ILayersState = layersInitialState,
  action: ILayerAction,
): ILayersState => {
  switch (action.type) {
    case `${COMPONENT_ID}/show`: {
      const { modalId, args } = action.payload;

      return {
        ...state,
        [modalId]: {
          ...state[modalId],
          id: modalId,
          args,
          // If modal is not mounted, mount it first then make it visible. There
          // is logic inside HOC wrapper to make it visible after its first
          // mount. This mechanism ensures the entering transition.
          visible: !!layersGlobals.alreadyMounted[modalId],
          delayVisible: !layersGlobals.alreadyMounted[modalId],
        },
      };
    }

    case `${COMPONENT_ID}/hide`: {
      const { modalId } = action.payload;
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
      const { modalId } = action.payload;
      const newState = { ...state };
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete newState[modalId];

      return newState;
    }

    case `${COMPONENT_ID}/set-flags`: {
      const { modalId, flags } = action.payload;

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
