import { iconTriangleDown, iconTriangleUp, iconXMark } from '~/assets/icons';
import { Flex } from '../Flex';
import { IconButton } from '../IconButton';
import { SvgIcon } from '../SvgIcon';

export type IFilterableListBaseFieldTrailingIcon = {
  opened?: boolean;
  onClear?: (event?: React.MouseEvent<Element>) => void;
};

// FIXME:
export const FilterableListBaseFieldTrailingIcon = (
  props: IFilterableListBaseFieldTrailingIcon,
): React.ReactNode => (
  <Flex direction="row" gap="$1" align="center">
    {props.onClear && (
      <IconButton icon={<SvgIcon icon={iconXMark} />} onClick={props.onClear} />
    )}
    <Flex w="$6" justify="center" fz="$4">
      {props.opened ? (
        <SvgIcon icon={iconTriangleUp} />
      ) : (
        <SvgIcon icon={iconTriangleDown} />
      )}
    </Flex>
  </Flex>
);
