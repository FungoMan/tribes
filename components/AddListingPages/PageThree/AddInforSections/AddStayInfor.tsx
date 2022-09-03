import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import Badge from "components/Badge/Badge";
import Button from "components/Button/Button";
import Input from "components/Input/Input";
import Question from "components/Question/Question";
import SectionLayout from "components/SectionLayout/SectionLayout";
import Checkbox from "components/Checkbox/Checkbox";
import Break from "components/Break/Break";
import Modal from "components/Modal/Modal";
import OpenHours from "components/OpenHours/OpenHours";
import { Categories, YesNo } from "enums";
import {
  accommodation,
  areas,
  associatedCategories,
  foodOptions,
  nonHalalActivities,
  prayerFacilities,
} from "../constant";
import TagsSelection from "components/TagsSelection/TagsSelection";
import { IOption } from "type";
import PreviewValue from "components/AddListingPages/PreviewValue/PreviewValue";
import Upload from "components/Upload/Upload";
import { IAddListingForm } from "pages/add-listing";
import Icon from "components/Icon/Icon";
import Select from "components/Select/Select";
import { currencyOptions } from "constant";
import CategoryLinkApi from "../../../../services/category-link";
import get from "lodash/get";
import TagApi from "../../../../services/tag";
import ProductTypeApi from "../../../../services/product-type";
import { getOptionsMappedFromResponse } from "utils";

interface AddStayInforProps {
  isEdit?: boolean;
  facilityMode?: boolean;
  data: { [key: string]: any };
  show?: boolean;
  onPrevPage?: () => void;
  onPreview?: (data: IAddListingForm) => void;
  onEdit?: (data: IAddListingForm) => void;
}

const AddStayInfor = (props: AddStayInforProps) => {
  const { isEdit, facilityMode, data, show, onEdit, onPrevPage, onPreview } =
    props;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      categoryLinks: data?.categoryLinks,
      productTypes: data?.productTypes,
      describeTags: data?.describeTags,
      currency: data?.currency,
      minPrice: data?.minPrice,
      images: data?.images,
      maxPrice: data?.maxPrice,
      foodOptions: data?.foodOptions,
      paryerFacilities: data?.paryerFacilities,
      foodOptionsRamadan: data?.foodOptionsRamadan,
      nonHalalActivities: data?.nonHalalActivities,
      agreePolicies: data?.agreePolicies,
      openHours: data?.openHours,
    },
  });

  const initCategoryLink = get(data, "categoryLinks.id") || "";

  const [showTagsModal, setShowTagsModal] = useState(false);
  const [showOpeningHoursModal, setShowOpenHoursModal] = useState(false);
  const [categoryLinks, setCategoryLinks] = useState<any>([]);
  const [productTypes, setProductTypes] = useState<any>([]);
  const [describeTags, setDescribeTags] = useState<any>([]);
  const [selectCategoryLink, setSelectCategoryLink] =
    useState<string>(initCategoryLink);

  const title = facilityMode
    ? undefined
    : isEdit
    ? "Business Detail"
    : "Add a place to stay";

  const subTitle = facilityMode
    ? undefined
    : isEdit
    ? undefined
    : "After you complete this form, you'll be able to make changes before submitting.";

  const sectionContainer = facilityMode ? "pt-0" : undefined;

  useEffect(() => {
    // Category links
    CategoryLinkApi.getCategoryLinksByCategoryId(Categories.STAY)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectCategoryLink = async (opt) => {
    setValue("categoryLinks", opt.id);
    setSelectCategoryLink(opt.id);

    const data = await ProductTypeApi.getProductTypeByCategoryLinkId(opt.id);
    setProductTypes(getOptionsMappedFromResponse(data));
    setValue("productTypes", []);
  };

  const onSubmit = (data) => {
    onPreview?.(data);
    onEdit?.(data);
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
        <Break />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Question
            show={!facilityMode}
            question="What is the category best associated with this accommodation? *"
          >
            <div className="flex flex-wrap gap-2">
              {Array.isArray(categoryLinks) &&
                categoryLinks.map((opt) => (
                  <Badge
                    key={opt.id}
                    text={opt.attributes.label}
                    selected={selectCategoryLink === opt.id}
                    onClick={() => handleSelectCategoryLink(opt)}
                  />
                ))}
            </div>
            <p>A hotel, motel, or bed and breakfast.</p>
          </Question>
          <Question
            show={!facilityMode}
            question="What type of property best describe this accommodation?"
            instruction="Select 5 max"
            optional
          >
            <PreviewValue valueKey="tags" value={getValues("productTypes")} />
            <br />
            <Button
              text="Edit Property"
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
                    label={item.attributes.label}
                    value={item.id}
                    className="w-1/2"
                    register={register("describeTags")}
                  />
                ))}
            </div>
          </Question>
          <Question
            show={!facilityMode}
            question="What’s the average price range of this service?"
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
                  placeholder="Minimum Price"
                  className="w-full sm:w-1/2"
                  register={register("minPrice")}
                />
                <Input
                  placeholder="Maximum Price"
                  className="w-full sm:w-1/2"
                  register={register("maxPrice")}
                />
              </div>
            </div>
          </Question>
          <Question
            question="What are the Halal food options available?"
            optional
          >
            <div className="flex flex-wrap gap-y-5 w-100 sm:w-100 lg:w-5/6 xl:w-3/5">
              {foodOptions.map((item) => (
                <Checkbox
                  key={item.label}
                  label={item.label}
                  value={item.label}
                  className="w-1/2"
                  register={register("foodOptions")}
                />
              ))}
            </div>
          </Question>
          <Question
            question="What are the prayer facilities available?"
            optional
          >
            <div className="flex flex-wrap gap-y-5 w-100 sm:w-100 lg:w-5/6 xl:w-3/5">
              {prayerFacilities.map((item) => (
                <Checkbox
                  key={item.label}
                  label={item.label}
                  value={item.label}
                  className="w-1/2"
                  register={register("paryerFacilities")}
                />
              ))}
            </div>
          </Question>
          <Question
            question="What are the Halal food options available?"
            instruction="Services during Ramadan: "
            optional
          >
            <div className="flex flex-wrap gap-y-5 w-100 sm:w-100 lg:w-5/6 xl:w-3/5">
              {prayerFacilities.map((item) => (
                <Checkbox
                  key={item.label}
                  id={`${item.label} - ramadan`}
                  label={item.label}
                  value={item.label}
                  className="w-1/2"
                  register={register("foodOptionsRamadan")}
                />
              ))}
            </div>
          </Question>
          <Question
            question="What are the non-Halal activities in the hotel?"
            optional
          >
            <div className="flex flex-wrap gap-y-5 w-100 sm:w-100 lg:w-5/6 xl:w-3/5">
              {nonHalalActivities.map((item) => (
                <Checkbox
                  key={item.label}
                  label={item.label}
                  value={item.label}
                  className="w-1/2"
                  register={register("nonHalalActivities")}
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
              text="Go back"
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
        visible={showOpeningHoursModal}
        title="Add opening hours"
        width={780}
        mobileFullHeight
        onClose={() => setShowOpenHoursModal(false)}
      >
        <OpenHours
          data={getValues("openHours") || []}
          onCancel={() => setShowOpenHoursModal(false)}
          onSubmit={(openHours) => {
            setShowOpenHoursModal(false);
            console.log(openHours);
            setValue("openHours", openHours);
          }}
        />
      </Modal>
      <Modal
        visible={showTagsModal}
        title="Add property"
        subTitle="Select max 5"
        width={780}
        mobileFullHeight
        onClose={() => setShowTagsModal(false)}
      >
        <TagsSelection
          options={productTypes}
          selectedList={getValues("productTypes")}
          onCancel={() => setShowTagsModal(false)}
          onSubmit={(list) => {
            setValue("productTypes", list);
            setShowTagsModal(false);
          }}
        />
      </Modal>
    </>
  );
};

export default AddStayInfor;
