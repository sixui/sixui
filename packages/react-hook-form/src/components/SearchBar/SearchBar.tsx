import { SearchBar as $SearchBar } from '@sixui/core';

import { formFieldFactory } from '~/utils/formFieldFactory';

export const SearchBar = formFieldFactory($SearchBar, {
  supportsErrorProps: false,
});

export type ISearchBarProps = React.ComponentProps<typeof SearchBar>;
