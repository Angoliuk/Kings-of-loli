import { type ReactNode } from 'react';

import { Loader } from '../loader';

export type ListWrapperProps<T> = {
  data?: T[];
  isError: boolean;
  error?: string;
  isFirstLoading: boolean;
  isFetchingMore: boolean;
  isRefetching: boolean;
  listItem: (value: T, index: number, array: T[]) => ReactNode | Element;
};

export const ListWrapper = <T,>({
  data,
  isError,
  error,
  isFirstLoading,
  isFetchingMore,
  isRefetching,
  listItem,
}: ListWrapperProps<T>) => {
  if (isFirstLoading) return <Loader />;
  if (isError) return <p>It`s error {error}</p>;
  if (!data) return <p>It`s no data component</p>;

  return (
    <>
      {isRefetching && !isFetchingMore && <Loader />}
      {data.map(listItem)}
      {isFetchingMore && !isRefetching && <Loader />}
    </>
  );
};
