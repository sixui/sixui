import type { AnimateLayoutChanges } from '@dnd-kit/sortable';
import { useCallback, useMemo } from 'react';
import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';

import type { ISortableItemFactory } from './SortableItem.types';
import { MoveHandle } from '~/components/MoveHandle';
import { useSortableContext } from '~/components/Sortable/Sortable.context';
import { useProps } from '~/components/Theme';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { polymorphicComponentFactory } from '~/utils/component';
import { css } from '~/utils/css';
import { getDataAttributes } from '~/utils/getDataAttributes';
import { isFunction } from '~/utils/isFunction';
import { COMPONENT_NAME } from './SortableItem.constants';

const animateLayoutChanges: AnimateLayoutChanges = (props) =>
  defaultAnimateLayoutChanges({ ...props, wasDragging: true });

export const SortableItem = polymorphicComponentFactory<ISortableItemFactory>(
  (props, forwardedRef) => {
    const {
      as: Component = 'div',
      id,
      fixed,
      children,
      dragHandle,
      dragHandlePosition: dragHandlePositionProp,
      dragHandleRenderer,
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const sortableContext = useSortableContext();
    const dragHandlePosition =
      dragHandlePositionProp ??
      (sortableContext?.axis === 'vertical' ? 'left' : 'bottom');

    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id, disabled: fixed, animateLayoutChanges });

    const draggable = !dragHandle && !fixed;
    const showDragHandle = dragHandle && !fixed;
    const dragged = isDragging;

    const style = useMemo(
      () => ({
        transform: css.translate.toString(transform),
        transition,
        zIndex: isDragging ? 1 : 0,
        touchAction: 'manipulation',
        cursor:
          draggable && !showDragHandle
            ? isDragging
              ? 'grabbing'
              : 'grab'
            : undefined,
      }),
      [isDragging, transform, transition, showDragHandle, draggable],
    );

    const getDragHandleProps = useCallback(
      () => ({
        ...attributes,
        ...listeners,
      }),
      [attributes, listeners],
    );

    const handleRef = useMergeRefs(forwardedRef, setNodeRef);

    const getItemProps = useCallback(
      () => ({
        style,
        ...getDataAttributes({ dragged }),
        draggable,
        ref: handleRef,
      }),
      [style, handleRef, dragged, draggable],
    );

    const renderDragHandle = dragHandleRenderer
      ? () => dragHandleRenderer({ getProps: getDragHandleProps })
      : (): React.ReactNode => (
          <MoveHandle
            position={dragHandlePosition}
            {...attributes}
            {...listeners}
          />
        );

    return isFunction(children) ? (
      children({
        getItemProps,
        getDragHandleProps,
        renderDragHandle,
      })
    ) : (
      <Component
        {...getItemProps()}
        {...(dragHandle ? undefined : getDragHandleProps())}
        ref={handleRef}
        {...other}
      >
        {children}
        {showDragHandle && renderDragHandle()}
      </Component>
    );
  },
);

SortableItem.displayName = `@sixui/core/${COMPONENT_NAME}`;
