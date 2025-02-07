type IDataProps = Record<string, unknown>;

export type IExtractDataPropsResult = {
  dataProps?: IDataProps;
  other: Record<string, unknown>;
};

export const extractDataProps = (
  props: IDataProps,
): IExtractDataPropsResult => {
  const result = Object.entries(props).reduce<IExtractDataPropsResult>(
    (acc, [key, value]) => {
      const isDataProp = key.startsWith('data-');

      return {
        ...acc,
        dataProps: isDataProp
          ? {
              ...acc.dataProps,
              [key]: value,
            }
          : acc.dataProps,
        other: !isDataProp
          ? {
              ...acc.other,
              [key]: value,
            }
          : acc.other,
      };
    },
    { dataProps: {}, other: {} },
  );

  return result;
};
