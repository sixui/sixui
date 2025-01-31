import { AppLayout } from '~/components/AppLayout';
import { useCanonicalLayout } from '~/hooks/useCanonicalLayout';
import { isFunction } from '~/utils/isFunction';

export interface IFeedCanonicalLayoutFeedPaneRendererProps {
  grid?: boolean;
}

export interface IFeedCanonicalLayoutProps {
  feedPane:
    | React.ReactNode
    | ((props: IFeedCanonicalLayoutFeedPaneRendererProps) => React.ReactNode);
}

export const FeedCanonicalLayout: React.FC<IFeedCanonicalLayoutProps> = (
  props,
) => {
  const { feedPane } = props;

  const canonicalLayout = useCanonicalLayout('feed');
  const grid = !canonicalLayout.orientation;

  return (
    <AppLayout.Body orientation={canonicalLayout.orientation}>
      {isFunction(feedPane) ? feedPane({ grid }) : feedPane}
    </AppLayout.Body>
  );
};
