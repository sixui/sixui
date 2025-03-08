import { useCallback, useMemo } from 'react';
import { useSortable } from '@dnd-kit/sortable';

import type { ISortableItemThemeFactory } from './SortableItem.css';
import type { ISortableItemFactory } from './SortableItem.types';
import { Box } from '~/components/Box';
import { MoveHandle } from '~/components/MoveHandle';
import { useSortableContext } from '~/components/Sortable/Sortable.context';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { polymorphicComponentFactory } from '~/utils/component';
import { css } from '~/utils/css';
import { getDataAttributes } from '~/utils/getDataAttributes';
import { isFunction } from '~/utils/isFunction';
import { COMPONENT_NAME } from './SortableItem.constants';
import { sortableItemTheme } from './SortableItem.css';

export const SortableItem = polymorphicComponentFactory<ISortableItemFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
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

    const { getStyles } = useComponentTheme<ISortableItemThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: sortableItemTheme,
      modifiers: {
        'drag-handle-position': dragHandlePosition,
      },
    });

    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id, disabled: fixed });

    const draggable = !dragHandle && !fixed;
    const showDragHandle = dragHandle && !fixed;
    const dragged = isDragging;

    const sortableStyle = useMemo(
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
        style: sortableStyle,
        ...getDataAttributes({ dragged }),
        draggable,
        ref: handleRef,
      }),
      [sortableStyle, handleRef, dragged, draggable],
    );

    const renderDragHandle = dragHandleRenderer
      ? () => dragHandleRenderer({ getProps: getDragHandleProps })
      : (): React.ReactNode => (
          <MoveHandle
            {...getStyles('dragHandle')}
            orientation={
              dragHandlePosition === 'top' || dragHandlePosition === 'bottom'
                ? 'horizontal'
                : 'vertical'
            }
            {...attributes}
            {...listeners}
          />
        );

    return isFunction(children) ? (
      children({ getItemProps, getDragHandleProps, renderDragHandle })
    ) : (
      <Box
        {...getStyles('root', {
          style: sortableStyle,
        })}
        {...(dragHandle ? undefined : getDragHandleProps())}
        interactions={{ dragged }}
        draggable={draggable}
        ref={handleRef}
        {...other}
      >
        {children}
        {showDragHandle && renderDragHandle()}
      </Box>
    );
  },
);

SortableItem.displayName = `@sixui/core/${COMPONENT_NAME}`;
