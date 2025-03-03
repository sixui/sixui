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
    <Flex w="24px" justify="center" fz="16px">
      {props.opened ? (
        <SvgIcon icon={iconTriangleUp} />
      ) : (
        <SvgIcon icon={iconTriangleDown} />
      )}
    </Flex>
  </Flex>
);
