import React, { FC, useContext } from "react";
import { logOut } from "../controller/store/actions";
import { DataContext } from "../controller/store/globalstate";
import styles from "../styles/Footer.module.css";
import Button from "./common/Button";
import Search from "./common/Search";
import { useRouter } from "next/router";

const Footer: FC = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const router = useRouter();
  const handleLogout = function () {
    logOut(dispatch);
  };
  const handleLogin = function () {
    router.push("login");
  };
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <div className={styles.footer__info}>
          <div className={styles.footer__nav}>
            <ul className={styles.nav__list}>
              <li className={styles.list__item}>
                <a>ABOUT</a>
              </li>
              <li className={styles.list__item}>
                <a>SUPPORT/HELP</a>
              </li>
              <li className={styles.list__item}>
                <a>BECOME AN AFFILIATE</a>
              </li>
              <li className={styles.list__item}>
                <a>CONTACT</a>
              </li>
              <li className={styles.list__item}>
                <a>GIFT CARDS</a>
              </li>
              <li className={styles.list__item}>
                <a>TERMS OF USE</a>
              </li>
              <li className={styles.list__item}>
                <a>PRIVACY NOTICE</a>
              </li>
              <li className={styles.list__item}>
                <a>BOOKSHOP FOR AUTHORS</a>
              </li>
              <li className={styles.list__item}>
                <a>BOOKSHOP FOR BOOKSTORES</a>
              </li>
            </ul>
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
          <div className={styles.footer__button}>
            {Object.keys(auth).length !== 0 ? (
              <Button handleClick={handleLogout}>LOG OUT</Button>
            ) : (
              <Button handleClick={handleLogin} color="primary">
                LOG IN
              </Button>
            )}
          </div>
        </div>
        <div className={styles["footer__brand-search"]}>
          <div className={styles.brand}>
            <img
              className={styles.brand__logo}
              src="/logo.svg"
              alt="logo"
            />
            <p className={styles.brand__text}>SUPPORTING LOCAL BOOKSTORES</p>
          </div>
          <div className={styles.search__wrapper}>
            <Search />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
