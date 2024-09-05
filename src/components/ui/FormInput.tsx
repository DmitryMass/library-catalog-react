import { type FC } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import clsx from 'clsx';

type InputProps = {
  label?: string;
  errors?: FieldError;
  register: UseFormRegisterReturn<string>;
  type: string;
  placeholder: string;
  name: string;
  required?: boolean;
  inputModificator?: string;
  labelClassModificator?: string;
};

export const FormInput: FC<InputProps> = ({
  label,
  errors,
  register,
  type,
  placeholder,
  name,
  labelClassModificator,
  inputModificator,
}) => {
  return (
    <div className="flex w-full flex-col">
      {errors && (
        <p className="text-quot text-left text-sm16 font-medium text-red-500 max-mdPlus:text-s14">
          {errors.message}
        </p>
      )}
      <label
        className={clsx('relative block w-full', labelClassModificator)}
        htmlFor={name}
      >
        {label}

        <input
          id={name}
          className={clsx(
            `h-[53px] w-full px-6 py-4 text-md20 max-md:h-[45px]`,
            inputModificator,
          )}
          type={type}
          placeholder={placeholder}
          {...register}
        />
      </label>
    </div>
  );
};
