import { COMPONENT_ID } from './Overlays.constants';

export interface IOverlayInstanceState {
  mounted?: boolean;
  opened?: boolean;
  delayOpened?: boolean;
  keepMounted?: boolean;
}

export interface IOverlayInstance extends IOverlayInstanceState {
  overlayId: string;
  instanceId: string;
  props?: object;
  layer?: string;
}

export type IOverlaysInstances = Record<string, IOverlayInstance>;

export interface IOverlayAction {
  type: string;
  payload: {
    overlayId: string;
    instanceId: string;
    props?: object;
    layer?: string;
  };
}

export const overlaysInitialInstances: IOverlaysInstances = {};

export const overlaysReducer = (
  instances = overlaysInitialInstances,
  action: IOverlayAction,
): IOverlaysInstances => {
  switch (action.type) {
    case `${COMPONENT_ID}/open`: {
      const { instanceId, ...instance } = action.payload;
      const existingInstance = instances[instanceId];

      return {
        ...instances,
        [instanceId]: {
          ...existingInstance,
          ...instance,
          instanceId,
          opened: !!existingInstance?.mounted,
        },
      };
    }

    case `${COMPONENT_ID}/mounted`: {
      const { instanceId, ...instance } = action.payload;
      const existingInstance = instances[instanceId];

      return {
        ...instances,
        [instanceId]: {
          ...existingInstance,
          ...instance,
          instanceId,
          mounted: true,
          opened: true,
        },
      };
    }

    case `${COMPONENT_ID}/close`: {
      const { instanceId } = action.payload;
      const existingInstance = instances[instanceId];

      if (!existingInstance) {
        return instances;
      }

      return {
        ...instances,
        [instanceId]: {
          ...existingInstance,
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

    default:
      return instances;
  }
};
