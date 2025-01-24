import { createSequence } from '@olivierpascal/helpers';

import type { IFeedCanonicalLayoutFeedPaneRendererProps } from './FeedCanonicalLayout';
import { IBoxProps } from '~/components/Box';
import { Placeholder } from '~/components/Placeholder';

export type IFeedPaneProps = IBoxProps &
  IFeedCanonicalLayoutFeedPaneRendererProps;

export const FeedPane: React.FC<IFeedPaneProps> = (props) => {
  const { grid, ...other } = props;

  const renderContent = (): React.ReactNode =>
    createSequence(6).map((index) => (
      <Placeholder
        key={index}
        label="Feed"
        shape="$sm"
        h="$32"
        diagonals
        {...other}
      />
    ));

  return grid ? (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        flexGrow: 1,
        gap: 18,
        height: 'min-content',
      }}
    >
      {/* FIXME: grid component */}
      {renderContent()}
    </div>
  ) : (
    renderContent()
  );
};
