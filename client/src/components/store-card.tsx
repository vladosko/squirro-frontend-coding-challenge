import dayjs from "dayjs";
import React from "react";
import { Store } from "../models/store.model";
import "./store-card.css";

export const StoreCard: React.FC<{
  store: Store;
}> = ({ store }) => {
  return (
    <div className="store-card">
      <div className="store-card__main">
        <img
          className="store-card__image"
          src={store.attributes.storeImage}
          alt="Store image"
        />
        <div className="store-card__content">
          <div className="store-card__header">
            <h2 className="store-card__title">{store.attributes.name}</h2>
            <span>{store.attributes.rating}</span>
          </div>
          <div className="store-card__subtitle">Best-selling books</div>
          <div className="books-grid">
            {store.books?.length ? (
              store.books.map((book) => {
                return (
                  <React.Fragment key={book.id}>
                    <div
                      className="books-grid__cell books-grid__book"
                      title={book.attributes.name}
                    >
                      {book.attributes.name}
                    </div>
                    {book.authors?.map((author) => {
                      return (
                        <div
                          className="books-grid__cell books-grid__author"
                          key={author.id}
                        >
                          {author.attributes.fullName}
                        </div>
                      );
                    })}
                  </React.Fragment>
                );
              })
            ) : (
              <div className="books-grid__no-data">No data available</div>
            )}
          </div>
        </div>
      </div>
      <div className="store-card__footer">
        <div>
          <span>
            {dayjs(store.attributes.establishmentDate).format("DD.MM.YYYY")}
          </span>{" "}
          -{" "}
          <a href={store.attributes.website} target="_blank">
            {store.attributes.website}
          </a>
        </div>
        {store.countries?.map((c) => (
          <span className="store-card__country-flag" key={c.id}>
            {c.attributes.flag}
          </span>
        ))}
      </div>
    </div>
  );
};
