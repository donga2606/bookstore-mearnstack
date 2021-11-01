import React, { FC } from "react";
import styles from "../../styles/common/Search.module.css";

const Search: FC = () => {
  return (
    <form action="#" className={`flex ${styles["search"]}`}>
      <input
        placeholder="Search"
        className={styles.search__input}
        type="text"
      />
      <button type="submit" className={styles.search__button}>
        <img
          src="/search-red.svg"
          alt=""
          className={styles.search__img}
        />
      </button>
    </form>
  );
};

export default Search;
