import { SuggestionChip, type ISuggestionChipProps } from '~/components/Chip';

export type ISuggestionChipPlaygroundDemoProps = {
  suggestionChip: ISuggestionChipProps;
};

export const SuggestionChipPlaygroundDemo: React.FC<
  ISuggestionChipPlaygroundDemoProps
> = (props) => <SuggestionChip {...props.suggestionChip} />;
