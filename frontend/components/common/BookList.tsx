import React, { FC, useContext, useEffect } from "react";
import Link from "next/link";
import IProduct from "../../controller/interfaces/book";
import styles from "../../styles/common/BookList.module.css";
import Button from "./Button";
import BookImage from "./BookImage";

type BookListPropsType = {
  title: string;
  avatar: string;
  books: Array<IProduct>;
};

const BookList: FC<BookListPropsType> = ({ title, avatar, books }) => {
  const scrollLeft = (e: any) => {
    const wrapper = e.currentTarget.parentNode;
    const slider = wrapper.querySelector(`.${styles.products__slider}`);
    slider.scrollLeft -= 200;
  };
  const scrollRight = (e: any) => {
    const wrapper = e.currentTarget.parentNode;
    const slider = wrapper.querySelector(`.${styles.products__slider}`);
    slider.scrollLeft += 200;
  };
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.header__left}>
          <a className={styles.avatar}>
            <img src={avatar} alt={title} className={styles.avatar__img} />
          </a>
          <a className={styles.title}>{title}</a>
        </div>
        {/* TODO: create button component */}
        <Button color="primary" fullWidth>
          VIEW LIST ({books.length} BOOKS)
        </Button>
      </div>
      <div className={styles.body}>
        <div className={styles.body__wrapper}>
          <div className={styles.products__slider}>
            {books.map((book) => {
              return (
                <Link href={`/book/${book._id}`} key={book.name}>
                  <a className={styles.product__item}>
                    <BookImage book={book} imgHeight="h-full" />
                  </a>
                </Link>
              );
            })}
            <a className={styles.last}>
              <div className={styles.last__wrapper}>
                <h1 className={styles.last__finish}>
                  VIEW ALL {books.length} BOOKS
                </h1>
              </div>
            </a>
          </div>
          <div className={styles["prev-left"]} onClick={scrollLeft}>
            <img
              src="https://res.cloudinary.com/dnlsengxv/image/upload/v1635840491/bookstore/frontend/ic_fat_arrow_left-78d4b37e9bbb5fee5ded46062f2acb0558ea2c52e03e1d4cf00fe7c668c48dac_ys7knr.svg"
              alt="right-arr"
            />
          </div>
          <div className={styles["prev-right"]} onClick={scrollRight}>
            <img
              src="https://res.cloudinary.com/dnlsengxv/image/upload/v1635840529/bookstore/frontend/ic_fat_arrow_right-8cd117ef71cad1e27c159d775f4d2d0a806c8f173deb5be52b4a6dacc7fdfa0d_mkiq2u.svg"
              alt="left-arr"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookList;
