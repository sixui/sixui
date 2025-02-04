import type { IAny } from '~/utils/types';
import type { IOverlay } from './Overlays.types';
import { useOverlaysContext } from './Overlays.context';
import { overlaysGlobals } from './Overlays.globals';

/** The placeholder component is used to auto render elements when call
show(). */
export const OverlaysPlaceholder: React.FC = () => {
  const overlaysContext = useOverlaysContext();
  console.log('________X', {
    registry: overlaysGlobals.registry,
    state: overlaysContext.state,
  });

  const visibleIds = Object.keys(overlaysContext.state);
  const itemsToRender = visibleIds.reduce<Array<IOverlay<IAny>>>((acc, id) => {
    if (!overlaysGlobals.registry[id]) {
      // eslint-disable-next-line no-console
      console.warn(`[@sixui/core] No modal found for id \`${id}\`.`);

      return acc;
    }

    return [...acc, overlaysGlobals.registry[id]];
  }, []);

  console.log('__render', itemsToRender);

  return itemsToRender.map((item) => (
    <item.component key={item.id} {...item.props} />
  ));
};
