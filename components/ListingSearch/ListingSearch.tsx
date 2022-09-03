import Icon from "components/Icon/Icon";
import Select, { SelectProps } from "components/Select/Select";
import { Categories, YesNo } from "enums";
import Router, { useRouter } from "next/router";
import AuthPopup from "components/AuthPopup/AuthPopup";
import styles from "./ListingSearch.module.scss";
import get from "lodash/get";
import { IOption } from "type";
import React, { useState } from "react";

export const ListingMenuFooter = ({ onClick }) => {
  return (
    <div className={styles.add_listing_search_footer} onClick={onClick}>
      <div>Cannot find the listing?</div>
      <p>List it now</p>
    </div>
  );
};

const listingIcon = (category) => {
  let icon;
  switch (category) {
    case Categories.BUY:
      icon = "buy-color";
      break;
    case Categories.EAT:
      icon = "eat-color";
      break;
    case Categories.SEE_AND_DO:
      icon = "camera-color";
      break;
    case Categories.TRANSPORT:
      icon = "car-color";
      break;
    case Categories.STAY:
      icon = "bed-color";
      break;
    default:
      icon = "";
      break;
  }
  return icon;
};

export const formatListingResultOption = (bizListing: any[]) => {
  const result = Array.isArray(bizListing)
    ? bizListing.map((item: any) => ({
        ...item,
        value: get(item, "attributes.name"),
        // @ts-ignore
        label: (
          <div className="flex gap-2">
            <div>
              <Icon
                icon={listingIcon(
                  get(item, "attributes.categories.data[0].attributes.order")
                )}
                size={20}
              />
            </div>
            <div>
              <div>{get(item, "attributes.name")}</div>
              <div style={{ fontSize: 12, color: "#3C4467" }}>
                {get(item, "attributes.address")}
              </div>
            </div>
          </div>
        ),
      }))
    : [];
  return result;
};

interface ListingSearchProps extends SelectProps {
  listingOptions: IOption[];
  menuFooter?: JSX.Element | JSX.Element[];
  isClaimListing?: boolean;
}
const ListingSearch = (props: ListingSearchProps) => {
  const {
    onChange,
    onInputChange,
    listingOptions,
    menuFooter,
    isClaimListing = false,
    ...rest
  } = props;

  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const checkLogin = () => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    userInfo.token
      ? isClaimListing
        ? onChange?.(YesNo.NO)
        : Router.push(`/add-listing`)
      : setShowAuthPopup(true);
  };
  // router.push('/add-listing')

  return (
    <React.Fragment>
      <Select
        shouldControlShowValue
        size="large"
        isSearchable
        closeMenuOnSelect
        prefixIcon="search"
        options={formatListingResultOption(listingOptions)}
        onChange={(e) => onChange?.(e)}
        menuFooter={menuFooter || <ListingMenuFooter onClick={checkLogin} />}
        onInputChange={onInputChange}
        {...rest}
      />
      <AuthPopup
        onClose={() => setShowAuthPopup(false)}
        visible={showAuthPopup}
      />
    </React.Fragment>
  );
};

export default ListingSearch;
