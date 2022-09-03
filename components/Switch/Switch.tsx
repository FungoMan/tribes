import styles from "./Switch.module.scss";

interface SwitchProps {
  onClick?: () => void;
  isActive?:boolean;
}

const Switch = (props: SwitchProps) => {
  const {onClick, isActive} = props

  return (
    <label className={`${styles.switch} ${isActive === true && styles.active }`} onClick={onClick}>
      {/* <input type="checkbox" /> */}
      <span className={`${styles.slider} ${styles.round}`} />
    </label>
  );
};

export default Switch;
