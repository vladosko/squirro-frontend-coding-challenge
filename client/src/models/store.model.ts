import { WebApi } from "./web-api.model";

export type Country = Omit<WebApi.Country, "relationships">;

export type Author = Omit<WebApi.Author, "relationships">;

export type Book = Omit<WebApi.Book, "relationships"> & {
  authors: Author[];
};

export type Store = Omit<WebApi.Store, "relationships"> & {
  countries?: Country[];
  books?: Book[];
};
