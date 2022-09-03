import Break from "components/Break/Break";
import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import SelectInput from "components/SelectInput/SelectInput";
import Upload from "components/Upload/Upload";
import { currencyOptions, discountTypeOptions } from "constant";
import { ListingHomePageScreens } from "enums";
import { get } from "lodash";
import { useRouter } from "next/router";
import { useState } from "react";
import { getIndex, randomId } from "utils";

import styles from "./AddItems.module.scss";

interface AddItemsProps {
  isEdit?: boolean;
  isPaid?: boolean;
  multiple?: boolean;
  itemList?: { [key: string]: any }[];
  placeholders: string[];
  onSubmit: (list: { [key: string]: any }[]) => void;
  onCancel: () => void;
}

const AddItems = (props: AddItemsProps) => {
  const {
    isEdit,
    itemList = [],
    isPaid,
    multiple,
    placeholders,
    onCancel,
    onSubmit,
  } = props;
  const [localItemList, setLocalItemList] = useState(itemList || []);
  const router = useRouter();

  const handleRemoveItem = (id: number) => {
    const newArray = [...localItemList].filter((item) => item.id !== id);
    setLocalItemList(newArray);
  };

  const handleChangeItem = (
    id: number,
    type: string,
    value: string | number | string[] | { [key: string]: any }
  ) => {
    const index = getIndex(id, localItemList);
    const newArray = [...localItemList];
    if (isEdit) {
      newArray[index][type] = value;
      newArray[index].isEdited = true;
    } else {
      newArray[index][type] = value;
    }
    setLocalItemList(newArray);
  };

  const handleAddItem = () => {
    setLocalItemList([...localItemList, { id: randomId(), isNew: true }]);
  };

  const AddItemButton = () => (
    <Button
      prefix={<Icon icon="plus" />}
      width="max-content"
      variant="secondary"
      text="Add another"
      disabled={!isPaid && get(localItemList, "length") > 2}
      size="small"
      onClick={handleAddItem}
    />
  );

  const CancelButton = () => (
    <Button
      variant="secondary-no-outlined"
      text="Cancel"
      width={50}
      size="small"
      onClick={() => {
        setLocalItemList(itemList);
        onCancel();
      }}
    />
  );

  return (
    <div>
      <Break />
      {Array.isArray(localItemList) && localItemList.length
        ? localItemList.map((item) => (
            <div key={item.id} className={styles.add_items_container}>
              <div className={styles.break} />
              <div className={styles.header}>
                <p className="text-left">{isEdit ? "Edit" : "Add"} images</p>
                {multiple && (
                  <div
                    className={styles.close}
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Icon icon="cancel" />
                  </div>
                )}
              </div>
              <Upload
                isPaid={isPaid}
                multiple
                fileList={item.images || []}
                centerIcon={<Icon icon="plus" size={20} />}
                onChange={(e) => handleChangeItem(item.id, "images", e)}
              />
              <Input
                value={item.name}
                placeholder={placeholders[0]}
                onChange={(e: any) =>
                  handleChangeItem(item.id, "name", e.target.value)
                }
              />
              <Input
                value={item.description}
                placeholder={placeholders[1]}
                onChange={(e: any) =>
                  handleChangeItem(item.id, "description", e.target.value)
                }
              />
              <div className="flex gap-3">
                <SelectInput
                  width="50%"
                  type="number"
                  options={currencyOptions}
                  selectPosition="suffix"
                  value={{ input: item.price, select: item.currency }}
                  placeholder="Enter price"
                  onChange={(e: any) => {
                    handleChangeItem(item.id, "price", e.input);
                    handleChangeItem(item.id, "currency", e.select.value);
                  }}
                />
                <SelectInput
                  width="50%"
                  type="number"
                  options={discountTypeOptions}
                  selectPosition="suffix"
                  placeholder="Enter discount"
                  value={{ input: item.discount, select: item.discountUnit }}
                  onChange={(e: any) => {
                    handleChangeItem(item.id, "discountUnit", e.select.value);
                    handleChangeItem(item.id, "discount", e.input);
                  }}
                />
              </div>
              {/* <Input
                type="number"
                value={item.price}
                placeholder="Price"
                onChange={(e: any) => handleChangeItem(item.id, "price", e.target.value)}
              /> */}
              <Input
                label="Klook URL"
                value={item.klookUrl}
                placeholder="Enter URL"
                onChange={(e: any) =>
                  handleChangeItem(item.id, "klookUrl", e.target.value)
                }
              />
              {isPaid ? (
                <Input
                  label="Website URL"
                  value={item.websiteUrl}
                  placeholder="Enter URL"
                  onChange={(e: any) =>
                    handleChangeItem(item.id, "websiteUrl", e.target.value)
                  }
                />
              ) : (
                <Input
                  disabled
                  label="Website URL"
                  value="Upgrade to Premium to link website"
                  suffix={
                    <div className="flex gap-2">
                      <a
                        style={{ width: "max-content", color: "#653fff" }}
                        onClick={() => router.push("/")}
                      >
                        View detail
                      </a>
                      <Icon icon="star-2" color="#653fff" />
                    </div>
                  }
                />
              )}
              {multiple && <AddItemButton />}
            </div>
          ))
        : multiple && <AddItemButton />}
      <Break />
      <div className="flex gap-5">
        <CancelButton />
        <Button
          text={placeholders[2]}
          width={280}
          size="small"
          onClick={() => onSubmit(localItemList)}
        />
      </div>
    </div>
  );
};

export default AddItems;
