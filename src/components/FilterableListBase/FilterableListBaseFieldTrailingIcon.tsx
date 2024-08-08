import { iconTriangleDown, iconTriangleUp, iconXMark } from '~/assets/icons';
import { IconButton } from '../IconButton';
import { SvgIcon } from '../SvgIcon';
import { Stack } from '../Stack';

export type IFilterableListBaseFieldTrailingIcon = {
  isOpen?: boolean;
  onClear?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
};

export const FilterableListBaseFieldTrailingIcon = (
  props: IFilterableListBaseFieldTrailingIcon,
): React.ReactNode => (
  <Stack horizontal gap={2}>
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
  </Stack>
);
