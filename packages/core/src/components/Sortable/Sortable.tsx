import type { DragEndEvent } from '@dnd-kit/core';
import { useCallback, useMemo, useRef, useState } from 'react';
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
import { COMPONENT_NAME } from './Sortable.constants';
import { SortableContextProvider } from './Sortable.context';
import { sortableTheme } from './Sortable.css';

export const Sortable = polymorphicComponentFactory<ISortableFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      axis,
      initialValue = [],
      onChange,
      minDelay,
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
    const [items, setItems] = useState<Array<ISortableItem>>(
      initialValue.map((id) => ({ id, pending: false })),
    );
    const pendingChangesCountRef = useRef(0);
    const lastChangeRef = useRef<IMaybeAsync<unknown>>(undefined);
    const lastValidItemsRef = useRef(items);

    const handleDragEnd = useCallback(
      (event: DragEndEvent) => {
        setDragging(false);

        const { active, over } = event;
        if (!over || active.id === over.id) {
          // No change.
          return;
        }

        const ids = items.map(({ id }) => id);
        const oldIndex = ids.indexOf(active.id as string);
        const newIndex = ids.indexOf(over.id as string);
        if (oldIndex < 0 || newIndex < 0) {
          // Invalid state.
          return;
        }

        pendingChangesCountRef.current++;

        const reorderedItems = arrayMove(items, oldIndex, newIndex);
        const reorderedIds = reorderedItems.map(({ id }) => id);
        setItems(
          reorderedItems.map((item) => ({
            ...item,
            pending: item.id === active.id ? true : item.pending,
          })),
        );

        lastChangeRef.current = Promise.resolve(lastChangeRef.current)
          .then(() =>
            Promise.all([
              onChange?.(reorderedIds),
              minDelay ? delay(minDelay) : undefined,
            ]),
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
            pendingChangesCountRef.current--;
            if (pendingChangesCountRef.current <= 0) {
              setItems(
                lastValidItemsRef.current.map((item) => ({
                  ...item,
                  pending: false,
                })),
              );
            }
          });
      },
      [onChange, items, minDelay],
    );

    const contextValue = useMemo(
      () => ({
        axis,
        dragging,
      }),
      [axis, dragging],
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
                itemRenderer({ ...item, index, disabled }),
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
