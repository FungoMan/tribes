import classNames from "classnames";
import Break from "components/Break/Break";
import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import { Categories } from "enums";
import React, { useEffect, useState } from "react";
import { IOption } from "type";

import styles from "./TagsSelection.module.scss";

interface TagsSelectionProps {
  className?: string;
  category?: Categories;
  onCancel?: () => void;
  onSubmit?: (list: IOption[]) => void;
  options: IOption[];
  selectedList?: IOption[];
}

const TagsSelection = (props: TagsSelectionProps) => {
  const { category, selectedList, options, className, onSubmit, onCancel } =
    props;

  const [localSelectedList, setLocalSelectedList] = useState<IOption[]>(
    selectedList || []
  );

  useEffect(() => {
    setLocalSelectedList(selectedList || []);
  }, [selectedList]);

  const selectedValues = localSelectedList.map((item) => item.value);

  const handleChange = (option: IOption) => {
    if (selectedValues.includes(option.value)) {
      const newList = localSelectedList.filter(
        (item) => item.value !== option.value
      );
      setLocalSelectedList(newList);
    } else {
      if (selectedValues.length === 5) {
        alert("Select max 5");
        return false;
      }
      setLocalSelectedList([...localSelectedList, option]);
    }
  };

  const handleSubmit = () => {
    onSubmit?.(localSelectedList);
  };

  const handleCancel = () => {
    onCancel?.();
    setLocalSelectedList(selectedList || []);
  };

  const wrapperClassName = classNames(styles.tags_selection, className);

  return (
    <React.Fragment>
      <div className={styles.selected_container}>
        {localSelectedList.map((item) => (
          <div key={item.value} className="w-1/2 sm:w-[23%]">
            <div className={styles.tag} onClick={() => handleChange(item)}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
      <Break />
      <div className={wrapperClassName}>
        {options.map((opt) => (
          <Checkbox
            key={opt.value}
            label={opt.label}
            id={opt.value}
            className="w-1/2 sm:w-[23%]"
            checked={selectedValues.includes(opt.value)}
            onChange={() => handleChange(opt)}
          />
        ))}
      </div>
      <Break />
      <div className={styles.action_container}>
        <Button
          variant="secondary-no-outlined"
          text="Cancel"
          width={50}
          size="small"
          onClick={handleCancel}
        />
        <Button
          text="Continue"
          width={280}
          size="small"
          onClick={handleSubmit}
        />
      </div>
    </React.Fragment>
  );
};

export default TagsSelection;
