import type { IAny } from '~/utils/types';
import type { IOverlaysInstances } from '../Overlays.reducer';
import type { IRennderableOverlay } from '../Overlays.types';
import type { IOverlayLayer } from '../OverlaysState.context';
import { overlaysGlobals } from '../Overlays.globals';

export const getSortedRenderableOverlays = (
  instances: IOverlaysInstances,
  layers: Array<IOverlayLayer>,
): Array<IRennderableOverlay<IAny>> => {
  const renderableOverlays = Object.values(instances).reduce<
    Array<IRennderableOverlay<IAny>>
  >((acc, instance) => {
    const id = instance.overlayId;
    const registeredOverlay = overlaysGlobals.registry[id];
    if (!registeredOverlay) {
      // eslint-disable-next-line no-console
      console.warn(`[@sixui/core] No overlay registered for id \`${id}\`.`);

      return acc;
    }

    return [
      ...acc,
      {
        ...registeredOverlay,
        ...instance,
        props: {
          ...registeredOverlay.props,
          ...instance.props,
        },
      },
    ];
  }, []);

  const layerIndexesByName = layers.reduce<Record<string, number>>(
    (acc, layer, index) => ({
      ...acc,
      [layer]: index,
    }),
    {},
  );

  const sortedRenderableOverlay = renderableOverlays.sort((a, b) => {
    const layerA = a.layer;
    const layerB = b.layer;

    if (layerA && layerB) {
      const layerIndexA = layerIndexesByName[layerA] ?? 0;
      const layerIndexB = layerIndexesByName[layerB] ?? 0;

      return layerIndexA - layerIndexB;
    }

    if (layerA && !layerB) {
      return -1;
    }

    if (!layerA && layerB) {
      return 1;
    }

    return 0;
  });

  return sortedRenderableOverlay;
};
