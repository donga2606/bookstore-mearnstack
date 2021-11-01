import React, { FC } from "react";
import styles from "../../styles/common/BookImage.module.css";
import Link from "next/link";

interface ImageType {
  book: { image: string; name: string; _id: string };
  imgWidth?: string;
  imgHeight?: string;
}

const BookImage: FC<ImageType> = ({
  book,
  imgWidth = "default",
  imgHeight = "default",
}) => {
  const className = `${styles.product__img} ${styles[imgWidth] || ""} ${
    styles[imgHeight] || ""
  }`;
  return (
    <Link href={`/book/${book._id}`} passHref>
      <div className={styles.product}>
        <img className={className} src={book.image} alt={book.name} />
      </div>
    </Link>
  );
};

export default BookImage;
