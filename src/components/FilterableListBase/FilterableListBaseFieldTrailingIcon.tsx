import { iconTriangleDown, iconTriangleUp, iconXMark } from '~/assets/icons';
import { IconButton } from '../IconButton';
import { Stack } from '../Stack';
import { SvgIcon } from '../SvgIcon';

export type IFilterableListBaseFieldTrailingIcon = {
  opened?: boolean;
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
        props.opened ? (
          <SvgIcon icon={iconTriangleUp} />
        ) : (
          <SvgIcon icon={iconTriangleDown} />
        )
      }
    />
  </Stack>
);
