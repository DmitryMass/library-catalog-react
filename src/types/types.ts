export interface CustomError extends Error {
  response?: {
    data: {
      error: string;
    };
  };
}

export enum BookType {
  book = 'Підручник',
  fiction = 'Художня література',
}

export type Book = {
  _id: string;
  type: BookType;
  classNumber: string;
  isDeleted: boolean;
  accompanyningDocumentNumber: string;
  dateOfArrival: Date;
  disposalAct: number;
  price: number;
  publicationYear: number;
  author: string;
  name: string;
  inventoryNumber: number;
  dateOfWithdrawal: Date;
};

export type ArchiveBooks = {
  books: Book[];
  total: number;
};

export type BooksSearchParams = {
  searchParams: { page: string; limit: string };
};

export type TLoginFormProps = {
  email: string;
  password: string;
};

export type TBooksResponse = {
  books: Book[];
  total: number;
  totalPrice: number;
};

export type TCreateBook = {
  name: string;
  author: string;
  disposalAct: string;
  accompanyningDocumentNumber: string;
  type: string;
  publicationYear: number;
  price: number;
  classNumber?: { value: string; label: string };
  dateOfWithdrawal?: string;
  inventoryNumber?: number;
  dateOfArrival: string;
};
