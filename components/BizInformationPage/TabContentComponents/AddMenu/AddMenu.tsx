import Break from "components/Break/Break";
import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Upload from "components/Upload/Upload";
import { ListingHomePageScreens } from "enums";
import { get } from "lodash";
import { useState } from "react";
import { getIndex, randomId } from "utils";

import styles from "./AddMenu.module.scss";

interface AddItemsProps {
  isPaid?: boolean;
  menuList: { [key: string]: any }[];
  multiple?: boolean;
  onCancel: () => void;
  onSubmit: (menuList: { [key: string]: any }[]) => void;
}

const AddMenu = (props: AddItemsProps) => {
  const { isPaid, multiple, menuList, onCancel, onSubmit } = props;
  const [localMenuList, setLocalMenuList] = useState<{ [key: string]: any }[]>(
    menuList || []
  );

  const CancelButton = () => (
    <Button
      variant="secondary-no-outlined"
      text="Cancel"
      width={50}
      size="small"
      onClick={() => {
        setLocalMenuList(menuList);
        onCancel();
      }}
    />
  );

  const handleRemoveMenu = (id: number) => {
    const newArray = [...localMenuList].filter((item) => item.id !== id);
    setLocalMenuList(newArray);
  };

  const handleChangeMenu = (
    id: number,
    type: string,
    value: string | number | string[] | { [key: string]: any }
  ) => {
    const index = getIndex(id, localMenuList);
    const newArray = [...localMenuList];
    newArray[index][type] = value;
    newArray[index].isEdited = true;
    setLocalMenuList(newArray);
  };

  const handleAddMenu = () => {
    setLocalMenuList([...localMenuList, { id: randomId(), isNew: true }]);
  };

  const AddItemButton = () => (
    <Button
      prefix={<Icon icon="plus" />}
      width="max-content"
      variant="secondary"
      text="Add another"
      size="small"
      disabled={!isPaid && get(localMenuList, "length") > 2}
      onClick={handleAddMenu}
    />
  );

  return (
    <div>
      <Break />
      {Array.isArray(localMenuList) && localMenuList.length > 0
        ? localMenuList.map((item) => (
            <div key={item.id} className={styles.add_menu_container}>
              <div className={styles.break} />
              <div className={styles.header}>
                <p className="text-left">Add images</p>
                {multiple && (
                  <div
                    className={styles.close}
                    onClick={() => handleRemoveMenu(item.id)}
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
                onChange={(e) => {
                  handleChangeMenu(item.id, "images", e);
                }}
              />
              <Input
                value={item.name}
                placeholder="Menu name"
                onChange={(e: any) =>
                  handleChangeMenu(item.id, "name", e.target.value)
                }
              />
              {multiple && <AddItemButton />}
              <Break />
            </div>
          ))
        : multiple && (
            <div>
              <AddItemButton />
              <Break />
            </div>
          )}
      <div className="flex gap-5">
        <CancelButton />
        <Button
          text="Create menu"
          width={280}
          size="small"
          onClick={() => onSubmit(localMenuList)}
        />
      </div>
    </div>
  );
};

export default AddMenu;
