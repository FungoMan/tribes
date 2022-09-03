import React, { ReactNode, useState } from "react";
import ReactSelect, {
  ControlProps,
  components,
  StylesConfig,
} from "react-select";

interface IOption {
  label: string | ReactNode;
  value: string | number;
}

export interface SelectProps {
  id?: string;
  defaultValue?: IOption[] | IOption | string;
  value?: IOption[] | IOption | string;
  options?: IOption[];
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  isMulti?: boolean;
  closeMenuOnSelect?: boolean;
  menuWidth?: string | number;
  onChange?: (value: any) => void;
  onInputChange?: (e: string) => void;
  inputRef?: any;
  selectWidth?: string | number;
  isSearchable?: boolean;
  shouldControlShowValue?: boolean;
  isClearable?: boolean;
  menuFooter?: ReactNode;
}

const SelectField = (props: SelectProps) => {
  const {
    id,
    disabled,
    isMulti = false,
    options,
    menuFooter,
    value,
    placeholder,
    onInputChange,
    onChange,
    defaultValue,
    className,
    closeMenuOnSelect = false,
    menuWidth = "fit-content",
    selectWidth = "fit-content",
    shouldControlShowValue,
    isSearchable = true,
    inputRef,
    isClearable,
  } = props;

  const [selected, setSelected] = useState<
    IOption[] | IOption | string | undefined
  >(value || defaultValue);

  const primary500 = "#E60112";
  const primary20 = "#FEF1F2";

  const customStyles: StylesConfig = {
    container: (styles) => ({
      ...styles,
      width: selectWidth,
      boxSizing: "border-box",
    }),
    control: (styles) => ({
      ...styles,
      cursor: "pointer",
      border: "none",
      boxShadow: "none",
      fontSize: "14px",
      width: "100%",
      minWidth: "max-content",
      minHeight: "min-content",
      backgroundColor: "transparent",
      fontWeight: 300,
    }),
    menu: (styles) => ({
      ...styles,
      width: menuWidth,
    }),
    option: (styles, { isSelected }) => {
      return {
        ...styles,
        width: "100%",
        padding: "10px 20px",
        maxWidth: 400,
        cursor: isSelected ? "default" : "pointer",
        ":active": {
          ...styles[":active"],
          backgroundColor: "#E5E5E5",
        },
        ":hover": {
          ...styles[":hover"],
          backgroundColor: isSelected ? primary500 : primary20,
        },
        backgroundColor: isSelected ? primary500 : "white",
      };
    },
    dropdownIndicator: (styles) => ({ ...styles, padding: 0 }),
    input: (styles) => ({ ...styles, padding: 0, margin: 0, fontWeight: 300 }),
    placeholder: (styles) => ({
      ...styles,
      padding: 0,
      margin: 0,
      width: "fit-content",
      fontWeight: 300,
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: 0,
      width: "max-content",
    }),
    indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
    indicatorsContainer: (styles) => ({
      ...styles,
      alignItems: "center",
    }),
    clearIndicator: (styles) => ({
      ...styles,
      padding: 0,
    }),
  };

  const handleChange = (dropdownValues: any) => {
    onChange?.(dropdownValues);
    setSelected(dropdownValues);
  };

  const SingleValue = (props) => (
    <components.SingleValue {...props}>
      {shouldControlShowValue ? props.data.value : props.data.label}
    </components.SingleValue>
  );

  const MenuList = (props: any) => {
    return (
      <React.Fragment>
        <components.MenuList {...props}>
          {props.children}
          {menuFooter}
        </components.MenuList>
      </React.Fragment>
    );
  };

  return (
    <ReactSelect
      id={id}
      options={options}
      value={options?.find(
        (opt) =>
          opt === selected ||
          opt.value === selected ||
          opt.value === (selected as IOption)?.value
      )}
      placeholder={placeholder}
      isClearable={isClearable}
      closeMenuOnSelect={closeMenuOnSelect || !isMulti}
      isDisabled={disabled}
      styles={customStyles}
      className={className}
      // @ts-ignore
      inputRef={inputRef}
      isMulti={isMulti}
      isSearchable={isSearchable}
      onChange={handleChange}
      components={{ MenuList, SingleValue }}
      onInputChange={onInputChange}
    />
  );
};

export default SelectField;
