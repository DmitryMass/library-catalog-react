import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { FC } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'react-router-dom';

import { TBooksResponse } from 'types/types';

import { ArchiveBookItem } from '@components/archive/ArchiveBookItem';
import { ArchiveSearchPanel } from '@components/ui/ArchiveSearchPanel';
import { DataList } from '@components/ui/DataList';
import { PageLoading } from '@components/ui/PageLoading';
import { Pagination } from '@components/ui/Pagination';

import { getArchiveBooks } from '@utils/fetchFn';
import { queryKey } from '@utils/queryKey';

const ArchiveBooks: FC = () => {
  const { showBoundary } = useErrorBoundary();
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : 1;

  const { data, isError, error, isLoading } = useQuery<TBooksResponse>({
    queryKey: [queryKey.archiveBooks, currentPage],
    queryFn: () => getArchiveBooks(currentPage),
    initialData: queryClient.getQueryData([
      queryKey.archiveBooks,
      currentPage,
    ]) as TBooksResponse,
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <PageLoading />;
  }

  if (isError) showBoundary(error);

  const pageCount = Math.ceil(data?.total / 10);

  return (
    <div className="container w-full flex-1 py-10">
      <ArchiveSearchPanel />
      <>
        {data?.books.length ? (
          <div>
            <div className="mb-6 grid grid-cols-8 place-items-start">
              <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-1 text-center text-s14 font-medium">
                Дата та № супровідного документу
              </p>
              <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-1 text-s14 font-medium">
                Інвентарний номер
              </p>
              <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-1 text-s14 font-medium">
                Класс
              </p>
              <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-1 text-center text-s14 font-medium">
                Автор книги
              </p>
              <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-1 text-center text-s14 font-medium">
                Назва книги
              </p>
              <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-1 text-center text-s14 font-medium">
                Рік видання
              </p>
              <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-1 text-center text-s14 font-medium">
                Ціна книги (грн)
              </p>
              <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-1 text-s14 font-medium">
                Дата та № акту вибуття
              </p>
            </div>
            <DataList
              data={data.books}
              item={(item) => <ArchiveBookItem key={item._id} book={item} />}
            />
            {pageCount > 1 ? (
              <div className="mt-14">
                <Pagination
                  activePageNumber={currentPage}
                  pagesCount={pageCount}
                />
              </div>
            ) : null}
          </div>
        ) : (
          <div className="flex h-[100px] w-full items-center justify-center rounded-md border border-fern-500 text-center text-md24 font-medium">
            Наразі книг не було додано
          </div>
        )}
      </>
    </div>
  );
};

export default ArchiveBooks;
