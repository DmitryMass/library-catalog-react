import { FC } from 'react';

import clsx from 'clsx';

export const Loader: FC<{ classModificator?: string }> = ({
  classModificator,
}) => {
  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-transparent',
        classModificator,
        classModificator
          ? classModificator
          : 'size-8 border-2 border-r-white border-t-white',
      )}
    />
  );
};
