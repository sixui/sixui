import type { IAny } from '~/utils/types';
import type { IOverlay } from './Overlays.types';
import { useOverlaysContext } from './Overlays.context';
import { overlaysGlobals } from './Overlays.globals';

/** The placeholder component is used to auto render overlays. */
export const OverlaysPlaceholder: React.FC = () => {
  const overlaysContext = useOverlaysContext();
  console.log('RENDER:');
  console.log('________REGISTRY', overlaysGlobals.registry);
  console.log('___________STATE', overlaysContext.instances);

  const overlaysToRender = Object.entries(overlaysContext.instances).reduce<
    Array<IOverlay<IAny> & { instanceId: string }>
  >((acc, [instanceId, instance]) => {
    const overlay = overlaysGlobals.registry[instance.overlayId];
    if (!overlay) {
      // eslint-disable-next-line no-console
      console.warn(
        `[@sixui/core] No overlay found for id \`${instance.overlayId}\`.`,
      );

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
