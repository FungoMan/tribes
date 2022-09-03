import { useForm, UseFormRegisterReturn } from "react-hook-form";
import styles from "./Checkbox.module.scss";

export interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
  id?: string;
  label?: any;
  className?: string;
  register?: UseFormRegisterReturn;
}

const Checkbox = (props: CheckboxProps) => {
  const { label, id, className, register, ...rest } = props;
  return (
    <div className={`${styles.checkbox} ${className}`}>
      <input id={id || label} type="checkbox" {...register} {...rest} />
      <label htmlFor={id || label}>{label}</label>
    </div>
  );
};

export default Checkbox;
