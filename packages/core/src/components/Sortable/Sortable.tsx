import type { DragEndEvent } from '@dnd-kit/core';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
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
import type { ISortableThemeFactory } from './Sortable.css';
import type { ISortableFactory, ISortableItem } from './Sortable.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component';
import { executeLazyPromise } from '~/utils/executeLazyPromise';
import { COMPONENT_NAME } from './Sortable.constants';
import { SortableContextProvider } from './Sortable.context';
import { sortableTheme } from './Sortable.css';

type IPendingChange = {
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

export const Sortable = polymorphicComponentFactory<ISortableFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      axis,
      value = [],
      onChange,
      minChangeDuration,
      disabled,
      startSlot,
      endSlot,
      itemRenderer,
      dndContextProps,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ISortableThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: sortableTheme,
    });

    const activationConstraint = {
      distance: 8,
    };

    const [dragging, setDragging] = useState(false);
    const [pending, setPending] = useState(false);
    const [items, setItems] = useState<Array<ISortableItem>>(
      value.map((id) => ({ id })),
    );

    const mouseSensor = useSensor(MouseSensor, {
      activationConstraint,
    });
    const touchSensor = useSensor(TouchSensor, {
      activationConstraint,
    });
    const keyboardSensor = useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    });
    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);
    const pendingChangesRef = useRef<Array<IPendingChange>>([]);
    const lastChangeRef = useRef<IMaybeAsync<unknown>>(undefined);
    const lastValidItemsRef = useRef(items);

    // Update items when initialValue changes.
    useEffect(() => {
      setItems((items) =>
        value.map((id) => ({
          id,
          pending: items.some((item) => item.id === id && item.pending),
        })),
      );
    }, [value]);

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

        const ids = items.map(({ id }) => id);
        const oldIndex = ids.indexOf(activeId);
        const newIndex = ids.indexOf(overId);
        if (oldIndex < 0 || newIndex < 0) {
          // Invalid state.
          return;
        }

        pendingChangesRef.current.push({
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

        const reorderedItems = arrayMove(items, oldIndex, newIndex);
        const reorderedIds = reorderedItems.map(({ id }) => id);
        setItems(
          reorderedItems.map((item) => ({
            ...item,
            pending: item.id === active.id ? true : item.pending,
          })),
        );

        lastChangeRef.current = Promise.resolve(lastChangeRef.current)
          .then(
            () =>
              new Promise((resolve, reject) => {
                Promise.all([
                  executeLazyPromise(
                    () => onChange?.(reorderedIds),
                    setPending,
                  ),
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
            setItems(
              reorderedItems.map((item) => ({
                ...item,
                pending: false,
              })),
            );
          })
          .finally(() => {
            pendingChangesRef.current.shift();
            if (pendingChangesRef.current.length <= 0) {
              setItems(
                lastValidItemsRef.current.map((item) => ({
                  ...item,
                  pending: false,
                })),
              );
            }
          });
      },
      [onChange, items, minChangeDuration],
    );

    const contextValue = useMemo(
      () => ({
        axis,
        dragging,
      }),
      [axis, dragging],
    );

    const isItemPending = useCallback(
      (id: string): boolean =>
        pendingChangesRef.current.some(
          ({ activeItem, overItem }) =>
            activeItem.id === id || overItem.id === id,
        ),
      [],
    );

    const handleDelete = useCallback(
      (id: string) => {
        onChange?.(items.filter((item) => item.id !== id).map(({ id }) => id));
      },
      [items, onChange],
    );

    return (
      <SortableContextProvider value={contextValue}>
        <Box {...getStyles('root')} ref={forwardedRef} {...other}>
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
            {...dndContextProps}
          >
            {startSlot}

            <SortableContext
              items={items}
              strategy={
                axis === 'vertical'
                  ? verticalListSortingStrategy
                  : axis === 'horizontal'
                    ? horizontalListSortingStrategy
                    : undefined
              }
              disabled={disabled}
            >
              {items.map((item, index) =>
                itemRenderer({
                  ...item,
                  index,
                  pending,
                  itemPending: isItemPending(item.id),
                  disabled,
                  onDelete: () => {
                    handleDelete(item.id);
                  },
                }),
              )}
            </SortableContext>

            {endSlot}
          </DndContext>
        </Box>
      </SortableContextProvider>
    );
  },
);

Sortable.theme = sortableTheme;
Sortable.displayName = `@sixui/core/${COMPONENT_NAME}`;
