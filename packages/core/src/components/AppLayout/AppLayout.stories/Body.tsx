import type { ICanonicalLayoutType } from '~/hooks/useCanonicalLayout';
import { AppLayout } from '../AppLayout';
import { CustomLayout } from './CustomLayout';
import { DetailPane } from './DetailPane';
import { FeedCanonicalLayout } from './FeedCanonicalLayout';
import { FeedPane } from './FeedPane';
import { FocusPane } from './FocusPane';
import { ListDetailPane } from './ListDetailPane';
import { ListPane } from './ListPane';
import { SupportingPane } from './SupportingPane';

type IBodyProps = {
  type?: ICanonicalLayoutType;
};

export const Body: React.FC<IBodyProps> = (props) => {
  const { type } = props;

  return type === 'listDetail' ? (
    <AppLayout.ListDetailBody
      listPane={<ListPane />}
      detailPane={<DetailPane />}
      listDetailPane={<ListDetailPane />}
    />
  ) : type === 'supportingPane' ? (
    <AppLayout.SupportingPaneBody
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
