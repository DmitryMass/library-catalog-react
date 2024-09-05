import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

import { toast } from 'sonner';
import { CustomError, TCreateBook } from 'types/types';

import { FormInput } from '@components/ui/FormInput';
import { SubmitButton } from '@components/ui/SubmitButton';

import $api from '@utils/axiosInstance';
import { BookTypeObject, queryKey } from '@utils/queryKey';
import { classOptions } from '@utils/select-option';

const CreateBook: FC = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TCreateBook>();

  const getFormData = async (data: TCreateBook) => {
    await $api.post('catalog/createBook', {
      type: BookTypeObject.book,
      price: Number(data.price),
      publicationYear: Number(data.publicationYear),
      name: data.name,
      accompanyningDocumentNumber: data.accompanyningDocumentNumber,
      disposalAct: data.disposalAct,
      dateOfArrival: new Date(data.dateOfArrival),
      dateOfWithdrawal: data.dateOfWithdrawal
        ? new Date(data.dateOfWithdrawal)
        : '',
      author: data.author,
      classNumber: Number(data.classNumber?.value),
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TCreateBook) => {
      return getFormData(data);
    },
    onSuccess: () => {
      toast.success('Книга успішно додана.');
      queryClient.invalidateQueries({
        queryKey: [queryKey.books],
      });
      reset();
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
    <div className="container mt-5 w-full pb-10">
      <h1 className="mb-10 text-md24 font-medium">Додати новий підручник</h1>
      <form onSubmit={handleSubmit((data) => mutate(data))}>
        <div className="mb-2 flex items-start gap-10">
          <div className="w-full">
            <FormInput
              inputModificator="rounded-md py-2.5 px-5 outline-fern-500 shadow-sm text-sm16 text-fern-800 font-medium mt-1"
              label="Дата прибуття"
              labelClassModificator="flex flex-col mb-4 text-sm16 font-medium"
              name="dateOfArrival"
              placeholder=""
              register={register('dateOfArrival', {
                required: `Дата обов'язкове поле`,
              })}
              type="date"
              errors={errors.dateOfArrival}
              required
            />
            <FormInput
              inputModificator="rounded-md py-2.5 px-5 outline-fern-500 shadow-sm text-sm16 text-fern-800 font-medium mt-1"
              label="Номер супровідного документу"
              labelClassModificator="flex flex-col mb-4 text-sm16 font-medium"
              name="accompanyningDocumentNumber"
              placeholder=""
              register={register('accompanyningDocumentNumber', {
                required: `Номер обов'язкове поле`,
              })}
              type="text"
              errors={errors.accompanyningDocumentNumber}
              required
            />

            <div>
              {errors.classNumber && (
                <p className="text-red-600">{errors.classNumber.message}</p>
              )}
              <span className="mb-4 text-sm16 font-medium">
                <span className="text-sm16 text-red-600">*</span> Класс №
              </span>
              <Controller
                name="classNumber"
                control={control}
                rules={{ required: `Класс № обов'язкове поле` }}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="mb-4 mt-1 border-none outline-none"
                    styles={{
                      placeholder: (base) => ({ ...base, color: '#D3D3D3' }),
                      control: (base) => ({
                        ...base,
                        border: 'none',
                        boxShadow: 'none',
                        ':focus-within': { boxShadow: '0 0 0 2px #47a058' },
                        padding: '4px',
                      }),
                    }}
                    options={classOptions}
                    placeholder={'Оберіть класс №'}
                  />
                )}
              />
            </div>
            <FormInput
              placeholder=""
              inputModificator="rounded-md py-2.5 px-5 outline-fern-500 shadow-sm text-sm16 text-fern-800 font-medium mt-1"
              label="Автор"
              labelClassModificator="flex flex-col mb-4 text-sm16 font-medium"
              name="author"
              register={register('author', {
                required: `Автор обов'язкове поле`,
              })}
              type="text"
              errors={errors.author}
              required
            />

            <FormInput
              placeholder=""
              inputModificator="rounded-md py-2.5 px-5 outline-fern-500 shadow-sm text-sm16 text-fern-800 font-medium mt-1"
              label="Назва книги"
              labelClassModificator="flex flex-col mb-4 text-sm16 font-medium"
              name="name"
              register={register('name', {
                required: `Автор обов'язкове поле`,
              })}
              type="text"
              errors={errors.name}
              required
            />
          </div>
          <div className="w-full">
            <FormInput
              placeholder=""
              inputModificator="rounded-md py-2.5 px-5 outline-fern-500 shadow-sm text-sm16 text-fern-800 font-medium mt-1"
              label="Рік публікації"
              labelClassModificator="flex flex-col mb-4 text-sm16 font-medium"
              name="publicationYear"
              register={register('publicationYear', {
                required: `Рік обов'язкове поле`,
              })}
              type="number"
              errors={errors.publicationYear}
              required
            />
            <FormInput
              placeholder=""
              inputModificator="rounded-md py-2.5 px-5 outline-fern-500 shadow-sm text-sm16 text-fern-800 font-medium mt-1"
              label="Ціна книги"
              labelClassModificator="flex flex-col mb-4 text-sm16 font-medium"
              name="price"
              register={register('price', {
                required: `Ціна обов'язкове поле`,
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: `Введіть коректну ціну.`,
                },
              })}
              type="text"
              errors={errors.price}
              required
            />
            <FormInput
              placeholder=""
              inputModificator="rounded-md py-2.5 px-5 outline-fern-500 shadow-sm text-sm16 text-fern-800 font-medium mt-1"
              label="Дата вибуття"
              labelClassModificator="flex flex-col mb-4 text-sm16 font-medium"
              name="dateOfWithdrawal"
              register={register('dateOfWithdrawal')}
              type="date"
              errors={errors.dateOfWithdrawal}
            />
            <FormInput
              placeholder=""
              inputModificator="rounded-md py-2.5 px-5 outline-fern-500 shadow-sm text-sm16 text-fern-800 font-medium mt-1"
              label="Номер акту вибуття"
              labelClassModificator="flex flex-col mb-4 text-sm16 font-medium"
              name="disposalAct"
              register={register('disposalAct')}
              type="text"
              errors={errors.disposalAct}
            />
          </div>
        </div>
        <SubmitButton
          disabled={isPending}
          isPending={isPending}
          classModificator="bg-fern-700 hover:bg-fern-600 text-white p-2.5 w-[200px] text-sm16 rounded-md flex justify-center items-center"
        >
          Додати
        </SubmitButton>
      </form>
    </div>
  );
};

export default CreateBook;
