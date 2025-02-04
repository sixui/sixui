import { COMPONENT_ID } from './Overlays.constants';

export interface IOverlayInstance {
  overlayId: string;
  props?: object;
  opened?: boolean;
  delayOpened?: boolean;
  keepMounted?: boolean;
}

export type IOverlaysInstances = Record<string, IOverlayInstance>;

export interface IOverlayAction {
  type: string;
  payload: {
    overlayId: string;
    instanceId: string;
    props?: object;
    flags?: Record<string, unknown>;
  };
}

export const overlaysInitialInstances: IOverlaysInstances = {};

export const overlaysReducer = (
  instances = overlaysInitialInstances,
  action: IOverlayAction,
): IOverlaysInstances => {
  switch (action.type) {
    case `${COMPONENT_ID}/open`: {
      const { overlayId, instanceId, props } = action.payload;

      return {
        ...instances,
        [instanceId]: {
          ...instances[overlayId],
          overlayId,
          props,
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
      const { instanceId } = action.payload;
      if (!instances[instanceId]) {
        return instances;
      }

      return {
        ...instances,
        [instanceId]: {
          ...instances[instanceId],
          opened: false,
        },
      };
    }

    case `${COMPONENT_ID}/remove`: {
      const { instanceId } = action.payload;
      const newState = { ...instances };
      delete newState[instanceId];

      return newState;
    }

    case `${COMPONENT_ID}/set-flags`: {
      const { instanceId, flags } = action.payload;

      if (!instances[instanceId]) {
        return instances;
      }

      return {
        ...instances,
        [instanceId]: {
          ...instances[instanceId],
          ...flags,
        },
      };
    }

    default:
      return instances;
  }
};
