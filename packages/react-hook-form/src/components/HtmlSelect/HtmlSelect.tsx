import { HtmlSelect as $HtmlSelect } from '@sixui/core';

import { formFieldFactory } from '~/utils/formFieldFactory';

export const HtmlSelect = formFieldFactory($HtmlSelect);

export type IHtmlSelectProps = React.ComponentProps<typeof HtmlSelect>;
