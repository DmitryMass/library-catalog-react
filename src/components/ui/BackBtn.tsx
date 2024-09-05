import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { backIcon } from '@utils/icons';

export const BackBtn: FC = () => {
  const navigate = useNavigate();
  return (
    <button
      className="dura15 mb-10 flex items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white transition-colors duration-150 hover:bg-green-700"
      type="button"
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      <img className="-ml-2 size-6" src={backIcon} alt="назад" />
      Назад
    </button>
  );
};
