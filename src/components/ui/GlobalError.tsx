import { FC } from 'react';
import { Link } from 'react-router-dom';

import { PATH } from '@utils/path';

export const GlobalError: FC = () => {
  return (
    <div className="container flex h-screen items-center justify-center">
      <div className="text-l35 max-sm:text-l30 container mx-auto flex h-full flex-col items-center justify-center gap-6 px-2.5 text-center font-bold">
        404 NOT FOUND | В Доступі відмовлено. <br /> Помилка завантаження
        сторінки. <br /> Або сторінку не знайдено.
        <Link
          to={PATH.home}
          className="bg-blueColor text-l30 max-sm:text-md25 mt-10 flex min-h-[76px] w-full max-w-[395px] items-center justify-center rounded-[10px] bg-green-800 p-5 font-medium text-white transition-colors duration-150 hover:bg-green-800 max-sm:p-3.5"
          type="button"
        >
          На головну
        </Link>
      </div>
    </div>
  );
};
