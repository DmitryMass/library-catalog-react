import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

type TPaginationBtnProps = {
  variant: 'next' | 'prev';
  activePageNumber: number;
  pagesCount: number;
};

export const PaginationButton: FC<TPaginationBtnProps> = ({
  variant,
  activePageNumber,
  pagesCount,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = () => {
    const params = new URLSearchParams(searchParams);
    setSearchParams(params);
    const newPageNumber =
      variant === 'prev' ? activePageNumber - 1 : activePageNumber + 1;
    params.set('page', `${newPageNumber}`);
    setSearchParams(params);
  };

  return (
    <button
      onClick={handlePageChange}
      disabled={
        (variant === 'prev' && activePageNumber === 1) ||
        (variant === 'next' && activePageNumber === pagesCount)
      }
      className="h-7 w-7 rounded-md bg-fern-200 text-sm18 font-semibold text-fern-700 transition-all duration-75 hover:bg-fern-300"
    >
      {variant === 'prev' ? '<' : '>'}
    </button>
  );
};
