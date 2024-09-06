import { useSearchParams } from 'react-router-dom';

export const useClassNumberParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const clNum = searchParams.get('classNumber');

  const currentClassNumber = clNum ? clNum : 'all';
  const handlePageChange = (classNumber: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('classNumber', classNumber);
    setSearchParams(params);
  };

  return {
    handlePageChange,
    currentClassNumber,
  };
};
