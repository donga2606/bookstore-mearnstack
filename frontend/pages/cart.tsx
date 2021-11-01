import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Button from "../components/common/Button";
import { DataContext } from "../controller/store/globalstate";
import styles from "../styles/Cart.module.css";
import Link from "next/link";
import BookImage from "../components/common/BookImage";
import { updateCart } from "../controller/store/actions";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";

const Cart = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;
  const [quantityChanges, setQuantityChanges] = useState({} as any);
  const [isBookInCart, setIsBookInCart] = useState(
    cart.orderBooks.length !== 0
  );
  const router = useRouter();
  useEffect(() => {
    if (cart.orderBooks.length !== 0) {
      setIsBookInCart(true);
    } else {
      setIsBookInCart(false);
    }
  }, [cart]);
  const handleChange = (e: any) => {
    const bookNumber = e.target.value;
    const _id = e.target.parentNode.parentNode.parentNode.id;
    setQuantityChanges((preState: any) => {
      return { ...preState, [_id]: bookNumber };
    });
  };
  const handleUpdate = () => {
    const changesID = Object.keys(quantityChanges);
    const newCart = {
      ...cart,
      orderBooks: cart.orderBooks.map((orderBook) => {
        const quantity = changesID.includes(orderBook.book._id)
          ? quantityChanges[orderBook.book._id]
          : orderBook.quantity;
        return { ...orderBook, quantity };
      }),
    };
    updateCart({ cart: newCart, dispatch, auth });
    setQuantityChanges({});
  };
  const handleDelete = (e: any) => {
    const _id = e.target.parentNode.parentNode.id;

    const newCart = {
      ...cart,
      orderBooks: cart.orderBooks.filter(
        (orderBook) => orderBook.book._id !== _id
      ),
    };
    updateCart({ cart: newCart, dispatch, auth });
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Shopping Cart</h1>
      {isBookInCart ? (
        <>
          <div className={styles.body}>
            <div className={styles.body__checkout}>
              <Button color="primary" fullWidth>
                CHECKOUT (TOTAL: $91.95)
              </Button>
            </div>
            <div className={`${styles.table} py-4`}>
              <Grid
                container
                className={`${styles.table__description} pb-3`}
                spacing={3}
              >
                <Grid item md={2} className={`${styles.description__item}`}>
                  Item
                </Grid>
                <Grid
                  item
                  container
                  md={9}
                  className={`${styles.description__item}`}
                  spacing={2}
                >
                  <Grid item md={8}></Grid>
                  <Grid item md={2} className={`${styles.description__item}`}>
                    Qty
                  </Grid>
                  <Grid item md={2} className={`${styles.description__item}`}>
                    Price
                  </Grid>
                </Grid>
              </Grid>

              {Object.keys(cart).length !== 0 &&
                cart.orderBooks.map((orderBook: any) => {
                  return (
                    <div key={orderBook.book.name}>
                      <hr className={styles.split} />
                      <Grid
                        container
                        className={`${styles.table__data}`}
                        id={orderBook.book._id}
                        spacing={4}
                      >
                        <Grid
                          item
                          className={styles.data__image}
                          xs={4}
                          sm={3}
                          md={2}
                        >
                          <BookImage book={orderBook.book} imgWidth="w-full" />
                        </Grid>
                        <Grid container item xs={6} sm={6} md={9} spacing={2}>
                          <Grid
                            item
                            className={styles.data__info}
                            xs={12}
                            md={8}
                          >
                            <div className={styles.info__name}>
                              <Link href={`/book/${orderBook.book._id}`}>
                                {orderBook.book.name}
                              </Link>
                            </div>
                          </Grid>
                          <Grid item xs={12} md={2}>
                            <input
                              className={styles.data__number}
                              type="number"
                              defaultValue={orderBook.quantity}
                              min={0}
                              name="quantity"
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid
                            item
                            className={styles.data__price}
                            xs={12}
                            md={2}
                          >
                            {orderBook.book.price}
                          </Grid>
                        </Grid>
                        <Grid item xs={2} sm={2} md={1}>
                          <i
                            className={`far fa-trash-alt ${styles.data__trash}`}
                            onClick={handleDelete}
                          ></i>
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.total}>
              Total:{" "}
              <span className={styles.total_money}>${cart.totalCash}</span>
            </div>
          </div>
          <div className={`grid sticky ${styles.sticky__button}`}>
            <div></div>
            <div></div>
            <Button
              handleClick={handleUpdate}
              color="secondary"
              variant="outline"
              disabled={Object.keys(quantityChanges).length === 0}
            >
              Update
            </Button>
            <Button color="primary">Checkout</Button>
          </div>
        </>
      ) : (
        <div className={styles.no_book}>
          <div>Your cart is empty</div>
          <Link href="/">
            <a>
              <Button color="primary" variant="outline">
                Continue shopping
              </Button>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
