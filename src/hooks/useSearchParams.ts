import { useSearchParams } from 'react-router-dom';

export const usePageParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', `${pageNumber}`);
    setSearchParams(params);
  };

  return {
    handlePageChange,
  };
};
