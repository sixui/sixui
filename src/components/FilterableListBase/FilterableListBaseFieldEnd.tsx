import stylex from '@stylexjs/stylex';

import { IconButton } from '@/components/IconButton';
import { commonStyles } from '@/helpers/commonStyles';
import {
  IconTriangleDown,
  IconTriangleUp,
  IconXMark,
} from '@/components/Icons';

export type IFilterableListBaseFieldEnd = {
  isOpen?: boolean;
  onClear?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
};

export const FilterableListBaseFieldEnd = (
  props: IFilterableListBaseFieldEnd,
): React.ReactNode => (
  <div {...stylex.props(commonStyles.horizontalLayout, commonStyles.gap$none)}>
    {props.onClear ? (
      <IconButton icon={<IconXMark aria-hidden />} onClick={props.onClear} />
    ) : null}
    <IconButton
      tabIndex={-1}
      icon={
        props.isOpen ? (
          <IconTriangleUp aria-hidden />
        ) : (
          <IconTriangleDown aria-hidden />
        )
      }
    />
  </div>
);
