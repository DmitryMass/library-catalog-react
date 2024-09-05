import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import clsx from 'clsx';
import { toast } from 'sonner';
import { Book, CustomError } from 'types/types';

import { BackBtn } from '@components/ui/BackBtn';
import { Loader } from '@components/ui/Loader';

import { convertDate } from '@utils/convertDate';
import { handleArchiveBook, handleDeleteBook } from '@utils/fetchFn';
import { PATH } from '@utils/path';
import { queryKey } from '@utils/queryKey';

type TBookItem = {
  book: Book;
  isParamsPage?: boolean;
};
export const ArchiveBookItem: FC<TBookItem> = ({
  book,
  isParamsPage = false,
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
    isDeleted,
    inventoryNumber,
  } = book;

  const memoizedDate = useMemo(() => {
    return convertDate(dateOfArrival);
  }, [dateOfArrival]);

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
        queryKey: [queryKey.archiveBooks, _id],
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

  const { mutate: deleteMutate, isPending: isDeletePending } = useMutation({
    mutationFn: (bookId: string) => {
      return handleDeleteBook(bookId);
    },
    onSuccess: (data) => {
      toast.success(`${data.data.message}`);
      navigate(PATH.archive);
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
    <>
      {isParamsPage && <BackBtn />}
      <div className="mb-2 grid grid-cols-8 place-items-start">
        <Link
          to={`${PATH.archive}/${_id}`}
          className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-1 text-center text-s14 font-medium shadow-md hover:bg-fern-200"
        >
          {memoizedDate} <br /> # {accompanyningDocumentNumber}
        </Link>
        <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-2.5 text-s14 font-medium shadow-md">
          {inventoryNumber ? inventoryNumber : '-'}
        </p>
        <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-1 text-center text-s14 font-medium shadow-md">
          {classNumber ? classNumber : '-'}
        </p>
        <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-1 text-s14 font-medium shadow-md">
          {author}
        </p>
        <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-1 text-s14 font-medium shadow-md">
          {name}
        </p>
        <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-1 text-s14 font-medium shadow-md">
          {publicationYear}
        </p>
        <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-1 text-s14 font-medium shadow-md">
          {price}
        </p>
        <p className="flex min-h-[70px] w-full items-center justify-center border-r bg-white p-1 text-s14 font-medium shadow-md">
          {memoizedDateWithdrawal ? (
            <span>
              {memoizedDateWithdrawal}
              <br />
            </span>
          ) : null}{' '}
          # {disposalAct}
        </p>
      </div>
      {isParamsPage ? (
        <div className="flex items-center gap-4">
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
          <button
            onClick={(e) => {
              e.preventDefault();
              deleteMutate(_id);
            }}
            className={clsx(
              'flex w-[205px] justify-center rounded-md bg-red-700 px-3 py-2 text-white hover:bg-red-600',
            )}
          >
            {isDeletePending ? (
              <Loader classModificator="size-6 border-t-2 border-r-2 border-white" />
            ) : (
              'Видалити повністю'
            )}
          </button>
        </div>
      ) : null}
    </>
  );
};
