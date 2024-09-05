import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { TLoginFormProps } from 'types/types';

import { useAuth } from '@components/providers/useAuth';
import { FormInput } from '@components/ui/FormInput';
import { Loader } from '@components/ui/Loader';

import { logoIcon } from '@utils/icons';

const LoginPage: FC = () => {
  const { mutate, isPending } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormProps>();

  return (
    <section className="flex h-full w-full items-center justify-center">
      <form
        onSubmit={handleSubmit((data) => mutate(data))}
        className="w-full max-w-xl rounded-xl border bg-white p-10 shadow-md"
      >
        <h3 className="mb-2 text-center text-md24 font-medium">
          Ласкаво просимо
        </h3>
        <img className="mx-auto mb-4 size-20" src={logoIcon} alt="логотип" />
        <div className="mb-10">
          <FormInput
            inputModificator="border p-2 rounded-md outline-none placeholder:text-gray-400 placeholder:font-normal text-sm16 font-medium"
            label="Пошта"
            name="email"
            placeholder="Електронна пошта"
            register={register('email', {
              required: `Пошта обов'язкове поле`,
              pattern: {
                value: /^[a-zA-Z0-9@.]+$/,
                message: 'Тільки англійські літери, цифри без пробілів.',
              },
            })}
            type="email"
            errors={errors.email}
            required
          />
          <FormInput
            inputModificator="border p-2 rounded-md outline-none placeholder:text-gray-400 placeholder:font-normal text-sm16 font-medium"
            label="Пароль"
            name="pass"
            placeholder="Пароль"
            register={register('password', {
              required: `Пароль обов'язкове поле`,
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: 'Тільки англійські літери, цифри без пробілів.',
              },
              minLength: { value: 6, message: 'Мінімум 6 символів' },
            })}
            type="password"
            errors={errors.password}
            required
          />
        </div>
        <button
          className="flex w-full items-center justify-center rounded-md bg-fern-500 p-2.5 text-fern-50"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <Loader classModificator="size-6 border-2 border-r-white border-t-white" />
          ) : (
            'Увійти'
          )}
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
