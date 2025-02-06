import type { IAny } from '~/utils/types';

export interface IOverlayInstanceState {
  mounted?: boolean;
  opened?: boolean;
  delayOpened?: boolean;
  keepMounted?: boolean;
}

export interface IOverlayInstance<TProps extends object>
  extends IOverlayInstanceState {
  overlayId: string;
  props?: TProps;
  layer?: string;
  instanceId: string;
}

export type IOverlaysInstances = Record<string, IOverlayInstance<IAny>>;

export type IOverlayAction =
  | {
      type: 'OPEN';
      payload: {
        overlayId: string;
        instanceId: string;
        props?: object;
        layer?: string;
      };
    }
  | {
      type: 'MOUNTED';
      payload: {
        instanceId: string;
      };
    }
  | {
      type: 'CLOSE';
      payload: {
        instanceId: string;
      };
    }
  | {
      type: 'CLOSE_ALL';
      payload?: {
        overlayId?: string;
        layer?: string;
      };
    }
  | {
      type: 'REMOVE';
      payload: {
        instanceId: string;
      };
    };

export const overlaysInitialInstances: IOverlaysInstances = {};

export const overlaysReducer = (
  instances = overlaysInitialInstances,
  action: IOverlayAction,
): IOverlaysInstances => {
  switch (action.type) {
    case 'OPEN': {
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

    case 'MOUNTED': {
      const { instanceId } = action.payload;
      const existingInstance = instances[instanceId];

      if (!existingInstance) {
        return instances;
      }

      return {
        ...instances,
        [instanceId]: {
          ...existingInstance,
          instanceId,
          mounted: true,
          opened: true,
        },
      };
    }

    case 'CLOSE': {
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

    case 'CLOSE_ALL': {
      const { overlayId, layer } = action.payload ?? {};
      const instanceIdsToClose = Object.values(instances)
        .filter(
          (instance) =>
            (overlayId !== undefined
              ? instance.overlayId === overlayId
              : true) &&
            (layer !== undefined ? instance.layer === layer : true),
        )
        .map(({ instanceId }) => instanceId);

      return instanceIdsToClose.reduce(
        (acc, instanceId) => {
          const existingInstance = instances[instanceId]!;

          return {
            ...acc,
            [instanceId]: {
              ...existingInstance,
              opened: false,
            },
          };
        },
        { ...instances },
      );
    }

    case 'REMOVE': {
      const { instanceId } = action.payload;
      const newState = { ...instances };
      delete newState[instanceId];

      return newState;
    }
  }
};
