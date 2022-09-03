import Break from "components/Break/Break";
import Button from "components/Button/Button";
import DatePicker from "components/DatePicker/DatePicker";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Upload from "components/Upload/Upload";
import { ListingHomePageScreens } from "enums";
import React, { useState } from "react";
import { getIndex, randomId } from "utils";
import moment from "moment";
import parseISO from "date-fns/parseISO";

import styles from "./AddDeal.module.scss";
import { get } from "lodash";

interface AddDealsProps {
  isEdit?: boolean;
  isPaid?: boolean;
  multiple?: boolean;
  dealList: { [key: string]: any }[];
  onCancel: () => void;
  onSubmit: (dealList: { [key: string]: any }[]) => void;
}

const AddDeals = (props: AddDealsProps) => {
  const { isEdit, dealList, isPaid, multiple, onCancel, onSubmit } = props;
  const [localDealList, setLocalDeaList] = useState(dealList || []);

  const handleRemoveDeal = (id: number) => {
    const newArray = [...localDealList].filter((deal) => deal.id !== id);
    setLocalDeaList(newArray);
  };

  const handleChangeDeal = (
    id: number,
    type: string,
    value: string | number | string[]
  ) => {
    const index = getIndex(id, localDealList);
    const newArray = [...localDealList];
    if (isEdit) {
      newArray[index][type] = value;
      newArray[index].isEdited = true;
    } else {
      newArray[index][type] = value;
    }
    setLocalDeaList(newArray);
  };

  const handleAddDeal = () => {
    setLocalDeaList([
      ...localDealList,
      { id: randomId(), isNew: true, validUntil: new Date() },
    ]);
  };

  const AddDealButton = () => (
    <Button
      prefix={<Icon icon="plus" />}
      width="max-content"
      variant="secondary"
      text="Add another"
      size="small"
      disabled={!isPaid && get(localDealList, "length") > 2}
      onClick={handleAddDeal}
    />
  );

  const CancelButton = () => (
    <Button
      variant="secondary-no-outlined"
      text="Cancel"
      width={50}
      size="small"
      onClick={() => {
        setLocalDeaList(dealList);
        onCancel();
      }}
    />
  );
  return (
    <React.Fragment>
      <Break />
      {Array.isArray(localDealList) && localDealList.length
        ? localDealList.map((deal) => (
            <div key={deal.id} className={styles.add_deals_container}>
              <div className={styles.break} />
              <div className={styles.header}>
                <p className="text-left">Add images</p>
                {multiple && (
                  <div
                    className={styles.close}
                    onClick={() => handleRemoveDeal(deal.id)}
                  >
                    <Icon icon="cancel" />
                  </div>
                )}
              </div>
              <Upload
                multiple
                isPaid={isPaid}
                centerIcon={<Icon icon="plus" size={20} />}
                fileList={deal.images || []}
                onChange={(e) => handleChangeDeal(deal.id, "images", e)}
              />
              <Input
                value={deal.name}
                placeholder="Deal name"
                onChange={(e: any) =>
                  handleChangeDeal(deal.id, "name", e.target.value)
                }
              />
              <Input
                value={deal.description}
                placeholder="Deal description"
                onChange={(e: any) =>
                  handleChangeDeal(deal.id, "description", e.target.value)
                }
              />
              <DatePicker
                maxDate={new Date("2100-12-30")}
                suffixIcon
                label="Valid until"
                value={
                  (deal.validUntil &&
                    moment(deal.validUntil, "YYYY-MM-DD").toDate()) ||
                  (deal.end_date &&
                    moment(deal.end_date, "YYYY-MM-DD").toDate()) ||
                  new Date()
                }
                onChange={(e: any) => handleChangeDeal(deal.id, "endDate", e)}
              />
              <Input
                value={deal.termsConditions}
                label="Terms and Conditions"
                placeholder="A valid tribe listing pass must be presented upon payment to enjoy the offer."
                onChange={(e: any) =>
                  handleChangeDeal(deal.id, "termsConditions", e.target.value)
                }
              />
              {multiple && <AddDealButton />}
              <Break />
            </div>
          ))
        : multiple && (
            <div>
              <AddDealButton />
              <Break />
            </div>
          )}
      <div className="flex gap-5">
        <CancelButton />
        <Button
          text="Confirm"
          width={280}
          size="small"
          onClick={() => onSubmit(localDealList)}
        />
      </div>
    </React.Fragment>
  );
};

export default AddDeals;
