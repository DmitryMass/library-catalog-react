import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

import EditFictionBookForm from '@components/fictions/EditFictionBookForm';
import { FictionInfo } from '@components/fictions/FictionInfo';
import { BackBtn } from '@components/ui/BackBtn';
import { PageLoading } from '@components/ui/PageLoading';

import { getBook } from '@utils/fetchFn';
import { queryKey } from '@utils/queryKey';

const EachFictionBookPage: FC = () => {
  const { fictionBookPage } = useParams();
  const { showBoundary } = useErrorBoundary();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: [queryKey.fictionBooks, fictionBookPage],
    queryFn: () => getBook(`${fictionBookPage}`),
    enabled: !!fictionBookPage,
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
          <FictionInfo data={data} />
          <EditFictionBookForm book={data} />
        </>
      ) : null}
    </div>
  );
};

export default EachFictionBookPage;
