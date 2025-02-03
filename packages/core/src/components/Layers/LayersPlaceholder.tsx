import { useLayersContext } from './Layers.context';
import { layersGlobals } from './Layers.globals';

/** The placeholder component is used to auto render elements when call
show(). */
export const LayersPlaceholder: React.FC = () => {
  const layersContext = useLayersContext();

  const visibleIds = Object.keys(layersContext).filter(
    (id) => !!layersContext[id],
  );
  visibleIds.forEach((id) => {
    if (!layersGlobals.registry[id] && !layersGlobals.alreadyMounted[id]) {
      // eslint-disable-next-line no-console
      console.warn(
        `[@sixui/core] No modal found for id \`${id}\`. Please check the id or if it is registered or declared via JSX.`,
      );

      return;
    }
  });

  const itemsToRender = visibleIds
    .filter((id) => layersGlobals.registry[id])
    .map((id) => ({
      id,
      ...layersGlobals.registry[id]!,
    }));

  return itemsToRender.map((item) => (
    <item.component key={item.id} id={item.id} {...item.props} />
  ));
};
