import classNames from "classnames";
import Icon from "components/Icon/Icon";
import { format } from "date-fns";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./DatePicker.module.scss";
interface DatePickerProps {
  value?: Date;
  size?: string;
  label?: string;
  prefixIcon?: boolean;
  autoFocus?: boolean;
  suffixIcon?: boolean;
  placeholder?: string;
  maxDate?: Date;
  minDate?: Date;
  onChange?: (e: Date) => void;
  name?: string;
}

const DatePicker = (props: DatePickerProps) => {
  const {
    value,
    prefixIcon,
    suffixIcon,
    placeholder,
    maxDate = new Date(),
    minDate,
    autoFocus,
    size,
    label,
    onChange,
  } = props;
  const [localValue, setLocalValue] = useState(value);
  const datepickerClassNames = classNames(styles.date_picker_container, {
    [styles.small]: size === "small",
    [styles.large]: size === "large",
    [styles.label]: label,
  });
  const handleChange = (e) => {
    setLocalValue(e);
    onChange?.(e);
  };
  return (
    <div className={datepickerClassNames}>
      {label && <label>{label}</label>}
      <div className={styles.input_field}>
        {prefixIcon && <Icon icon="calendar-2" color="#7F859F" />}
        <ReactDatePicker
          autoFocus={autoFocus}
          className={styles.date_picker}
          dateFormat="dd/MM/yyyy"
          selected={localValue}
          onChange={handleChange}
          showPopperArrow={false}
          calendarClassName={styles.calendar}
          placeholderText={placeholder}
          popperPlacement="bottom"
          maxDate={maxDate}
          minDate={minDate}
        />
        {suffixIcon && <Icon icon="calendar-2" color="#7F859F" />}
      </div>
    </div>
  );
};

export default DatePicker;
