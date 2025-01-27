import type { ICanonicalLayoutType } from '~/hooks/useCanonicalLayout';
import { CustomLayout } from './CustomLayout';
import { DetailPane } from './DetailPane';
import { FeedCanonicalLayout } from './FeedCanonicalLayout';
import { FeedPane } from './FeedPane';
import { FocusPane } from './FocusPane';
import { ListDetailCanonicalLayout } from './ListDetailCanonicalLayout';
import { ListDetailPane } from './ListDetailPane';
import { ListPane } from './ListPane';
import { SupportingPane } from './SupportingPane';
import { SupportingPaneCanonicalLayout } from './SupportingPaneCanonicalLayout';

type ICanonicalLayoutProps = {
  type?: ICanonicalLayoutType;
};

export const CanonicalLayout: React.FC<ICanonicalLayoutProps> = (props) => {
  const { type } = props;

  return type === 'listDetail' ? (
    <ListDetailCanonicalLayout
      listPane={<ListPane />}
      detailPane={<DetailPane />}
      listDetailPane={<ListDetailPane />}
    />
  ) : type === 'supportingPane' ? (
    <SupportingPaneCanonicalLayout
      focusPane={(props) => <FocusPane {...props} />}
      supportingPane={<SupportingPane />}
      supportingPaneAside={<SupportingPane pl="$4" pr="$4" />}
      supportingPaneBottomSheet={<SupportingPane p="$4" />}
    />
  ) : type === 'feed' ? (
    <FeedCanonicalLayout feedPane={(props) => <FeedPane {...props} />} />
  ) : (
    <CustomLayout />
  );
};
