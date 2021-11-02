import React, { FC, useContext, useEffect, useState } from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { DataContext } from "../controller/store/globalstate";
import categories from "../controller/api/categoriesApi";
import Button from "../components/common/Button";
import { logOut } from "../controller/store/actions";

const Header: FC = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;

  const [openMenu, setOpenMenu] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const handleMobileButton = () => {
    if (!openMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    setOpenMenu(!openMenu);
  };

  const handleLogout = function () {
    logOut(dispatch);
  };
  useEffect(() => {
    const isAuth = Object.keys(auth).length !== 0;
    console.log(isAuth);
    setIsLogin(isAuth);
  }, [auth]);
  return (
    <nav className={`sticky ${styles.nav} }`}>
      <div className={`${styles.nav__wrapper}`}>
        <div className={`${styles.nav__left} flex-1`}>
          <Link href="/">
            <a className={`${styles.nav__brand}`}>
              <img
                className={styles.brand__img}
                src="https://res.cloudinary.com/dnlsengxv/image/upload/v1635840099/bookstore/frontend/logo_pdaoao.svg"
                alt="bookshop logo"
              />
            </a>
          </Link>
          <div className={`${styles.search__wrapper} flex-1`}>
            <form className={styles.search}>
              <input
                type="text"
                className={styles.search__input}
                placeholder="Search"
              />
              <button className={styles.search__button} type="button">
                <img
                  src="https://res.cloudinary.com/dnlsengxv/image/upload/v1635840101/bookstore/frontend/search-red_v96ucx.svg"
                  alt="search"
                  className={styles.search__img}
                />
              </button>
            </form>
          </div>
          <div className={styles.nav__social}>
            <a href="#" className={`${styles["nav__social-icon"]}`}>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className={`${styles["nav__social-icon"]}`}>
              <i className="fab fa-facebook mx-3"></i>
            </a>
            <a href="#" className={`${styles["nav__social-icon"]}`}>
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <a href="#" className={`${styles.nav__center}`}>
          FIND A BOOKSTORE
        </a>
        <ul className={`${styles.nav__right}`}>
          <li className={`${styles["nav__right-item"]} ${styles.nav__browse}`}>
            <a href="">BROWSE</a>
          </li>
          <li className={`${styles["nav__right-item"]} pos_relative `}>
            <Link href="/cart">
              <a className="cursor-pointer">
                <img src="https://res.cloudinary.com/dnlsengxv/image/upload/v1635840097/bookstore/frontend/cart_szdgwr.svg" alt="Cart" />
                {cart.orderBooks.length !== 0 && (
                  <div className={styles.cart__number}>
                    {cart.orderBooks.length}
                  </div>
                )}
              </a>
            </Link>
          </li>
          <li
            className={`${styles["nav__right-item"]} pos_relative cursor-pointer `}
          >
            <img src="https://res.cloudinary.com/dnlsengxv/image/upload/v1635840103/bookstore/frontend/user_d7tupj.svg" alt="User" />
            {!isLogin ? (
              <div className={`${styles["drop-down"]} cursor-pointer`}>
                <Link href="/login">
                  <a>LOG IN</a>
                </Link>
              </div>
            ) : (
              <div
                className={`${styles["drop-down"]} cursor-pointer`}
                onClick={handleLogout}
              >
                LOG OUT
              </div>
            )}
          </li>
          <li
            className={`${styles["nav__right-item"]} ${styles["large-text"]}`}
          >
            <a>US</a>
          </li>
          <li
            className={`${styles["nav__right-item"]} ${styles["mobile-off-btn"]}`}
            onClick={handleMobileButton}
          >
            <i className={`fas fa-bars ${styles["big-icon"]}`}></i>
          </li>
        </ul>
      </div>
      <div
        className={`${styles["mobile-menu"]} ${
          openMenu && styles["mobile-open"]
        }`}
      >
        <div className={styles.menu__wrapper}>
          <div className={styles.btn__wrapper}>
            <Button color="secondary" variant="outline" hover={false} fullWidth>
              Find a Bookstore
            </Button>
            <Button color="secondary" variant="outline" hover={false} fullWidth>
              View Cart
            </Button>
          </div>
          <h1 className={styles.mobile__title}>Browse Categories</h1>
          {categories.map((category__item, i) => (
            <a className={styles.category__item} key={i}>
              {category__item}
            </a>
          ))}
        </div>
      </div>
      <i
        className={`fas fa-times ${styles["mobile-on-btn"]} ${
          openMenu && styles["mobile-open"]
        }`}
        onClick={handleMobileButton}
      ></i>
    </nav>
  );
};

export default Header;
