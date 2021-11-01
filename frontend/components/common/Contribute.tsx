import React, { FC } from "react";
import styles from "../../styles/common/Contribute.module.css";

const Contribute: FC = () => {
  return (
    <div className={[styles.contribute, 'sticky'].join(" ")}>
      <a className={styles.contribute__info}>
        <span className={[styles.contribute__number].join(" ")}>
          $14,888,262.76
        </span>{" "}
        raised for local bookstores
      </a>
    </div>
  );
};

export default Contribute;
