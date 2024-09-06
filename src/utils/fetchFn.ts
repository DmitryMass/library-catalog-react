import { Book, TBooksResponse } from 'types/types';

import $api from './axiosInstance';

export const getBooks = async (
  type: string,
  pageNum: number,
  classNumber?: string,
) => {
  const response = await $api.get<TBooksResponse>(`catalog/books`, {
    params: {
      type,
      page: pageNum,
      limit: 10,
      classNumber,
    },
  });
  return response.data;
};
export const getArchiveBooks = async (pageNum: number) => {
  const response = await $api.get<TBooksResponse>(`catalog/archive/books`, {
    params: {
      page: pageNum,
      limit: 10,
    },
  });
  return response.data;
};

export const getBook = async (bookId: string) => {
  const response = await $api.get<Book>(`catalog/books/${bookId}`, {});
  return response.data;
};

export const handleArchiveBook = async (bookId: string) =>
  await $api.put(`catalog/tobasket/${bookId}`, {});

export const handleDeleteBook = async (bookId: string) =>
  await $api.delete(`catalog/${bookId}`);
