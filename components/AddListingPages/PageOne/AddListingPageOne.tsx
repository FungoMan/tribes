import React, { useEffect, useState } from "react";
import Link from "next/link";

import SectionLayout from "components/SectionLayout/SectionLayout";
import { roleList } from "constant";
import Badge from "components/Badge/Badge";
import Button from "components/Button/Button";
import Select from "components/Select/Select";

import DatePicker from "components/DatePicker/DatePicker";

import SearchListing, {
  listingTypes,
} from "components/AddListingPages/PageOne/SearchListing/SearchListing";
import RelationshipToBusiness from "components/AddListingPages/PageOne/RelationshipToBusiness/RelationshipToBusiness";
import ChooseCategory from "components/AddListingPages/PageOne/ChooseCategory/ChooseCategory";
import Question from "components/Question/Question";
import { Categories, YesNo } from "enums";
import BizListingApi from "../../../services/biz-listing";
import useTrans from "hooks/useTrans";

interface AddListingProps {
  onUpdateFormData: (data: { [key: string]: any }) => void;
  onNextPage: () => void;
  show: boolean;
}

const AddListingPageOne = (props: AddListingProps) => {
  const { show, onUpdateFormData, onNextPage } = props;
  const trans = useTrans();
  const [category, setCategory] = useState<Categories | undefined>();
  const [relationship, setRelationship] = useState<YesNo | undefined>();
  const [listing, setListing] = useState<listingTypes>();
  const [bizListing, setBizListing] = useState([]);
  const [role, setRole] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState<YesNo | undefined>();
  const [openDate, setOpenDate] = useState<Date | undefined>();

  useEffect(() => {
    const getBizListingsByCategoryId = async (categoryId) => {
      const data = await BizListingApi.getBizListingsByCategoryId(categoryId);
      setBizListing(data.data.data);
    };

    if (category && relationship) {
      getBizListingsByCategoryId(category).catch(console.error);
    }
  }, [category, relationship]);

  if (!show) {
    return null;
  }

  const isContinueBtnEnable =
    (category &&
      relationship &&
      listing &&
      role &&
      ((isOpen === YesNo.NO && openDate) || isOpen === YesNo.YES)) ||
    (category && relationship === YesNo.NO && listing);

  return (
    <SectionLayout title={trans.addNewListing}>
      <p>
        Thank you for sharing with us a new place to list on Tribes. We thrive
        better as a community and your contribution will help enrich the
        experience of Tribes members! To get started, please share more about
        the place.
      </p>
      <Link href="/add-listing/guide">View our listing guidelines</Link>
      <br />
      <Question question="Firstly, tell us. Which category would you like to add? *">
        <ChooseCategory
          category={category}
          setCategory={(e) => setCategory(e)}
        />
      </Question>
      <Question
        show={!!category}
        question="Are you the owner, employee, or official representative of this place?"
      >
        <RelationshipToBusiness
          relationship={relationship}
          setRelationship={(e) => setRelationship(e)}
        />
      </Question>
      <Question
        show={!!relationship}
        question="Let’s find out if business is already listed in Tribes."
      >
        <SearchListing
          isClaimListing
          relationship={relationship}
          listing={listing}
          bizListing={bizListing}
          setListing={(e) => {
            setListing(e);
            setRole(undefined);
            setIsOpen(undefined);
            setOpenDate(undefined);
          }}
        />
      </Question>
      <Question
        show={relationship === YesNo.YES && listing === YesNo.NO}
        question="What is your role?"
      >
        <Select prefixIcon="search" options={roleList} onChange={setRole} />
      </Question>
      <Question show={!!role} question="Is this busines currently open?">
        <div className="flex gap-2">
          <Badge
            onClick={() => setIsOpen(YesNo.YES)}
            selected={isOpen === YesNo.YES}
            text={YesNo.YES}
          />
          <Badge
            onClick={() => setIsOpen(YesNo.NO)}
            selected={isOpen === YesNo.NO}
            text={YesNo.NO}
          />
        </div>
      </Question>
      <Question show={isOpen === YesNo.NO} question="What is open date?">
        <DatePicker onChange={setOpenDate} value={openDate} prefixIcon />
      </Question>
      <br />
      <br />
      <br />
      <Button
        text="Continue"
        size="small"
        disabled={!isContinueBtnEnable}
        width={270}
        onClick={() => {
          onUpdateFormData({
            category,
            relationship,
            listing,
            role,
            isOpen,
            openDate,
          });
          onNextPage();
        }}
      />
    </SectionLayout>
  );
};

export default AddListingPageOne;
