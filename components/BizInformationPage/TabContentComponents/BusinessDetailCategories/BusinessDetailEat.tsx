import AddEatInfor from "components/AddListingPages/PageThree/AddInforSections/AddEatInfor";
import PreviewValue from "components/AddListingPages/PreviewValue/PreviewValue";
import Badge from "components/Badge/Badge";
import Break from "components/Break/Break";
import Button from "components/Button/Button";
import Question from "components/Question/Question";
import SectionLayout from "components/SectionLayout/SectionLayout";
import { fakeSubCateList } from "constant";
import { IAddListingForm } from "pages/add-listing";
import React, { useState } from "react";
import { isArray } from "utils";

interface BusinessDetailProps {
  formData: { [key: string]: any };
  submitFormData?: (form: IAddListingForm) => void;
}

const BusinessDetailEat = (props: BusinessDetailProps) => {
  const { formData, submitFormData } = props;
  const {
    categoryLinks,
    viewProductTypes,
    openHours,
    minPrice,
    maxPrice,
    currency,
    mealsKind,
    placeGoodFor,
    parking,
    atmosphere,
    payment,
    additionalServices,
  } = formData;

  const [isEdit, setIsEdit] = useState(false);
  return (
    <React.Fragment>
      <SectionLayout
        title="Business detail"
        show={!isEdit}
        containerClassName="w-full px-[30px]"
      >
        <Break />
        <Question
          question="What category best describes this place?"
          childrenClassName="flex"
        >
          {categoryLinks && (
            <Badge variant="no-outlined">{categoryLinks.label}</Badge>
          )}
        </Question>
        <Question
          question="What cuisines would you use to describe this place?"
          childrenClassName="flex flex-wrap gap-3"
        >
          {isArray(viewProductTypes) &&
            viewProductTypes.map((item) => (
              <Badge variant="no-outlined" key={item} text={item.label} />
            ))}
        </Question>
        <Question question="What are the opening hours?" optional>
          <PreviewValue valueKey="openHours" value={openHours} />
        </Question>
        <Question question="What’s the average price range of a meal?">
          {currency &&
            minPrice &&
            maxPrice &&
            `${currency}${minPrice} - ${currency}${maxPrice}`}
        </Question>
        <Question
          question="What kind of meals does this place serve?"
          childrenClassName="flex flex-wrap gap-3"
        >
          {Array.isArray(mealsKind) &&
            mealsKind.map((item) => (
              <Badge variant="no-outlined" key={item} text={item} />
            ))}
        </Question>
        <Question
          question="What is this place good for?"
          childrenClassName="flex flex-wrap gap-3"
        >
          {Array.isArray(placeGoodFor) &&
            placeGoodFor.map((item) => (
              <Badge variant="no-outlined" key={item} text={item} />
            ))}
        </Question>
        <Question
          question="What best describe this place’s atmosphere?"
          childrenClassName="flex flex-wrap gap-3"
        >
          {Array.isArray(atmosphere) &&
            atmosphere?.map((item) => (
              <Badge variant="no-outlined" key={item} text={item} />
            ))}
        </Question>
        <Question
          question="Are there parking area?"
          childrenClassName="flex flex-wrap gap-3"
        >
          {parking && <Badge variant="no-outlined" text={parking} />}
        </Question>
        <Question
          question="What Features and amneties does this restaurant have?"
          childrenClassName="flex flex-wrap gap-3"
        >
          {Array.isArray(payment) &&
            payment.map((item) => (
              <Badge variant="no-outlined" key={item} text={item} />
            ))}
        </Question>
        <Question
          question="Additional?"
          optional
          childrenClassName="flex flex-wrap gap-3"
        >
          {Array.isArray(additionalServices) &&
            additionalServices.map((item) => (
              <Badge variant="no-outlined" key={item} text={item} />
            ))}
        </Question>
        <Break />
        <div>
          <Button
            size="small"
            text="Edit information"
            width={250}
            onClick={() => setIsEdit(true)}
          />
        </div>
      </SectionLayout>
      <AddEatInfor
        data={formData}
        show={isEdit}
        isEdit={true}
        onEdit={(data) => submitFormData?.(data)}
        onPrevPage={() => setIsEdit(false)}
      />
    </React.Fragment>
  );
};

export default BusinessDetailEat;
