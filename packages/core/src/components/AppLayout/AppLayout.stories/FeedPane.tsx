import { createSequence } from '@olivierpascal/helpers';

import type { IAppLayoutFeedBodyFeedPaneRendererProps } from '../AppLayoutFeedBody';
import { IBoxProps } from '~/components/Box';
import { Placeholder } from '~/components/Placeholder';

export type IFeedPaneProps = IBoxProps &
  IAppLayoutFeedBodyFeedPaneRendererProps;

export const FeedPane: React.FC<IFeedPaneProps> = (props) => {
  const { grid, ...other } = props;

  const renderContent = (): React.ReactNode =>
    createSequence(6).map((index) => (
      <Placeholder
        key={index}
        label="Feed"
        shape="$lg"
        h="$32"
        diagonals
        {...other}
      />
    ));

  return grid ? (
    // TODO: replace by a Grid component
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        flexGrow: 1,
        gap: 18,
        height: 'min-content',
      }}
    >
      {renderContent()}
    </div>
  ) : (
    renderContent()
  );
};
