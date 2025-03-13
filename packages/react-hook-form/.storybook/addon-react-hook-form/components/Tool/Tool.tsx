// eslint-disable-next-line
import React from 'react';
import { useChannel } from '@storybook/manager-api';
import { Button } from 'storybook/internal/components';

import { EVENTS } from '../../constants';

export const Tool: React.FC = () => {
  const emit = useChannel({});

  const handleSubmit = (): void => {
    emit(EVENTS.REQUEST);
  };

  return (
    <Button variant="solid" onClick={handleSubmit}>
      Submit form
    </Button>
  );
};
