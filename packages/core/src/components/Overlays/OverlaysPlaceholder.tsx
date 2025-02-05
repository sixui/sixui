import type { IAny } from '~/utils/types';
import type { IOverlay } from './Overlays.types';
import { useOverlaysContext } from './Overlays.context';
import { overlaysGlobals } from './Overlays.globals';

interface IRenderableOverlay<TProps extends object> extends IOverlay<TProps> {
  instanceId: string;
}

/** The placeholder component is used to auto render overlays. */
export const OverlaysPlaceholder: React.FC = () => {
  const overlaysContext = useOverlaysContext();
  console.log('RENDER:');
  console.log('________REGISTRY', overlaysGlobals.registry);
  console.log('_______INSTANCES', overlaysContext.instances);

  const overlaysToRender = Object.entries(overlaysContext.instances).reduce<
    Array<IRenderableOverlay<IAny>>
  >((acc, [instanceId, instance]) => {
    const id = instance.overlayId;
    const overlay = overlaysGlobals.registry[id];
    if (!overlay) {
      // eslint-disable-next-line no-console
      console.warn(`[@sixui/core] No overlay registered for id \`${id}\`.`);

      return acc;
    }

    return [
      ...acc,
      {
        ...overlay,
        instanceId,
        props: {
          ...overlay.props,
          ...instance.props,
        },
      },
    ];
  }, []);

  return overlaysToRender.map(({ component: Component, instanceId, props }) => (
    <Component key={instanceId} instanceId={instanceId} {...props} />
  ));
};
