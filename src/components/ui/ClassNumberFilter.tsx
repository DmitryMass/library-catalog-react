import { FC } from 'react';

import clsx from 'clsx';

import { Loader } from './Loader';

import { useClassNumberParams } from '@hooks/useClassNumberParams';

import { classOptions } from '@utils/select-option';

export const ClassNumberFilter: FC<{ isFetching: boolean }> = ({
  isFetching,
}) => {
  const { handlePageChange, currentClassNumber } = useClassNumberParams();

  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center justify-start gap-6">
        <h4 className="text-sm18 font-medium">Оберіть класс</h4>
        {isFetching ? (
          <Loader classModificator="size-4 border-r-2 border-t-2 border-black" />
        ) : null}
      </div>
      <div className="flex items-center justify-start gap-4">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange('all');
          }}
          className={clsx(
            currentClassNumber === 'all'
              ? 'bg-green-500 text-opacity-50'
              : 'bg-gray-300 hover:bg-green-400',
            'flex items-center justify-center rounded-md px-4 text-sm18 font-medium transition-colors duration-150',
          )}
        >
          Всі підручники
        </button>
        {classOptions.map((item) => (
          <button
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(item.value);
            }}
            className={clsx(
              currentClassNumber === item.value
                ? 'bg-green-500 text-opacity-50'
                : 'bg-gray-300 hover:bg-green-400',
              'flex items-center justify-center rounded-md px-4 text-sm18 font-medium transition-colors duration-150',
            )}
            key={item.value}
          >
            {item.value}
          </button>
        ))}
      </div>
    </div>
  );
};
