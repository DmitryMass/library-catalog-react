import { format } from 'date-fns';

export const convertDate = (date: Date) => {
  const originalDate = new Date(date);
  return format(originalDate, 'dd.MM.yyyy');
};

export const convertInputDate = (date: Date) => {
  const originalDate = new Date(date);
  const year = originalDate.getFullYear();
  const month = String(originalDate.getMonth() + 1).padStart(2, '0');
  const day = String(originalDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
