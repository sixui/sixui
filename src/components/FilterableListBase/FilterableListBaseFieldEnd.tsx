import stylex from '@stylexjs/stylex';

import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ReactComponent as XMarkIcon } from '@/assets/XMark.svg';
import { IconButton } from '@/components/IconButton';
import { commonStyles } from '@/helpers/commonStyles';

export type IFilterableListBaseFieldEnd = {
  isOpen?: boolean;
  onClear?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
};

export const FilterableListBaseFieldEnd = (
  props: IFilterableListBaseFieldEnd,
): React.ReactNode => (
  <div {...stylex.props(commonStyles.horizontalLayout, commonStyles.gap$none)}>
    {props.onClear ? (
      <IconButton icon={<XMarkIcon aria-hidden />} onClick={props.onClear} />
    ) : null}
    <IconButton
      tabIndex={-1}
      icon={
        props.isOpen ? (
          <TriangleUpIcon aria-hidden />
        ) : (
          <TriangleDownIcon aria-hidden />
        )
      }
    />
  </div>
);
