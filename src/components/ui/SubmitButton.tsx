import { FC, ReactNode } from 'react';

import clsx from 'clsx';

import { Loader } from './Loader';

type TSubmitButtonProps = {
  disabled: boolean;
  classModificator?: string;
  isPending: boolean;
  children: ReactNode;
};

export const SubmitButton: FC<TSubmitButtonProps> = ({
  children,
  disabled,
  isPending,
  classModificator,
}) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={clsx(classModificator)}
    >
      {isPending ? (
        <Loader classModificator="size-6 border-t-2 border-r-2 border-white" />
      ) : (
        children
      )}
    </button>
  );
};
