import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { FC } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'react-router-dom';

import { TBooksResponse } from 'types/types';

import { BookItem } from '@components/books/BookItem';
import { ClassNumberFilter } from '@components/ui/ClassNumberFilter';
import { DataList } from '@components/ui/DataList';
import { PageLoading } from '@components/ui/PageLoading';
import { Pagination } from '@components/ui/Pagination';
import { SearchPanel } from '@components/ui/SearchBar';

import { getBooks } from '@utils/fetchFn';
import { PATH } from '@utils/path';
import { BookTypeObject, queryKey } from '@utils/queryKey';

const HomePage: FC = () => {
  const { showBoundary } = useErrorBoundary();
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : 1;
  const classNumber = searchParams.get('classNumber')
    ? searchParams.get('classNumber')
    : 'all';

  const { data, isError, error, isLoading, isFetching } =
    useQuery<TBooksResponse>({
      queryKey: [queryKey.books, currentPage, classNumber],
      queryFn: () =>
        getBooks(BookTypeObject.book, currentPage, `${classNumber}`),
      initialData: queryClient.getQueryData([
        queryKey.books,
        currentPage,
        classNumber,
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
      <SearchPanel type={BookTypeObject.book} eachBook={PATH.books} />
      <ClassNumberFilter isFetching={isFetching} />
      <>
        {data?.books.length ? (
          <>
            {data.total || data.totalPrice ? (
              <div>
                <div className="mb-3 flex w-full items-center justify-between border-b border-fern-500 pb-2">
                  {data.total ? (
                    <p className="text-sm16 font-normal">
                      Кількість книг:{' '}
                      <span className="ml-1 font-bold text-fern-900">
                        {data.total}
                      </span>
                    </p>
                  ) : null}
                  {data.totalPrice ? (
                    <p className="text-sm16 font-normal">
                      Загальна вартість:{' '}
                      <span className="ml-1 font-bold text-fern-900">
                        {new Intl.NumberFormat('ua', {
                          currency: 'uah',
                        }).format(data.totalPrice)}{' '}
                        грн.
                      </span>
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}
            <div className="mb-6 grid grid-cols-7 place-items-start">
              <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-1 text-center text-s14 font-medium">
                Дата та № супровідного документу
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
              item={(item) => <BookItem key={item._id} book={item} />}
            />
            {pageCount > 1 ? (
              <div className="mt-14">
                <Pagination
                  activePageNumber={currentPage}
                  pagesCount={pageCount}
                />
              </div>
            ) : null}
          </>
        ) : (
          <div className="flex h-[100px] w-full items-center justify-center rounded-md border border-fern-500 text-center text-md24 font-medium">
            Наразі книг не було додано
          </div>
        )}
      </>
    </div>
  );
};

export default HomePage;
