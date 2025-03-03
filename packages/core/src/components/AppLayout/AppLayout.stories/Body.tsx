import type { ICanonicalLayoutType } from '~/hooks/useCanonicalLayout';
import type { IAppLayoutBodyProps } from '../AppLayoutBody';
import { AppLayout } from '../AppLayout';
import { CustomLayout } from './CustomLayout';
import { DetailPane } from './DetailPane';
import { FeedPane } from './FeedPane';
import { FocusPane } from './FocusPane';
import { ListDetailPane } from './ListDetailPane';
import { ListPane } from './ListPane';
import { SupportingPane } from './SupportingPane';

export interface IBodyProps extends IAppLayoutBodyProps {
  type?: ICanonicalLayoutType;
  detached?: boolean;
}

export const Body: React.FC<IBodyProps> = (props) => {
  const { type, ...other } = props;

  return type === 'listDetail' ? (
    <AppLayout.ListDetailBody
      listPane={<ListPane />}
      detailPane={<DetailPane />}
      listDetailPane={<ListDetailPane />}
      {...other}
    />
  ) : type === 'supportingPane' ? (
    <AppLayout.SupportingPaneBody
      focusPane={(props) => <FocusPane {...props} />}
      supportingPane={<SupportingPane />}
      supportingPaneAside={<SupportingPane pl="$xl" pr="$xl" />}
      supportingPaneBottomSheet={<SupportingPane p="$lg" />}
      {...other}
    />
  ) : type === 'feed' ? (
    <AppLayout.FeedBody
      feedPane={(props) => <FeedPane {...props} />}
      {...other}
    />
  ) : (
    <CustomLayout {...other} />
  );
};
