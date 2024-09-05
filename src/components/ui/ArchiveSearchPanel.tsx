import { type FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { toast } from 'sonner';
import { Book } from 'types/types';

import { useDebounceValue } from '@hooks/useDebouncedValue';

import $api from '@utils/axiosInstance';
import { searchIcon } from '@utils/icons';
import { PATH } from '@utils/path';

const foundedBooksCache: Record<string, Book[]> = {
  '': [],
};

export const ArchiveSearchPanel: FC = () => {
  const [query, setQuery] = useState('');
  const [foundBook, setFoundBook] = useState<Book[]>([]);
  const debauncedString = useDebounceValue(query, 500);

  useEffect(() => {
    const controller = new AbortController();
    const searchHandler = async () => {
      if (debauncedString.trim()) {
        if (!foundedBooksCache[debauncedString]) {
          try {
            const res = await $api.get(`catalog/search/archive/books/data`, {
              params: { q: debauncedString.trim() },
              signal: controller.signal,
            });
            const results = res.data;
            foundedBooksCache[debauncedString] = results;
            setFoundBook(results);
          } catch (err: any) {
            toast.error(
              `Використовуйте тільки Українські літери. ${err.response.data.error}. `,
            );
          }
        } else {
          setFoundBook(foundedBooksCache[debauncedString]);
        }
      } else {
        setFoundBook(foundedBooksCache['']);
      }
    };
    searchHandler();
    return () => controller.abort();
  }, [debauncedString]);

  const hanldeCloseSearchPanel = () => {
    setQuery('');
  };

  return (
    <div className="mx-auto mb-14 mt-5 flex max-w-xl flex-col-reverse items-center justify-center">
      <div
        className={clsx(
          'relative flex w-full justify-center transition-all duration-300',
        )}
      >
        <label
          className="realtive flex w-full flex-col gap-1 text-s14 font-medium"
          htmlFor="search"
        >
          <img
            className="absolute left-2.5 top-1.5 size-7"
            src={searchIcon}
            alt="search"
          />
          <input
            className="text-sm14 w-full rounded-md border border-fern-600 bg-white p-2.5 px-[45px] font-medium text-fern-800 outline-none placeholder:text-fern-800 placeholder:text-opacity-90"
            id="search"
            type="text"
            placeholder="Пошукова панель"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={hanldeCloseSearchPanel}
          />
        </label>
        {foundBook.length > 0 && (
          <div className="absolute left-0 top-[50px] z-10 block max-h-[250px] w-full overflow-auto rounded-md border-[1px] bg-white p-2 shadow-md">
            {foundBook.map((book) => (
              <Link
                key={book._id}
                className="bg-thinBlue flex flex-col gap-0.5 border-b px-2 py-1 text-s14 text-black hover:bg-fern-100"
                to={`${PATH.archive}/${book._id}`}
              >
                <span className="text-s14">{book.author}</span>{' '}
                <span className="text-sm18 font-medium">{book.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
