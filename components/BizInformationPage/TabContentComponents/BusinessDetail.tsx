import Break from "components/Break/Break";
import SectionLayout from "components/SectionLayout/SectionLayout";
import { Categories } from "enums";
import { IAddListingForm } from "pages/add-listing";
import BusinessDetailBuy from "./BusinessDetailCategories/BusinessDetailBuy";
import BusinessDetailEat from "./BusinessDetailCategories/BusinessDetailEat";
import BusinessDetailSeeAndDo from "./BusinessDetailCategories/BusinessDetailSeeAndDo";
import BusinessDetailTransport from "./BusinessDetailCategories/BusinessDetailTransport";
import BusinessDetailStay from "./BusinessDetailCategories/BusinessDetailStay";
import { useState } from "react";
import { bizInformationDefaultFormData } from "constant";
import { get, map } from "lodash";
import productBrand from "services/product-brand";
import Loader from "components/Loader/Loader";

interface BusinessDetailProps {
  listing: any;
  loading?: boolean;
  onSubmit: (data: any) => void;
}

const BusinessDetail = (props: BusinessDetailProps) => {
  const { listing, loading, onSubmit } = props;
  const category = get(listing, "categories[0].order");
  const rawProductBrands = get(listing, "product_brands");
  const rawProductTypes = get(listing, "product_types");
  const generateOption = (item) => ({
    label: item.label,
    value: item.id,
  });

  const viewBusinessDetailData = {
    categoryLinks: get(listing, "category_links[0]"),
    viewProductTypes: get(listing, "product_types"),
    openHours: get(listing, "open_hours"),
    minPrice: get(listing, "min_price"),
    maxPrice: get(listing, "max_price"),
    currency: get(listing, "currency"),
    describeTags: Array.isArray(get(listing, "tags"))
      ? get(listing, "tags").map((item) => item.id.toString())
      : [],
    viewDescribeTags: Array.isArray(get(listing, "tags"))
      ? get(listing, "tags").map((item) => item.label)
      : [],
    productTypes:
      Array.isArray(rawProductTypes) &&
      rawProductTypes.map((type) =>
        //in category BUY productTypes require array of product type ids when others need object[]
        category === Categories.BUY ? type.id.toString() : generateOption(type)
      ),
    productBrands:
      Array.isArray(rawProductBrands) &&
      rawProductBrands.map((brand) => generateOption(brand)),

    additionalServices: get(listing, "facilities_data.additionalServices"),
    atmosphere: get(listing, "facilities_data.atmosphere"),
    foodOptions: get(listing, "facilities_data.foodOptions"),
    foodOptionsRamadan: get(listing, "facilities_data.foodOptionsRamadan"),
    mealsKind: get(listing, "facilities_data.mealsKind"),
    nonHalalActivities: get(listing, "facilities_data.nonHalalActivities"),
    parking: get(listing, "facilities_data.parking"),
    paryerFacilities: get(listing, "facilities_data.paryerFacilities"),
    payment: get(listing, "facilities_data.payment"),
    placeGoodFor: get(listing, "facilities_data.placeGoodFor"),
  };

  const submitFormData = (formData) => {
    const businessDetailFormattedData = {
      category_links: formData.categoryLinks,
      // price_range: {
      //   currency: formData.currency?.value || formData.currency,
      //   min: formData.minPrice,
      //   max: formData.maxPrice,
      // },
      currency: get(formData, "currency?.value") || formData.currency,
      min_price: formData.minPrice,
      max_price: formData.maxPrice,
      product_types:
        get(listing, "categories[0].id") === Categories.BUY
          ? formData.productTypes
          : map(formData.productTypes, "value"),
      product_brands:
        get(listing, "categories[0].id") === Categories.BUY
          ? map(formData.productBrands, "value")
          : null,
      tags: formData.describeTags || [],
      facilities_data: {
        additionalServices: formData.additionalServices,
        atmosphere: formData.atmosphere,
        foodOptions: formData.foodOptions,
        foodOptionsRamadan: formData.foodOptionsRamadan,
        mealsKind: formData.mealsKind,
        nonHalalActivities: formData.nonHalalActivities,
        parking: formData.parking,
        paryerFacilities: formData.paryerFacilities,
        payment: formData.payment,
        placeGoodFor: formData.placeGoodFor,
      },
      open_hours: formData.openHours,
    };
    onSubmit(businessDetailFormattedData);
  };

  const renderBusinessDetail = () => {
    let detail;
    switch (get(listing, "categories[0].id")) {
      case Categories.BUY:
        detail = (
          <BusinessDetailBuy
            formData={viewBusinessDetailData}
            submitFormData={submitFormData}
          />
        );
        break;
      case Categories.EAT:
        detail = (
          <BusinessDetailEat
            formData={viewBusinessDetailData}
            submitFormData={submitFormData}
          />
        );
        break;
      case Categories.SEE_AND_DO:
        detail = (
          <BusinessDetailSeeAndDo
            formData={viewBusinessDetailData}
            submitFormData={submitFormData}
          />
        );
        break;
      case Categories.TRANSPORT:
        detail = (
          <BusinessDetailTransport
            formData={viewBusinessDetailData}
            submitFormData={submitFormData}
          />
        );
        break;
      case Categories.STAY:
        detail = (
          <BusinessDetailStay
            formData={viewBusinessDetailData}
            submitFormData={submitFormData}
          />
        );
        break;
      default:
        detail = <div></div>;
        break;
    }
    return detail;
  };

  return loading ? <Loader /> : renderBusinessDetail();
};

export default BusinessDetail;
