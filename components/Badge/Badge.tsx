import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./Badge.module.scss";

export interface BadgeProps {
  selected?: boolean;
  text?: string | ReactNode | ReactNode[];
  value?: string;
  className?: string;
  children?: ReactNode;
  size?: "default" | "small";
  variant?: "default" | "no-outlined";
  onClick?: (e?: string) => void;
}

const Badge = (props: BadgeProps) => {
  const {
    text,
    variant = "default",
    selected,
    value,
    children,
    className,
    size,
    onClick,
  } = props;
  const badgeClassName = classNames(styles.badge, className, {
    [styles.small]: size === "small",
    [styles.selected]: selected,
    [styles.no_outlined]: variant === "no-outlined",
  });
  return (
    <div className={badgeClassName} onClick={() => onClick?.(value)}>
      {text || children}
    </div>
  );
};

export default Badge;
