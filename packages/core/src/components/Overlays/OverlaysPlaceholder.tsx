import { overlaysGlobals } from './Overlays.globals';
import { useOverlaysStateContext } from './OverlaysState.context';

/** The placeholder component is used to auto render overlays. */
export const OverlaysPlaceholder: React.FC = () => {
  const overlaysContext = useOverlaysStateContext();

  return overlaysContext.sortedInstances.map(
    ({ overlayId, instanceId, props }) => {
      const Component = overlaysGlobals.registry[overlayId]?.component;
      if (!Component) {
        return;
      }

      return <Component key={instanceId} instanceId={instanceId} {...props} />;
    },
  );
};
