import type { IAny } from '~/utils/types';
import type { IOverlay } from './Overlays.types';
import { useOverlaysContext } from './Overlays.context';

/** The placeholder component is used to auto render elements when call
show(). */
export const OverlaysPlaceholder: React.FC = () => {
  const overlaysContext = useOverlaysContext();
  console.log('________X', {
    registry: overlaysContext.registry,
    state: overlaysContext.state,
  });

  const visibleIds = Object.keys(overlaysContext.state);
  const itemsToRender = visibleIds.reduce<Array<IOverlay<IAny>>>((acc, id) => {
    if (!overlaysContext.registry[id]) {
      // eslint-disable-next-line no-console
      console.warn(`[@sixui/core] No modal found for id \`${id}\`.`);

      return acc;
    }

    return [...acc, overlaysContext.registry[id]];
  }, []);

  console.log('__render', itemsToRender);

  return itemsToRender.map((item) => (
    <item.component key={item.id} {...item.props} />
  ));
};
