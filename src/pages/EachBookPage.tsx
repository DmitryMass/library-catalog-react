import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

import EditBookForm from './EditBookForm';

import { BookInfo } from '@components/books/BookInfo';
import { BackBtn } from '@components/ui/BackBtn';
import { PageLoading } from '@components/ui/PageLoading';

import { getBook } from '@utils/fetchFn';
import { queryKey } from '@utils/queryKey';

const EachBookPage: FC = () => {
  const { bookPage } = useParams();
  const { showBoundary } = useErrorBoundary();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: [queryKey.books, bookPage],
    queryFn: () => getBook(`${bookPage}`),
    enabled: !!bookPage,
  });

  if (isLoading) {
    return <PageLoading />;
  }

  if (isError) showBoundary(error);

  return (
    <div className="container w-full flex-1 py-10">
      <BackBtn />
      {data ? (
        <>
          <BookInfo data={data} /> <EditBookForm book={data} />
        </>
      ) : null}
    </div>
  );
};

export default EachBookPage;
