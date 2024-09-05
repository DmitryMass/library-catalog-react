import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { Book } from 'types/types';

import { convertDate } from '@utils/convertDate';
import { PATH } from '@utils/path';

type TBookItem = {
  book: Book;
};
export const BookItem: FC<TBookItem> = ({ book }) => {
  const {
    _id,
    accompanyningDocumentNumber,
    author,
    classNumber,
    dateOfArrival,
    disposalAct,
    name,
    price,
    publicationYear,
    dateOfWithdrawal,
  } = book;

  const memoizedDate = useMemo(() => {
    return convertDate(dateOfArrival);
  }, [dateOfArrival]);

  const memoizedDateWithdrawal = useMemo(() => {
    if (dateOfWithdrawal) {
      return convertDate(dateOfWithdrawal);
    }
  }, [dateOfWithdrawal]);

  return (
    <div className="mb-2 grid grid-cols-7 place-items-stretch">
      <Link
        to={`${PATH.books}/${_id}`}
        className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-1 text-center text-s14 font-medium shadow-md hover:bg-fern-200"
      >
        {memoizedDate} <br /> # {accompanyningDocumentNumber}
      </Link>
      <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-1 text-center text-s14 font-medium shadow-md">
        {classNumber ? classNumber : '-'}
      </p>
      <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-1 text-s14 font-medium shadow-md">
        {author}
      </p>
      <p className="flex min-h-[70px] w-full items-center justify-center text-balance border-r bg-white p-1 px-2.5 text-center text-s14 font-medium shadow-md">
        {name}
      </p>
      <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-1 text-s14 font-medium shadow-md">
        {publicationYear}
      </p>
      <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-1 text-s14 font-medium shadow-md">
        {price}
      </p>
      <p
        className={clsx(
          'flex min-h-[70px] w-full items-center justify-center border-r p-1 text-s14 font-medium shadow-md',
          disposalAct ? 'bg-red-200' : 'bg-white',
        )}
      >
        {memoizedDateWithdrawal ? (
          <span>
            {memoizedDateWithdrawal}
            <br />
          </span>
        ) : null}{' '}
        # {disposalAct}
      </p>
    </div>
  );
};
