import { FC, Fragment } from 'react';

import { PaginationButton } from './PaginationButton';

import { usePageParams } from '@hooks/useSearchParams';

import { getPaginationTemplate } from '@utils/getPaginationTemplate';

type TPaginationProps = {
  activePageNumber: number;
  pagesCount: number;
};

export const Pagination: FC<TPaginationProps> = ({
  activePageNumber,
  pagesCount,
}) => {
  const { handlePageChange } = usePageParams();
  const paginationTemplate = getPaginationTemplate(
    activePageNumber,
    pagesCount,
  );

  return (
    <div className="flex justify-center gap-3">
      {activePageNumber !== 1 ? (
        <PaginationButton
          variant="prev"
          activePageNumber={activePageNumber}
          pagesCount={pagesCount}
        />
      ) : null}
      <div className="text-parM flex items-center justify-center gap-1">
        {paginationTemplate.map((item, i) => (
          <Fragment key={i}>
            {item === '...' ? (
              <p className="px-1 font-bold">...</p>
            ) : (
              <button
                onClick={
                  item === '...'
                    ? () => {}
                    : () => handlePageChange(item as number)
                }
                disabled={activePageNumber === item}
                className="h-7 w-7 rounded-md bg-fern-200 transition-all duration-75 hover:bg-fern-400 hover:text-fern-50 disabled:bg-fern-400 disabled:text-fern-50"
              >
                {item}
              </button>
            )}
          </Fragment>
        ))}
      </div>
      {activePageNumber !== pagesCount ? (
        <PaginationButton
          variant="next"
          activePageNumber={activePageNumber}
          pagesCount={pagesCount}
        />
      ) : null}
    </div>
  );
};
