import stylex from '@stylexjs/stylex';

import type { IFloatingFilterableListTriggerButtonRenderProps } from '@/components/atoms/FloatingFilterableList';
import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ReactComponent as XMarkIcon } from '@/assets/XMark.svg';
import { IconButton } from '@/components/atoms/IconButton';
import { commonStyles } from '@/helpers/commonStyles';

export type IFilterableListFieldEnd<TItem> = {
  renderProps: IFloatingFilterableListTriggerButtonRenderProps<TItem>;
  onClear?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
};

export const FilterableListFieldEnd = <TItem,>(
  props: IFilterableListFieldEnd<TItem>,
): React.ReactNode => (
  <div {...stylex.props(commonStyles.horizontalLayout, commonStyles.gap$none)}>
    {props.onClear ? (
      <IconButton icon={<XMarkIcon aria-hidden />} onClick={props.onClear} />
    ) : null}
    <IconButton
      tabIndex={-1}
      icon={
        props.renderProps.isOpen ? (
          <TriangleUpIcon aria-hidden />
        ) : (
          <TriangleDownIcon aria-hidden />
        )
      }
    />
  </div>
);
