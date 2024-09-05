import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from 'sonner';
import { CustomError, TCreateBook } from 'types/types';

import { FormInput } from '@components/ui/FormInput';
import { SubmitButton } from '@components/ui/SubmitButton';

import $api from '@utils/axiosInstance';
import { BookTypeObject, queryKey } from '@utils/queryKey';

const CreateFictionBook: FC = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCreateBook>();

  const getFormData = async (data: TCreateBook) => {
    await $api.post('catalog/createBook', {
      type: BookTypeObject.fiction,
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
      inventoryNumber: Number(data.inventoryNumber),
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TCreateBook) => {
      return getFormData(data);
    },
    onSuccess: () => {
      toast.success('Книга успішно додана.');
      queryClient.invalidateQueries({
        queryKey: [queryKey.fictionBooks],
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
            <FormInput
              inputModificator="rounded-md py-2.5 px-5 outline-fern-500 shadow-sm text-sm16 text-fern-800 font-medium mt-1"
              label="Інвентарний номер"
              labelClassModificator="flex flex-col mb-4 text-sm16 font-medium"
              name="inventoryNumber"
              placeholder=""
              register={register('inventoryNumber', {
                required: `Номер обов'язкове поле`,
              })}
              type="text"
              errors={errors.inventoryNumber}
              required
            />

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

export default CreateFictionBook;
