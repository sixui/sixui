import stylex from '@stylexjs/stylex';

import { IconButton } from '~/components/IconButton';
import { commonStyles } from '~/helpers/commonStyles';
import { SvgIcon } from '~/components/SvgIcon';
import { iconTriangleDown, iconTriangleUp, iconXMark } from '~/assets/icons';

export type IFilterableListBaseFieldEnd = {
  isOpen?: boolean;
  onClear?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
};

export const FilterableListBaseFieldEnd = (
  props: IFilterableListBaseFieldEnd,
): React.ReactNode => (
  <div {...stylex.props(commonStyles.horizontalLayout, commonStyles.gap$none)}>
    {props.onClear ? (
      <IconButton icon={<SvgIcon icon={iconXMark} />} onClick={props.onClear} />
    ) : null}
    <IconButton
      tabIndex={-1}
      icon={
        props.isOpen ? (
          <SvgIcon icon={iconTriangleUp} />
        ) : (
          <SvgIcon icon={iconTriangleDown} />
        )
      }
    />
  </div>
);
