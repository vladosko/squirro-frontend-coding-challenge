export namespace WebApi {
  export type ResourceTypes = "countries" | "authors" | "books" | "stores";

  export type Relationships = Record<
    ResourceTypes,
    { data: Reference<ResourceTypes> | Reference<ResourceTypes>[] }
  >;

  export interface Reference<T extends ResourceTypes = ResourceTypes> {
    type: T;
    id: string;
  }

  export interface Data<T extends ResourceTypes = ResourceTypes>
    extends Partial<
      Record<
        ResourceTypes,
        Reference<ResourceTypes> | Reference<ResourceTypes>[]
      >
    > {
    type: T;
    id: string;
    relationships?: Partial<Relationships>;
    attributes?: Record<string, any>;
  }

  export interface Country extends Data<"countries"> {
    attributes: {
      code: string;
      flag?: string;
    };
  }

  export interface AuthorAttributes {
    fullName: string;
  }

  export interface Author extends Data<"authors"> {
    attributes: AuthorAttributes;
  }

  export interface BookAttributes {
    name: string;
    copiesSold: number;
  }

  export interface Book extends Data<"books"> {
    attributes: BookAttributes;
  }

  export interface StoreAttributes {
    name: string;
    website: string;
    rating: number;
    storeImage: string;
    establishmentDate: string;
  }

  export interface Store extends Data<"stores"> {
    attributes: StoreAttributes;
  }

  export type Included = Store | Book | Country | Author; //Reference<ResourceTypes>;

  export interface PackedJson<D = Data, I = Included> {
    jsonapi: { vesrions: string };
    meta: { total: number };
    data: Reference | Reference[];
    included: I[];
  }
}

export type GetStoresResponse = WebApi.PackedJson<
  WebApi.Store,
  WebApi.Book | WebApi.Country
>;
