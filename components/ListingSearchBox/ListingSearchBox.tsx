import { IOption } from "type";
import Button from "components/Button/Button";
import Select from "components/Select/Select";
import styles from "./ListingSearchBox.module.scss";
import { useRouter } from "next/router";
import { listingSearchResult, locations } from "constant";
import Icon from "components/Icon/Icon";
import ListingSearch from "components/ListingSearch/ListingSearch";
import { useContext } from "react";
import { UserInforContext } from "Context/UserInforContext";

const dummyLocation: IOption[] = [
  { label: "Indonesia", value: "Indonesia" },
  { label: "Singapore", value: "Singapore" },
  { label: "Malaysia", value: "Malaysia" },
  { label: "Japan", value: "Japan" },
  { label: "Thailand", value: "Thailand" },
  { label: "Hong Kong", value: "Hong Kong" },
];

interface ListingSearchBoxProps {
  title?: string;
  listingOptions?: any[];
  onInputChange?: (e: string) => void;
  onListingSearchChange?: (item: { [key: string]: any }) => void;
  onLocationChange?: (item: { [key: string]: any }) => void;
}
const ListingSearchBox = (props: ListingSearchBoxProps) => {
  const {
    title,
    listingOptions,
    onInputChange,
    onLocationChange,
    onListingSearchChange,
  } = props;

  const { user } = useContext(UserInforContext);
  const { location } = user;

  return (
    <div className={styles.listing_search_box}>
      <h1 className={styles.title}>{title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-x-4 gap-y-4 lg:gap-y-0">
        <div className="col-span-2">
          <Select
            prefixIcon="map"
            size="large"
            placeholder="Location"
            options={locations}
            value={location}
            onChange={onLocationChange}
          />
        </div>
        <div className="col-span-2">
          <ListingSearch
            ellipsis
            closeMenuOnSelect
            isClearable
            listingOptions={listingOptions || listingSearchResult}
            onChange={onListingSearchChange}
            onInputChange={onInputChange}
          />
        </div>
        <div className="col-auto">
          <Button size="large" text="Search" className={styles.button_search} />
        </div>
      </div>
    </div>
  );
};

export default ListingSearchBox;
