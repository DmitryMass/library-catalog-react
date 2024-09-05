import { ReactNode } from 'react';

type DataListProps<T extends object> = {
  data: T[];
  item: (child: T, index: number) => ReactNode;
};

export const DataList = <T extends object>({
  data,
  item,
}: DataListProps<T>) => {
  return <>{data?.length ? data.map(item) : null}</>;
};
