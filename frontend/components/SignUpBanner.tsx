import React, { FC } from "react";
import styles from "../styles/SignUpBanner.module.css";
import Button from "./common/Button";
const SignUpBanner: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h2 className={styles.title}>Sign up for our Newsletter</h2>
        <div className={styles.text}>Tell us what books you love.</div>
      </div>
      <div className={styles.wrapper__button}>
        <Button color="secondary">SIGN UP</Button>
      </div>
    </div>
  );
};

export default SignUpBanner;
