import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { Book } from 'types/types';

import { convertDate } from '@utils/convertDate';
import { PATH } from '@utils/path';

type TFiction = {
  book: Book;
};
export const FictionBookItem: FC<TFiction> = ({ book }) => {
  const {
    _id,
    accompanyningDocumentNumber,
    author,
    dateOfArrival,
    disposalAct,
    name,
    price,
    publicationYear,
    inventoryNumber,
    dateOfWithdrawal,
  } = book;

  const memoizedDate = useMemo(
    () => convertDate(dateOfArrival),
    [dateOfArrival],
  );
  const memoizedDateWithdrawal = useMemo(() => {
    if (dateOfWithdrawal) {
      return convertDate(dateOfWithdrawal);
    }
  }, [dateOfWithdrawal]);

  return (
    <div className="mb-2 grid grid-cols-7 place-items-start items-stretch">
      <Link
        to={`${PATH.fiction}/${_id}`}
        className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-1 text-center text-s14 font-medium shadow-md hover:bg-fern-200"
      >
        {memoizedDate} <br /> # {accompanyningDocumentNumber}
      </Link>
      <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-2.5 text-s14 font-medium shadow-md">
        {inventoryNumber}
      </p>
      <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-2.5 text-s14 font-medium shadow-md">
        {author}
      </p>
      <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-2.5 text-s14 font-medium shadow-md">
        {name}
      </p>
      <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-2.5 text-s14 font-medium shadow-md">
        {publicationYear}
      </p>
      <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-2.5 text-s14 font-medium shadow-md">
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
