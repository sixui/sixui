import { useState } from 'react';

import type { IOmit } from '~/helpers/types';
import type { IRichTooltipProps } from './RichTooltip.types';
import { Button } from '../Button';
import { RichTooltip } from './RichTooltip';

export const PersistentRichTooltipExample: React.FC<
  IOmit<IRichTooltipProps, 'onOpenChange'>
> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <RichTooltip isOpen={isOpen} {...props} onOpenChange={setIsOpen} persistent>
      <Button onClick={() => setIsOpen(true)}>Show</Button>
    </RichTooltip>
  );
};
