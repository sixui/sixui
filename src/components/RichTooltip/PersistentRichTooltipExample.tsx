import { useState } from 'react';

import type { IOmit } from '~/helpers/types';
import type { IRichTooltipProps } from './RichTooltip.types';
import { Button } from '../Button';
import { RichTooltip } from './RichTooltip';

export const PersistentRichTooltipExample: React.FC<
  IOmit<IRichTooltipProps, 'onOpenChange'>
> = (props) => {
  const [opened, setOpened] = useState(false);

  return (
    <RichTooltip opened={opened} {...props} onOpenChange={setOpened} persistent>
      <Button onClick={() => setOpened(true)}>Show</Button>
    </RichTooltip>
  );
};
