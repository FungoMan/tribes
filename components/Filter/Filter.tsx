import { useEffect, useState } from "react";

import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Modal, { ModalProps } from "components/Modal/Modal";
import Radio from "components/Radio/Radio";
import Range from "components/Range/Range";
import Tabs from "components/Tabs/Tabs";
import { Filters } from "./enums";
import styles from "./Filter.module.scss";
import { get, isArray } from "lodash";
import { IOption } from "type";
import ProductTypeApi from "services/product-type";
import ProductBrandApi from "services/product-brand";
import { useRouter } from "next/router";
import useGetCountry from "hooks/useGetCountry";
import { categories, getFilterLabels, sortOptions } from "constant";

export interface IFilter {
  productTypes: string[];
  productBrands: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: "asc" | "desc" | undefined;
  minRating?: number;
  maxRating?: number;
}

const Sort = ({ filter, onFilter }) => (
  <div className="flex flex-col gap-2">
    {sortOptions.map((sort) => (
      <Radio
        key={sort.label}
        label={sort.label}
        value={sort.value}
        checked={filter?.sort === sort.value}
        name="sort"
        onClick={(e) =>
          onFilter({ sort: (e.target as HTMLInputElement).value })
        }
      />
    ))}
  </div>
);

const Rating = ({ filter, onFilter }) => {
  const [ratingValues, setRateValues] = useState<{
    min: number;
    max: number;
  }>({
    min: 0,
    max: 5,
  });

  const handleChangeRate = (value) => {
    onFilter({ minRating: value.min, maxRating: value.max });
    setRateValues(value);
  };

  return (
    <div>
      <div className="flex">
        <div className="flex gap-1">
          <Icon icon="red-star" />
          {ratingValues?.min}
        </div>
        {ratingValues?.max === 5 ? (
          "+"
        ) : (
          <div className="flex gap-1">
            &nbsp;-&nbsp;
            <Icon icon="red-star" />
            {ratingValues?.max}
          </div>
        )}
      </div>
      <div className="flex flex-start mt-5">
        <Range min={0} max={5} onChange={handleChangeRate} />
      </div>
    </div>
  );
};

const PriceRange = ({ filter, onFilter }) => {
  const [rangeValues, setRangeValues] = useState<{
    min: number;
    max: number;
  }>({
    min: filter.min || 0,
    max: filter.max || 0,
  });

  const country = useGetCountry();

  const handleChangeRange = (value) => {
    onFilter({ minPrice: value.min, maxPrice: value.max });
    setRangeValues(value);
  };

  return (
    <div>
      <div className="flex">
        <div>{`${country.currency} ${rangeValues?.min}`}</div>
        &nbsp;-&nbsp;
        <div>{`${country.currency} ${rangeValues?.max}`}</div>
      </div>
      <div className="flex flex-start mt-5">
        <Range min={0} max={country.max} onChange={handleChangeRange} />
      </div>
    </div>
  );
};

const Other = ({
  filter,
  filterKey,
  options = [],
  onFilter,
}: {
  filter: IFilter | {};
  filterKey: string;
  options?: IOption[];
  onFilter: (e: { [key: string]: string[] }) => void;
}) => {
  const selectedArray = filter?.[filterKey] || [];
  const [filteredOptions, setFilteredOptions] = useState(options || []);
  const [selectedOptions, setSelectedOptions] =
    useState<string[]>(selectedArray);

  const handleSearchProductTypes = (e) => {
    const searchKey = e.target.value;
    const newProductTypesArray = isArray(options)
      ? options.filter((item) =>
          item.value.toLowerCase().includes(searchKey.toLowerCase())
        )
      : [];

    setFilteredOptions(newProductTypesArray);
  };

  const handleUpdateOptions = (e) => {
    const checkboxValue = e.target.value;
    let newSelectedOptions;

    if (selectedOptions?.includes(checkboxValue)) {
      newSelectedOptions = [...selectedOptions].filter(
        (item) => item !== checkboxValue
      );
    } else {
      newSelectedOptions = [...selectedOptions, checkboxValue];
    }

    setSelectedOptions(newSelectedOptions);
    onFilter({ [filterKey]: newSelectedOptions });
  };

  return (
    <>
      <Input
        size="large"
        placeholder="Search"
        prefix={<Icon icon="search" size={25} />}
        onChange={handleSearchProductTypes}
      />
      <div className={styles.option_container}>
        {isArray(options) &&
          filteredOptions.map((opt, index) => (
            <Checkbox
              key={(opt.label as string) + index}
              checked={selectedOptions?.includes(opt.value)}
              label={opt.label}
              value={opt.value}
              onChange={handleUpdateOptions}
            />
          ))}
      </div>
    </>
  );
};

export interface FilterProps extends ModalProps {
  finalTabList?: IOption[];
  otherList?: IOption[];
  filter: IFilter | {};
  onSubmitFilter: (e?: IFilter | {}) => void;
}

const Filter = (props: FilterProps) => {
  const { visible, filter, onSubmitFilter, onClose } = props;

  const [localFilter, setLocalFilter] = useState<IFilter | {}>(filter);
  const [productTypes, setProductTypes] = useState<IOption[]>([]);
  const [productBrands, setProductBrands] = useState<IOption[]>([]);

  const router = useRouter();
  const { category, subCategory: categoryLink }: any = router.query;
  const { currency } = useGetCountry();
  const filterLabels = getFilterLabels(localFilter, currency);
  const finalTabLabel = categories.find(
    (cat) => cat.slug === category
  )?.finalTabLabel;

  useEffect(() => {
    const getProductTypes = async () => {
      const data = await ProductTypeApi.getProductTypeByCategoryLinkSlug(
        categoryLink
      );
      const rawProductTypes = get(data, "data.data") || [];
      const formatProductTypes = rawProductTypes.map((item) => ({
        label: item.attributes.label,
        value: item.attributes.value,
      }));
      setProductTypes(formatProductTypes);
    };

    const getProductBrands = async () => {
      const data = await ProductBrandApi.getProductBrandByProductTypeSlug(
        (localFilter as IFilter)?.productTypes
      );
      const rawProductBrands = get(data, "data.data") || [];
      const formatProductBrands = rawProductBrands.map((item) => ({
        label: item.attributes.label,
        value: item.attributes.value,
      }));
      setProductBrands(formatProductBrands);
    };

    getProductTypes();
    getProductBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath, categoryLink, (localFilter as IFilter)?.productTypes]);

  const handleFilter = (e) => {
    setLocalFilter?.({ ...localFilter, ...e });
  };

  const handleCloseFilterModal = () => {
    setLocalFilter(filter);
    onClose?.();
  };

  const handleApplyFilter = () => {
    onClose?.();
    onSubmitFilter(localFilter);
  };

  const handleResetFilter = () => {
    setLocalFilter({});
    onSubmitFilter();
    onClose?.();
  };

  const productBrandFilterNumber = get(localFilter, "productBrands.length")
    ? `${get(localFilter, "productBrands.length")} selected`
    : "";

  const productTypeFilterNumber = get(localFilter, "productTypes.length")
    ? `${get(localFilter, "productTypes.length")} selected`
    : "";

  const tabList = [
    {
      label: "Sort",
      subLabel: filterLabels[0].isShow && filterLabels[0].value,
      value: Filters.SORT,
      content: <Sort filter={localFilter} onFilter={handleFilter} />,
    },
    {
      label: "Rating",
      subLabel: filterLabels[1].isShow && filterLabels[1].value,
      value: Filters.RATING,
      content: (
        <Rating
          key={Filters.RATING}
          filter={localFilter}
          onFilter={handleFilter}
        />
      ),
    },
    {
      label: "Price range",
      subLabel: filterLabels[2].isShow && filterLabels[2].value,
      value: Filters.PRICE_RANGE,
      content: (
        <PriceRange
          key={Filters.PRICE_RANGE}
          filter={localFilter}
          onFilter={handleFilter}
        />
      ),
    },
    {
      label: "Others",
      subLabel: productTypeFilterNumber,
      value: Filters.OTHER,
      content: (
        <Other
          key={
            "productTypes" +
            get(productTypes, "length") +
            (localFilter as IFilter)?.productTypes
          }
          filter={localFilter}
          filterKey="productTypes"
          options={productTypes}
          onFilter={handleFilter}
        />
      ),
    },
    {
      label: finalTabLabel,
      subLabel: productBrandFilterNumber,
      value: Filters.OTHER_OTHER,
      content: (
        <Other
          key={
            "productBrands" +
            get(productBrands, "length") +
            (localFilter as IFilter)?.productBrands
          }
          filter={localFilter}
          filterKey="productBrands"
          options={productBrands}
          onFilter={handleFilter}
        />
      ),
    },
  ];

  return (
    <Modal
      width="700px"
      visible={visible}
      onClose={handleCloseFilterModal}
      title="Filter & Sort"
    >
      <Tabs tabList={tabList} />
      <div className="flex justify-between p-[10px]">
        <div className={styles.reset_btn} onClick={handleResetFilter}>
          Reset all
        </div>
        <Button
          text="Apply"
          className={styles.apply_btn}
          onClick={handleApplyFilter}
        />
      </div>
    </Modal>
  );
};

export default Filter;
