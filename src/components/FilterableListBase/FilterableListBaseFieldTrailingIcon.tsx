import { iconTriangleDown, iconTriangleUp, iconXMark } from '~/assets/icons';
import { Flex } from '../Flex';
import { IconButton } from '../IconButton';
import { SvgIcon } from '../SvgIcon';

export type IFilterableListBaseFieldTrailingIcon = {
  opened?: boolean;
  onClear?: () => void;
};

// FIXME:
export const FilterableListBaseFieldTrailingIcon = (
  props: IFilterableListBaseFieldTrailingIcon,
): React.ReactNode => (
  <Flex direction="row" gap="$2">
    {props.onClear ? (
      <IconButton icon={<SvgIcon icon={iconXMark} />} onClick={props.onClear} />
    ) : null}
    {props.opened ? (
      <SvgIcon icon={iconTriangleUp} />
    ) : (
      <SvgIcon icon={iconTriangleDown} />
    )}
  </Flex>
);
