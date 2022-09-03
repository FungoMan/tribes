import classNames from "classnames";
import Select from "components/Select/Select";
import { ReactNode, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { IOption } from "type";
import SelectField from "./SelectField";
import styles from "./SelectInput.module.scss";

export interface SelectInputProps
  extends Omit<
    React.HTMLProps<HTMLInputElement>,
    "onChange" | "size" | "prefix" | "className" | "value" | "defaultValue"
  > {
  label?: string;
  value?: { select?: string | IOption; input: string };
  defaultValue?: { select?: string | IOption; input: string };
  register?: UseFormRegisterReturn;
  className?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  isClearable?: boolean;
  required?: boolean;
  helperText?: string;
  options?: any[];
  width?: string | number;
  menuWidth?: string | number;
  selectPlaceholder?: string;
  shouldControlShowValue?: boolean;
  selectWidth?: string | number;
  isSearchable?: boolean;
  selectDefaultValue?: { label: any; value: any };
  selectPosition?: "prefix" | "suffix";
  variant?: "filled" | "outlined";
  size?: "small" | "medium" | "large";
  onChange?: ({
    select,
    input,
  }: {
    select: string | IOption;
    input: string;
  }) => void;
}

const SelectInput = (props: SelectInputProps) => {
  const {
    label,
    className,
    prefix,
    suffix,
    required,
    variant = "outlined",
    helperText,
    size = "medium",
    id,
    width,
    form,
    selectPosition = "prefix",
    disabled,
    register,
    menuWidth,
    isClearable,
    options = [],
    selectPlaceholder,
    isSearchable,
    selectDefaultValue,
    selectWidth,
    shouldControlShowValue,
    value,
    defaultValue,
    onChange,
    ...rest
  } = props;
  const selectInputWrapperClassName = classNames(
    className,
    styles.select_input,
    {
      [styles.select_suffix]: selectPosition === "suffix",
      [styles.filled]: variant === "filled",
      [styles.disabled]: disabled,
      [styles.large]: size === "large",
      [styles.small]: size === "small",
      [styles.label]: label,
    }
  );

  const [localValue, setLocalValue] = useState({
    select: value?.select || defaultValue?.select || { label: "", value: "" },
    input: value?.input || defaultValue?.input || "",
  });

  const handleChange = (type, e) => {
    setLocalValue({ ...localValue, [type]: e });
    onChange?.({ ...localValue, [type]: e });
  };

  return (
    <div className={selectInputWrapperClassName} style={{ width }}>
      <div className={styles.container}>
        {label && (
          <label htmlFor={id}>
            {label} {required && <span className={styles.error}>*</span>}
          </label>
        )}
        <div className={styles.content}>
          {prefix && <div>{prefix}</div>}
          {selectPosition === "suffix" && (
            <input
              id={id}
              onChange={(e) => handleChange("input", e.target.value)}
              value={value?.input}
              defaultValue={defaultValue?.input}
              {...rest}
            />
          )}
          <div
            className={classNames({
              [styles.left_border]: selectPosition === "suffix",
              [styles.right_border]: selectPosition === "prefix",
            })}
          >
            <SelectField
              isClearable={isClearable}
              value={value?.select}
              isSearchable={isSearchable}
              selectWidth={selectWidth}
              menuWidth={menuWidth}
              options={options}
              placeholder={selectPlaceholder}
              shouldControlShowValue={shouldControlShowValue}
              onChange={(e) => handleChange("select", e)}
              defaultValue={defaultValue?.select}
            />
          </div>
          {selectPosition === "prefix" && (
            <input
              id={id}
              onChange={(e) => handleChange("input", e.target.value)}
              value={value?.input}
              defaultValue={defaultValue?.input}
              {...rest}
            />
          )}
          {suffix && <div>{suffix}</div>}
        </div>
      </div>
      {helperText && <div>{helperText}</div>}
    </div>
  );
};

export default SelectInput;
