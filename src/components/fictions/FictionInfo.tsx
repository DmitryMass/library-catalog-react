import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC, useMemo } from 'react';

import clsx from 'clsx';
import { toast } from 'sonner';
import { Book, CustomError } from 'types/types';

import { Loader } from '@components/ui/Loader';

import { convertDate } from '@utils/convertDate';
import { handleArchiveBook } from '@utils/fetchFn';
import { queryKey } from '@utils/queryKey';

type TFictionInfoProp = {
  data: Book;
};
export const FictionInfo: FC<TFictionInfoProp> = ({ data }) => {
  const queryClient = useQueryClient();

  const {
    _id,
    accompanyningDocumentNumber,
    author,
    dateOfArrival,
    dateOfWithdrawal,
    disposalAct,
    inventoryNumber,
    name,
    price,
    publicationYear,
    type,
    isDeleted,
  } = data;

  const memoizedDate = useMemo(
    () => convertDate(dateOfArrival),
    [dateOfArrival],
  );
  const memoizedDateWithdrawal = useMemo(() => {
    if (dateOfWithdrawal) {
      return convertDate(dateOfWithdrawal);
    }
  }, [dateOfWithdrawal]);

  const { mutate, isPending } = useMutation({
    mutationFn: (bookId: string) => {
      return handleArchiveBook(bookId);
    },
    onSuccess: (data) => {
      toast.success(`${data.data.message}`);
      queryClient.invalidateQueries({
        queryKey: [queryKey.fictionBooks, _id],
      });
    },
    onError: (error: CustomError) => {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-center text-md24 font-medium"> {type}</h1>
      </div>
      <div className="mb-2 grid grid-cols-7 place-items-start items-stretch">
        <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-1 text-center text-sm16 font-medium shadow-md">
          {memoizedDate} <br /> # {accompanyningDocumentNumber}
        </p>
        <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-2.5 text-sm16 font-medium shadow-md">
          {inventoryNumber}
        </p>
        <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-2.5 text-sm16 font-medium shadow-md">
          {author}
        </p>
        <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-2.5 text-sm16 font-medium shadow-md">
          {name}
        </p>
        <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-2.5 text-sm16 font-medium shadow-md">
          {publicationYear}
        </p>
        <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-2.5 text-sm16 font-medium shadow-md">
          {price}
        </p>
        <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-2.5 text-center text-sm16 font-medium shadow-md">
          {memoizedDateWithdrawal ? (
            <span>
              {memoizedDateWithdrawal}
              <br />
            </span>
          ) : null}{' '}
          # {disposalAct}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          mutate(_id);
        }}
        className={clsx(
          'flex w-[145px] justify-center rounded-md px-3 py-2 text-white',
          isDeleted
            ? 'bg-gray-500 hover:bg-gray-600'
            : 'bg-red-700 hover:bg-red-600',
        )}
      >
        {isPending ? (
          <Loader classModificator="size-6 border-t-2 border-r-2 border-white" />
        ) : isDeleted ? (
          'Убрати з архіву'
        ) : (
          'Додати в архів'
        )}
      </button>
    </div>
  );
};
