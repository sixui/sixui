import type { IBoxProps } from '~/components/Box';
import type { IAppLayoutSupportingPaneBodyFocusPaneRendererProps } from '../AppLayoutSupportingPaneBody';
import { Button } from '~/components/Button';
import { Placeholder } from '~/components/Placeholder';

export type IFocusPaneProps = IBoxProps &
  IAppLayoutSupportingPaneBodyFocusPaneRendererProps;

export const FocusPane: React.FC<IFocusPaneProps> = (props) => {
  const {
    hasBottomSheet,
    bottomSheetOpened: _bottomSheetOpened,
    toggleBottomSheet,
    ...other
  } = props;

  return (
    <Placeholder label="Focus" shape="$sm" h="$64" diagonals {...other}>
      {hasBottomSheet && (
        <Button
          onClick={() => {
            toggleBottomSheet();
          }}
        >
          Toggle Bottom Sheet
        </Button>
      )}
    </Placeholder>
  );
};
