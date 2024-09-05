import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

import { ArchiveBookItem } from '@components/archive/ArchiveBookItem';
import { PageLoading } from '@components/ui/PageLoading';

import { getBook } from '@utils/fetchFn';
import { queryKey } from '@utils/queryKey';

const ArchivedBook: FC = () => {
  const { archiveBookPage } = useParams();
  const { showBoundary } = useErrorBoundary();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: [queryKey.archiveBooks, archiveBookPage],
    queryFn: () => getBook(`${archiveBookPage}`),
    enabled: !!archiveBookPage,
  });

  if (isLoading) {
    return <PageLoading />;
  }

  if (isError) showBoundary(error);

  return (
    <div className="container w-full flex-1 py-10">
      {data ? (
        <>
          <ArchiveBookItem book={data} isParamsPage />
        </>
      ) : null}
    </div>
  );
};

export default ArchivedBook;
