import classNames from "classnames";
import styles from "./Break.module.scss";

interface BreakProps {
  show?: boolean;
  className?: string;
}

const Break = ({ show = true, className }: BreakProps) => {
  const breakClassNames = classNames(styles.break, className, {
    [styles.no_border]: !show,
  });

  return <div className={breakClassNames} />;
};

export default Break;
