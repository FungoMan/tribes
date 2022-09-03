import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import get from "lodash/get";

import Badge from "components/Badge/Badge";
import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import Input from "components/Input/Input";
import Question from "components/Question/Question";
import SectionLayout from "components/SectionLayout/SectionLayout";
import Modal from "components/Modal/Modal";
import Break from "components/Break/Break";
import OpenHours from "components/OpenHours/OpenHours";
import { Categories, YesNo } from "enums";
import TagsSelection from "components/TagsSelection/TagsSelection";
import { IOption } from "type";
import PreviewValue from "components/AddListingPages/PreviewValue/PreviewValue";
import { seeDoAssociatedCategories, seeDoTags } from "../constant";
import Upload from "components/Upload/Upload";
import Icon from "components/Icon/Icon";
import { IAddListingForm } from "pages/add-listing";
import Select from "components/Select/Select";
import { currencyOptions } from "constant";
import CategoryLinkApi from "../../../../services/category-link";
import TagApi from "../../../../services/tag";
import ProductTypeApi from "../../../../services/product-type";
import { getOptionsMappedFromResponse } from "utils";

interface AddSeeAndDoInforProps {
  isEdit?: boolean;
  facilityMode?: boolean;
  data: { [key: string]: any };
  show?: boolean;
  onPrevPage?: () => void;
  onPreview?: (data: IAddListingForm) => void;
  onEdit?: (data: IAddListingForm) => void;
}

const AddSeeAndDoInfor = (props: AddSeeAndDoInforProps) => {
  const { isEdit, data, show, facilityMode, onEdit, onPrevPage, onPreview } =
    props;

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
      categoryLinks: data.categoryLinks,
      productTypes: data.productTypes,
      describeTags: data.describeTags,
      images: data.images,
      currency: data.currency,
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
      agreePolicies: data.agreePolicies,
      openHours: data.openHours,
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
    : "Add a thing to do";

  const subTitle = facilityMode
    ? undefined
    : isEdit
    ? undefined
    : "After you complete this form, you'll be able to make changes before submitting.";

  const sectionContainer = facilityMode ? "pt-0" : undefined;

  useEffect(() => {
    // Category links
    CategoryLinkApi.getCategoryLinksByCategoryId(Categories.SEE_AND_DO)
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

  const onSubmit = (data) => {
    onPreview?.(data);
    onEdit?.(data);
  };

  const handleSelectCategoryLink = async (opt) => {
    console.log("opt", opt);
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
        <Break />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Question question="What is the category best associated with this service? *">
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
            question="What category best describe this place?"
            instruction="Select 5 max"
            optional
          >
            <PreviewValue valueKey="tags" value={getValues("productTypes")} />
            <br />
            <Button
              text="Edit property"
              width="fit-content"
              size="small"
              onClick={() => setShowTagsModal(true)}
            />
          </Question>
          <Question question="What are the opening hours? *">
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
          <Question question="What tags best describe this place? " optional>
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
                data.relationship === YesNo.NO
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
        mobileFullHeight
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
        mobileFullHeight
        onClose={() => setShowOpenHoursModal(false)}
      >
        <OpenHours
          data={getValues("openHours")}
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

export default AddSeeAndDoInfor;
