import styles from "../../styles/BookDetail.module.css";
import Contribute from "../../components/common/Contribute";
import Button from "../../components/common/Button";
import BookImage from "../../components/common/BookImage";
import api from "../../controller/api/baseApi";
import IBook from "../../controller/interfaces/book";
import IAuthor from "../../controller/interfaces/author";
import { DataContext } from "../../controller/store/globalstate";
import React, { useContext } from "react";
import { addToCart } from "../../controller/store/actions";
import { useRouter } from "next/router";

const BookDetail = ({
  data: { data: book },
}: {
  data: { succes: boolean; data: IBook };
}) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;
  const router = useRouter();
  const handleAddToCart = () => {
    if (Object.keys(auth).length === 0) return router.push("/login");
    addToCart({ book, dispatch, cart, auth });
  };
  return (
    <>
      <Contribute />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.wrapper__image}>
            <BookImage book={book} imgWidth="w-full" />
          </div>
          <div className={styles.content__header}>
            <h1 className={styles.header__title}>{book.name}</h1>
            <div className={styles.header__author}>
              <a className={styles.author__link}>
                {(book.author as IAuthor).name}
              </a>{" "}
              (author)
            </div>
          </div>
          <div className={styles.content__body}>
            <div className={styles.content__section}>
              <h2 className={styles.title}>FORMAT</h2>
              <div className={styles.format__content}>
                <div className={styles.format__content__type}>Paperback</div>
                <div className={styles.format__content__price}>
                  <span className="price__line-through">$19.99</span> $
                  {book.price}
                </div>
              </div>
            </div>
            <div
              className={[styles.content__section, styles.body__button].join(
                " "
              )}
            >
              <Button handleClick={handleAddToCart} color='primary'>Add To Cart</Button>
              <Button>Add To Wishlist</Button>
            </div>
            <div className={styles.content__section}>
              <h2 className={styles.title}>description</h2>
              <div
                className={styles.content_paragraph}
                dangerouslySetInnerHTML={{ __html: book.description }}
              ></div>
            </div>
            <div className={styles.content__section}>
              <h2 className={styles.title}>detail</h2>
              <div className={styles.detail__content}>
                <div className={styles.detail__key}>Price</div>
                <div className={styles.detail__value}>
                  <span className="price__line-through">$19.99</span> $18.39
                </div>
                <div className={styles.detail__key}>Pages</div>
                <div className={styles.detail__value}>272</div>
                <div className={styles.detail__key}>Language</div>
                <div className={styles.detail__value}>English</div>
                <div className={styles.detail__key}>Type</div>
                <div className={styles.detail__value}>Paperback</div>
              </div>
            </div>
            <div className={styles.content__section}>
              <h2 className={styles.title}>About the author</h2>
              <div
                className={styles.content_paragraph}
                dangerouslySetInnerHTML={{
                  __html: (book.author as IAuthor).about,
                }}
              />
            </div>
            {book.reviews.length > 0 && (
              <div className={styles.content__section}>
                <h2 className={styles.title}>Reviews</h2>
                {book.reviews.map((review) => (
                  <div key={review.reviewer}>
                    <div className={styles.content_paragraph}>
                      {`"${review.content}"`}
                    </div>
                    <div className={`${styles.reviews__reviewers} mb-3`}>
                      -- {review.reviewer}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export async function getStaticPaths() {
  const payload = await api.get("book");
  const paths = payload?.data.data.map((book: IBook) => ({
    params: { id: book._id },
  }));

  return { paths, fallback: false };
}
export async function getStaticProps({ params }: { params: { id: string } }) {
  const payload = await api.get(`book/${params.id}`);
  return {
    props: {
      data: payload?.data,
    },
  };
}

export default BookDetail;
