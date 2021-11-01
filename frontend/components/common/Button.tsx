import React, { FC } from "react";
import styles from "../../styles/common/Button.module.css";

type ButtonType = {
  handleClick?: (e?: any) => void;
  variant?: string;
  icon?: FC;
  color?: string;
  fullWidth?: boolean;
  hover?: boolean;
  disabled?: boolean;
};

const Button: FC<ButtonType> = ({
  children,
  handleClick,
  variant = "container",
  icon,
  color = "default",
  fullWidth = false,
  hover = true,
  disabled = false,
}) => {
  const className = `${hover && styles.hover} ${styles.button} ${
    styles[color] || ""
  } ${disabled && styles.disabled} ${styles[variant] || ""} ${
    fullWidth ? styles["full-width"] : ""
  } `;
  return (
    <div onClick={handleClick} className={className}>
      {icon && icon}
      {children}
    </div>
  );
};
export default Button;
