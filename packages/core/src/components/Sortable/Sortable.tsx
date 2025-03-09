import type { DragEndEvent } from '@dnd-kit/core';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  restrictToHorizontalAxis,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { delay } from '@olivierpascal/helpers';

import type { IMaybeAsync } from '~/utils/types';
import type {
  ISortableFactory,
  ISortableFactoryProps,
  ISortableItem,
} from './Sortable.types';
import { useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component';
import { executeLazyPromise } from '~/utils/executeLazyPromise';
import { COMPONENT_NAME } from './Sortable.constants';
import { SortableContextProvider } from './Sortable.context';
import { SortableItem } from './SortableItem';

export type ISortablePendingChange = {
  activeItem: {
    id: string;
    oldIndex: number;
    newIndex: number;
  };
  overItem: {
    id: string;
    oldIndex: number;
    newIndex: number;
  };
};

export const sortableFactory = <TItem,>(
  factoryProps: ISortableFactoryProps<TItem>,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
  const Sortable = componentFactory<ISortableFactory<TItem>>(
    (props, _forwardedRef) => {
      const {
        axis,
        items = [],
        getItemId = factoryProps.getItemId,
        onReorder,
        onDelete,
        onChange,
        minChangeDuration,
        disabled,
        startSlot,
        endSlot,
        dndContextProps,
        children,
      } = useProps({ componentName: COMPONENT_NAME, props });

      const activationConstraint = {
        distance: 8,
      };

      const [dragging, setDragging] = useState(false);
      const [processing, setProcessing] = useState(false);
      const [sortableItems, setSortableItems] = useState<
        Array<ISortableItem<TItem>>
      >(items.map((item) => ({ item, id: getItemId(item) })));

      const mouseSensor = useSensor(MouseSensor, {
        activationConstraint,
      });
      const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
          ...activationConstraint,
          delay: 250,
          tolerance: 8,
        },
      });
      const keyboardSensor = useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      });
      const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);
      const processingChangesRef = useRef<Array<ISortablePendingChange>>([]);
      const lastChangeRef = useRef<IMaybeAsync<unknown>>(undefined);
      const lastValidItemsRef = useRef(sortableItems);

      // Update sortable items when items changes.
      useEffect(() => {
        setSortableItems((prevSortableItems) =>
          items.map((item) => ({
            item,
            id: getItemId(item),
            processing: prevSortableItems.some(
              // (item) => item.id === id && item.processing,
              (sortableItem) =>
                sortableItem.id === getItemId(item) && sortableItem.processing,
            ),
          })),
        );
      }, [items, getItemId]);

      const handleDragEnd = useCallback(
        (event: DragEndEvent) => {
          setDragging(false);

          const { active, over } = event;
          if (!over || active.id === over.id) {
            // No change.
            return;
          }

          const activeId = active.id as string;
          const overId = over.id as string;

          const ids = sortableItems.map(({ id }) => id);
          const oldIndex = ids.indexOf(activeId);
          const newIndex = ids.indexOf(overId);
          if (oldIndex < 0 || newIndex < 0) {
            // Invalid state.
            return;
          }

          processingChangesRef.current.push({
            activeItem: {
              id: activeId,
              oldIndex,
              newIndex,
            },
            overItem: {
              id: overId,
              oldIndex: newIndex,
              newIndex: oldIndex,
            },
          });

          const reorderedItems = arrayMove(sortableItems, oldIndex, newIndex);
          setSortableItems(
            reorderedItems.map((item) => ({
              ...item,
              processing: item.id === active.id ? true : item.processing,
            })),
          );

          lastChangeRef.current = Promise.resolve(lastChangeRef.current)
            .then(
              () =>
                new Promise((resolve, reject) => {
                  Promise.all([
                    executeLazyPromise(async () => {
                      await onReorder?.(reorderedItems.map(({ item }) => item));
                      await onChange?.(reorderedItems.map(({ item }) => item));
                    }, setProcessing),
                    minChangeDuration ? delay(minChangeDuration) : undefined,
                  ])
                    .then(resolve)
                    .catch(reject);
                }),
            )
            .then(() => {
              lastValidItemsRef.current = reorderedItems;
            })
            .catch(() => {
              setSortableItems(
                reorderedItems.map((item) => ({
                  ...item,
                  processing: false,
                })),
              );
            })
            .finally(() => {
              processingChangesRef.current.shift();
              if (processingChangesRef.current.length <= 0) {
                setSortableItems(
                  lastValidItemsRef.current.map((item) => ({
                    ...item,
                    processing: false,
                  })),
                );
              }
            });
        },
        [onReorder, onChange, sortableItems, minChangeDuration],
      );

      const contextValue = useMemo(
        () => ({
          axis,
          dragging,
        }),
        [axis, dragging],
      );

      const isItemProcessing = useCallback(
        (id: string): boolean =>
          processingChangesRef.current.some(
            ({ activeItem }) => activeItem.id === id,
          ),
        [],
      );

      const handleDelete = useCallback(
        (deletedSortableItem: ISortableItem<TItem>) => {
          onDelete?.(deletedSortableItem.item);
          onChange?.(
            sortableItems
              .filter(
                (sortableItem) => sortableItem.id !== deletedSortableItem.id,
              )
              .map(({ item }) => item),
          );
        },
        [sortableItems, onDelete, onChange],
      );

      const measuringConfig = {
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      };

      return (
        <SortableContextProvider value={contextValue}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={
              axis === 'vertical'
                ? [restrictToVerticalAxis]
                : axis === 'horizontal'
                  ? [restrictToHorizontalAxis]
                  : undefined
            }
            onDragStart={() => {
              setDragging(true);
            }}
            onDragCancel={() => {
              setDragging(false);
            }}
            onDragAbort={() => {
              setDragging(false);
            }}
            measuring={measuringConfig}
            {...dndContextProps}
          >
            {startSlot}

            <SortableContext
              items={sortableItems}
              strategy={
                axis === 'vertical'
                  ? verticalListSortingStrategy
                  : axis === 'horizontal'
                    ? horizontalListSortingStrategy
                    : undefined
              }
              disabled={disabled}
            >
              {children({
                sortableItems: sortableItems.map((sortableItem) => ({
                  ...sortableItem,
                  processing,
                  itemProcessing: isItemProcessing(sortableItem.id),
                  disabled,
                  onDelete: () => {
                    handleDelete(sortableItem);
                  },
                })),
              })}
            </SortableContext>

            {endSlot}
          </DndContext>
        </SortableContextProvider>
      );
    },
  );

  Sortable.displayName = `@sixui/core/${COMPONENT_NAME}`;
  Sortable.Item = SortableItem;

  return Sortable;
};

export const Sortable = sortableFactory<string>({
  getItemId: (id) => id,
});
