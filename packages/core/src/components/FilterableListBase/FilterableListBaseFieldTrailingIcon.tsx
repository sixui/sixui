import { iconTriangleDown, iconTriangleUp, iconXMark } from '~/assets/icons';
import { Flex } from '~/components/Flex';
import { IconButton } from '~/components/IconButton';
import { SvgIcon } from '~/components/SvgIcon';

export type IFilterableListBaseFieldTrailingIcon = {
  opened?: boolean;
  onClear?: (event?: React.MouseEvent) => void;
};

export const FilterableListBaseFieldTrailingIcon = (
  props: IFilterableListBaseFieldTrailingIcon,
): React.ReactNode => (
  <Flex direction="row" gap="$xs" align="center">
    {props.onClear && (
      <IconButton icon={<SvgIcon icon={iconXMark} />} onClick={props.onClear} />
    )}
    <SvgIcon
      icon={props.opened ? iconTriangleUp : iconTriangleDown}
      w="24px"
      fz="16px"
      style={{ pointerEvents: 'none' }}
    />
  </Flex>
);
