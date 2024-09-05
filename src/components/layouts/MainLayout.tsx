import { FC, ReactNode, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import clsx from 'clsx';

import { useAuth } from '@components/providers/useAuth';

import {
  archiveIcon,
  bookIcon,
  createIcon,
  fictionIcon,
  logoIcon,
} from '@utils/icons';
import { PATH } from '@utils/path';

export const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const { bookPage, fictionBookPage, archiveBookPage } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <main className="relative flex items-start gap-3">
      <aside className="sticky left-0 top-0 flex h-screen w-full max-w-aside flex-col justify-between bg-fern-900 px-2.5 py-5">
        <div>
          <Link
            to={PATH.home}
            className="mb-14 ml-1 flex items-center gap-4 text-md20 text-fern-50"
          >
            <img className="size-10" src={logoIcon} alt="catalog" />
            Мій каталог
          </Link>
          ,
          <nav>
            <div className="mb-10 flex flex-col gap-2">
              <Link
                className={clsx(
                  'flex items-center gap-3 rounded-md p-2.5 text-sm18 text-fern-50',
                  location.pathname === PATH.home || bookPage
                    ? 'bg-fern-400'
                    : 'hover:bg-fern-600',
                )}
                to={PATH.home}
              >
                <img className="size-7" src={bookIcon} alt="підручник" />
                Підручники
              </Link>
              <Link
                className={clsx(
                  'flex items-center gap-3 rounded-md p-2.5 text-sm18 text-fern-50',
                  location.pathname === PATH.fiction || fictionBookPage
                    ? 'bg-fern-400'
                    : 'hover:bg-fern-600',
                )}
                to={PATH.fiction}
              >
                <img className="size-7" src={fictionIcon} alt="художка" />
                Xудожня література
              </Link>
            </div>
            <div className="mb-10 flex flex-col gap-2">
              <Link
                className={clsx(
                  'flex items-center gap-3 rounded-md p-2.5 text-sm18 text-fern-50',
                  location.pathname === PATH.addBook
                    ? 'bg-fern-400'
                    : 'hover:bg-fern-600',
                )}
                to={PATH.addBook}
              >
                <img className="size-7" src={createIcon} alt="створити" />
                Підручник
              </Link>
              <Link
                className={clsx(
                  'flex items-center gap-3 rounded-md p-2.5 text-sm18 text-fern-50',
                  location.pathname === PATH.addFiction
                    ? 'bg-fern-400'
                    : 'hover:bg-fern-600',
                )}
                to={PATH.addFiction}
              >
                <img className="size-7" src={createIcon} alt="створити" />
                Xудожню літературу
              </Link>
            </div>
          </nav>
        </div>
        <div>
          <Link
            className={clsx(
              'mb-12 flex items-center gap-3 rounded-md p-2.5 text-sm18 text-fern-50',
              location.pathname === PATH.archive || archiveBookPage
                ? 'bg-fern-400'
                : 'hover:bg-fern-600',
            )}
            to={PATH.archive}
          >
            <img className="size-7" src={archiveIcon} alt="архівувати" />
            Архівовані книги
          </Link>
          <button
            className="mx-auto w-full rounded-md bg-fern-500 p-2.5 text-fern-50 transition-all duration-200 hover:bg-fern-400"
            type="button"
            onClick={logout}
          >
            Вихід
          </button>
        </div>
      </aside>

      {children}
    </main>
  );
};
