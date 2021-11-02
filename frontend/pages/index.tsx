import Head from "next/head";
import { FC, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Contribute from "../components/common/Contribute";
import Search from "../components/common/Search";
import BookList from "../components/common/BookList";
import SignUpBanner from "../components/SignUpBanner";
import api from "../controller/api/baseApi";
import IList from "../controller/interfaces/list";

interface HomePropsType {
  lists: Array<IList>;
}

const Home: FC<HomePropsType> = ({ lists }) => {
  return (
    <>
      <Head>
        <meta name="description" content="Welcome to our Bookshop Online!" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <div>
            <section className={`${styles["hero-banner"]}`}>
              <h1 className={`${styles["hero-banner__text"]}`}>
                Support Local Bookstores. Shop Online with Bookshop.
              </h1>
              <div className={`${styles["hero-banner__search"]}`}>
                <Search />
              </div>
            </section>
            <Contribute />
            <section className={styles["book-banner"]}>
              <div className={styles["book-banner__images"]}>
                <a href="" className={styles["book-banner__item"]}>
                  <img
                    src="https://res.cloudinary.com/dnlsengxv/image/upload/v1635840100/bookstore/frontend/Bookshop_FOXANDI_qfwln4.webp"
                    alt="bookshop"
                    className={styles["book-banner__img"]}
                  />
                </a>
                <a href="" className={styles["book-banner__item"]}>
                  <img
                    src="https://res.cloudinary.com/dnlsengxv/image/upload/v1635840100/bookstore/frontend/hero-banner_cmafsb.webp"
                    alt="bookshop"
                    className={styles["book-banner__img"]}
                  />
                </a>
              </div>
            </section>
            <div className={styles.content}>
              {lists.map((list: any) => {
                return (
                  <BookList
                    title={list.title}
                    avatar={list.image}
                    books={list.books}
                    key={list.title}
                  />
                );
              })}
            </div>
            <SignUpBanner />
          </div>
        </main>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const lists = await api.get("list");
  return {
    props: {
      lists: lists?.data.data,
    },
    revalidate: 10,
  };
}
export default Home;
