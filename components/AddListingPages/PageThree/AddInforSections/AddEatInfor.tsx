import { useEffect, useState } from "react";
import get from "lodash/get";
import { useForm } from "react-hook-form";

import Badge from "components/Badge/Badge";
import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import Input from "components/Input/Input";
import Modal from "components/Modal/Modal";
import Question from "components/Question/Question";
import Radio from "components/Radio/Radio";
import SectionLayout from "components/SectionLayout/SectionLayout";
import { categories, currencyOptions } from "constant";
import {
  additionalFeatures,
  atmosphere,
  mealOptions,
  parkingNearby,
  paymentMethods,
  placeGoodFor,
} from "../constant";
import Break from "components/Break/Break";
import Upload from "components/Upload/Upload";
import Icon from "components/Icon/Icon";
import OpenHours from "components/OpenHours/OpenHours";
import { Categories, YesNo } from "enums";
import PreviewValue from "components/AddListingPages/PreviewValue/PreviewValue";
import TagsSelection from "components/TagsSelection/TagsSelection";
import { IAddListingForm } from "pages/add-listing";
import Select from "components/Select/Select";
import CategoryLinkApi from "../../../../services/category-link";
import TagApi from "../../../../services/tag";
import ProductTypeApi from "../../../../services/product-type";
import { getOptionsMappedFromResponse } from "utils";

interface AddEatInforProps {
  isEdit?: boolean;
  facilityMode?: boolean;
  data: { [key: string]: any };
  show?: boolean;
  onPrevPage?: () => void;
  onPreview?: (data: IAddListingForm) => void;
  onEdit?: (data: IAddListingForm) => void;
}

const AddEatInfor = (props: AddEatInforProps) => {
  const {
    data,
    isEdit,
    facilityMode,
    show = true,
    onPrevPage,
    onPreview,
    onEdit,
  } = props;

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      categoryLinks: get(data, "categoryLinks"),
      productTypes: get(data, "productTypes"),
      describeTags: get(data, "describeTags"),
      minPrice: get(data, "minPrice"),
      maxPrice: get(data, "maxPrice"),
      mealsKind: get(data, "mealsKind"),
      images: get(data, "images"),
      placeGoodFor: get(data, "placeGoodFor"),
      parking: get(data, "parking"),
      atmosphere: get(data, "atmosphere"),
      payment: get(data, "payment"),
      additionalServices: get(data, "additionalServices"),
      agreePolicies: get(data, "agreePolicies"),
      currency: get(data, "currency"),
      openHours: get(data, "openHours"),
    },
  });

  const initCategoryLink = get(data, "categoryLinks.id") || "";

  const [showTagsModal, setShowTagsModal] = useState(false);
  const [showOpeningHoursModal, setShowOpenHoursModal] = useState(false);
  const [categoryLinks, setCategoryLinks] = useState<any>([]);
  const [selectCategoryLink, setSelectCategoryLink] =
    useState<string>(initCategoryLink);
  const [productTypes, setProductTypes] = useState<any>([]);
  const [describeTags, setDescribeTags] = useState<any>([]);

  useEffect(() => {
    // Category links
    CategoryLinkApi.getCategoryLinksByCategoryId(Categories.EAT)
      .then((res) => setCategoryLinks(get(res, "data.data") || []))
      .catch((e) => console.log(e));

    //Product types
    ProductTypeApi.getProductTypeByCategoryLinkId(selectCategoryLink)
      .then((res) => setProductTypes(getOptionsMappedFromResponse(res)))
      .catch((e) => console.log(e));

    // Tags
    TagApi.getTags()
      .then((res) => setDescribeTags(get(res, "data.data") || []))
      .catch((e) => console.log(e));
  }, []);

  const onSubmit = (data) => {
    onPreview?.(data);
    onEdit?.(data);
  };

  const title = facilityMode
    ? undefined
    : isEdit
    ? "Business Detail"
    : "Add a restaurant";

  const subTitle = facilityMode
    ? undefined
    : isEdit
    ? undefined
    : "After you complete this form, you will be able to make changes before submitting.";

  const sectionContainer = facilityMode ? "pt-0" : undefined;

  const handleSelectCategoryLink = async (opt) => {
    setValue("categoryLinks", opt.id);
    setSelectCategoryLink(opt.id);

    const data = await ProductTypeApi.getProductTypeByCategoryLinkId(opt.id);
    setProductTypes(getOptionsMappedFromResponse(data));
    setValue("productTypes", []);
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <SectionLayout
        title={title}
        subTitle={subTitle}
        className={sectionContainer}
        containerClassName={isEdit ? "w-full px-[30px]" : ""}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Question
            show={!facilityMode}
            question="What is the category best associated with this place? *"
          >
            <div className="flex flex-wrap gap-2">
              {Array.isArray(categoryLinks) &&
                categoryLinks.map((opt) => (
                  <Badge
                    key={opt.id}
                    text={get(opt, "attributes.label")}
                    selected={selectCategoryLink === opt.id}
                    onClick={() => handleSelectCategoryLink(opt)}
                  />
                ))}
            </div>
          </Question>
          <Question
            show={!facilityMode}
            question="What type of cuisine does this place serve?"
            instruction="Select 5 max"
            optional
          >
            <PreviewValue valueKey="tags" value={getValues("productTypes")} />
            <br />
            <Button
              text="Edit cuisines"
              width="fit-content"
              size="small"
              onClick={() => setShowTagsModal(true)}
            />
          </Question>
          <Question
            show={!facilityMode}
            question="What are the opening hours? *"
          >
            <PreviewValue valueKey="openHours" value={getValues("openHours")} />
            <br />
            <Button
              text="Add opening hours"
              width="fit-content"
              size="small"
              variant="secondary"
              onClick={() => setShowOpenHoursModal(true)}
            />
          </Question>
          <Question
            show={!facilityMode}
            question="What tags best describe this place? "
            optional
          >
            <div className="flex flex-wrap gap-y-5 w-100 sm:w-100 lg:w-5/6 xl:w-3/5">
              {Array.isArray(describeTags) &&
                describeTags.map((item) => (
                  <Checkbox
                    key={item.id}
                    label={get(item, "attributes.label")}
                    // name="tags"
                    value={item.id}
                    className="w-1/2"
                    register={register("describeTags")}
                  />
                ))}
            </div>
          </Question>
          <Question
            show={!facilityMode}
            question="What’s the general price range of a meal?"
            optional
          >
            <div className="w-3/5">
              <Select
                placeholder="Select a currency"
                options={currencyOptions}
                value={getValues("currency")}
                onChange={(e) => setValue("currency", e)}
              />
              <br />
              <div className="flex gap-5">
                <Input
                  placeholder="Minimum price (optional)"
                  className="w-full sm:w-1/2"
                  register={register("minPrice")}
                />
                <Input
                  placeholder="Maximum Price (optional)"
                  className="w-full sm:w-1/2"
                  register={register("maxPrice")}
                />
              </div>
            </div>
          </Question>
          <Question
            question="What kind of meals does this place serve?"
            optional
          >
            <div className="flex flex-wrap gap-y-5 w-100 sm:w-100 lg:w-5/6 xl:w-3/5">
              {Array.isArray(mealOptions) &&
                mealOptions.map((item) => (
                  <Checkbox
                    key={item.label}
                    label={item.label}
                    value={item.label}
                    className="w-1/2"
                    name="mealsKind"
                    register={register("mealsKind")}
                  />
                ))}
            </div>
          </Question>
          <Question question="What is this place good for? " optional>
            <div className="flex flex-wrap gap-y-5 w-100 sm:w-100 lg:w-5/6 xl:w-3/5">
              {Array.isArray(placeGoodFor) &&
                placeGoodFor.map((item) => (
                  <Checkbox
                    key={item.label}
                    label={item.label}
                    // name="placeGoodFor"
                    value={item.label}
                    className="w-1/2"
                    register={register("placeGoodFor")}
                  />
                ))}
            </div>
          </Question>
          <Question question="Is parking available nearby?" optional>
            <div className="flex flex-col gap-y-5">
              {Array.isArray(parkingNearby) &&
                parkingNearby.map((item) => (
                  <Radio
                    key={item.label}
                    label={item.label}
                    value={item.label}
                    name="parking"
                    register={register("parking")}
                  />
                ))}
            </div>
          </Question>
          <Question
            question="What best describe this place’s atmosphere? "
            optional
          >
            <div className="flex flex-wrap gap-y-5 w-100 sm:w-100 lg:w-5/6 xl:w-3/5">
              {Array.isArray(atmosphere) &&
                atmosphere.map((item) => (
                  <Checkbox
                    key={item.label}
                    // name="atmosphere"
                    value={item.label}
                    label={item.label}
                    className="w-1/2"
                    register={register("atmosphere")}
                  />
                ))}
            </div>
          </Question>
          <Question
            question="What type of payment method is available?"
            optional
          >
            <div className="flex flex-wrap gap-y-5 w-100 sm:w-100 lg:w-5/6 xl:w-3/5">
              {Array.isArray(paymentMethods) &&
                paymentMethods.map((item) => (
                  <Checkbox
                    key={item.label}
                    // name="payment"
                    label={item.label}
                    value={item.label}
                    className="w-1/2"
                    register={register("payment")}
                  />
                ))}
            </div>
          </Question>
          <Question
            question="Any additional features/ services that are available? "
            optional
          >
            <div className="flex flex-wrap gap-y-5 w-100 sm:w-100 lg:w-5/6 xl:w-3/5">
              {Array.isArray(additionalFeatures) &&
                additionalFeatures.map((item) => (
                  <Checkbox
                    key={item.label}
                    // name="additionalServices"
                    label={item.label}
                    value={item.label}
                    className="w-1/2"
                    register={register("additionalServices")}
                  />
                ))}
            </div>
          </Question>
          <Question
            question="Do you have photos or videos to share?"
            instruction="Add images/ videos ( up to 3 )"
            show={!isEdit}
            optional
          >
            <Upload
              isPaid
              multiple={true}
              fileList={watch("images")}
              type="media"
              centerIcon={<Icon icon="plus" />}
              onChange={(urls) => setValue("images", urls)}
            />
          </Question>
          <Question show={!isEdit}>
            <br /> <br /> <br />
            <Checkbox
              register={register("agreePolicies", {
                required: true,
              })}
              label={
                data?.relationship === YesNo.NO
                  ? "I certify that this is a genuine business"
                  : "Check this box to certify that you are an official representative of the property for which you are submitting this listing and that the information you have submitted is correct. In submitting a photo, you also certify that you have the right to use the photo on the web and agree to hold Tribes or harmless for any and all copyright issues arising from your use of the image"
              }
            />
          </Question>
          <br /> <Break /> <br />
          <div className="flex items-end gap-3 sm:gap-10text-sm">
            <Button
              text={isEdit ? "Cancel" : "Go back"}
              variant="underlined"
              width="fit-content"
              onClick={onPrevPage}
            />
            <Button
              text={isEdit ? "Apply change" : "Continue"}
              size="small"
              width={270}
              type="submit"
              disabled={!(isEdit || (isValid && selectCategoryLink))}
            />
          </div>
        </form>
      </SectionLayout>
      <Modal
        visible={showTagsModal}
        title="Add product"
        subTitle="Select max 5"
        width={780}
        onClose={() => setShowTagsModal(false)}
      >
        <TagsSelection
          key={getValues("productTypes")}
          options={productTypes}
          selectedList={getValues("productTypes")}
          onCancel={() => setShowTagsModal(false)}
          onSubmit={(list) => {
            setValue("productTypes", list);
            setShowTagsModal(false);
          }}
        />
      </Modal>
      <Modal
        visible={showOpeningHoursModal}
        title="Add opening hours"
        width={780}
        onClose={() => setShowOpenHoursModal(false)}
      >
        <OpenHours
          data={getValues("openHours") || []}
          onCancel={() => setShowOpenHoursModal(false)}
          onSubmit={(openHours) => {
            setShowOpenHoursModal(false);
            setValue("openHours", openHours);
          }}
        />
      </Modal>
    </>
  );
};

export default AddEatInfor;
