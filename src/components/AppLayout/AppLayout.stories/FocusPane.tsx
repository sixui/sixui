import type { ISupportingPaneCanonicalLayoutFocusPaneRendererProps } from './SupportingPaneCanonicalLayout';
import { Button } from '~/components/Button';
import { Placeholder } from '~/components/Placeholder';

export type IFocusPaneProps =
  ISupportingPaneCanonicalLayoutFocusPaneRendererProps;

export const FocusPane: React.FC<IFocusPaneProps> = (props) => {
  const { hasBottomSheet, toggleBottomSheet } = props;

  return (
    <Placeholder label="focus" shape="$sm" h="$64" diagonals>
      {hasBottomSheet && (
        <Button onClick={() => toggleBottomSheet()}>Toggle Bottom Sheet</Button>
      )}
    </Placeholder>
  );
};
