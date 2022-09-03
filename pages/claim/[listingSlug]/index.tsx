import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import Input from "components/Input/Input";
import ListingCard from "components/ListingCard/ListingCard";
import Question from "components/Question/Question";
import SectionLayout from "components/SectionLayout/SectionLayout";
import Select from "components/Select/Select";
import TierTable from "components/TierTable/TierTable";
import { listingSearchResult, loginInforItem, roleList } from "constant";
import { ClaimStep, Tiers } from "enums";
import { get } from "lodash";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BizListingApi from "../../../services/biz-listing";
import BizListingRevisionApi from "services/biz-listing-revision";
import { UserInforContext } from "Context/UserInforContext";
import Head from "next/head";

const defaultListing = listingSearchResult[0];

const ClaimListing = (context) => {
  const [metaTitle, setMetaTitle] = useState(
    "Claim your Listing | Tribes by HHWT"
  );
  const [metaDescription, setMetaDescription] = useState(
    "Own a store? Claim full control of your page by claiming it!"
  );

  const { user, updateUser } = useContext(UserInforContext);
  const { firstStep } = context;
  const [listing, setListing] = useState<{ [key: string]: any }>({});
  const [claimStep, setClaimStep] = useState(firstStep);
  const {
    handleSubmit,
    setValue,
    getValues,
    register,
    formState: { isDirty, isValid },
  } = useForm({ mode: "onChange" });
  const [isPayYearly, setIsPayYearly] = useState(false);
  const router = useRouter();
  const {
    query: { listingSlug: listingId },
  } = useRouter();

  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    const getListingData = async (listingId) => {
      let data =
        userInfo.type_handle === "Claim"
          ? await BizListingApi.getBizListingById(listingId)
          : userInfo.role
          ? await BizListingApi.getBizListingById(listingId)
          : await BizListingRevisionApi.getBizListingRevisionById(listingId);
      setListing(data.data.data);
      updateUser({
        biz_id: listingId,
        current_listing_slug: get(data, "data.data.attributes.slug"),
        biz_slug: get(data, "data.data.attributes.slug"),
        pay_price: "300",
      });
    };
    if (listingId) {
      getListingData(listingId);
    }
  }, [listingId]);

  const agreePolicies = (
    <div>
      I have read and accept Tribes{" "}
      <span style={{ color: "#3faeff" }}>
        <Link href="/terms-conditions">Terms of Use</Link>
      </span>{" "}
      and{" "}
      <span style={{ color: "#3faeff" }}>
        <Link href="/policies">Privacy Policy.</Link>
      </span>
    </div>
  );

  const onSubmit = async (form) => {
    let userInfo;
    if (typeof localStorage.getItem("user") !== null) {
      userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    }
    let role = get(form, "role.value");

    if (!role) {
      return alert("Please select your role");
    }

    setClaimStep(ClaimStep.CHOOSE_TIER);
    userInfo = {
      ...userInfo,
      role: get(form, "role.value"),
    };
    localStorage.setItem("user", JSON.stringify(userInfo));
  };

  const handleDirectToVerification = (tier: Tiers) => {
    router.push({
      pathname: "/biz/verify",
      query: {
        id: listingId,
        isPaid: !(tier === Tiers.FREE),
        tier: tier,
      },
    });
  };

  return (
    <React.Fragment>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Head>
      <SectionLayout
        title="Claim your FREE Listing"
        show={claimStep === ClaimStep.CLAIM_FREE_LISTING}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 sm:w-3/4 w-full">
            <ListingCard listing={listing} />
            <Select
              label="Role of business"
              placeholder="Select one"
              value={getValues("role")}
              options={roleList}
              onChange={(e) => setValue("role", e)}
            />
            <Checkbox
              register={register("getNotified")}
              label="Get notified by email about new reviews, best practices, and more to help you improve your online reputation and build your business."
            />
            <Question question="Please click the statements below to indicate you understand and accept these terms.">
              <Checkbox
                register={register("isAuthorized", {
                  required: "Please confirm",
                })}
                label="I hereby certify that I am an authorized representative or affiliate of this establishment and that I am authorized to register as a business representative. I have not entered any false or fraudulent information into this form and that if I knowingly claim an incorrect listing, legal action may be taken against me. I also acknowledge that Tribes may reveal my name and affiliation to other confirmed representatives of this establishment."
              />
              <br />
              <Checkbox
                register={register("agreePolicies", {
                  required: "Please confirm",
                })}
                label={agreePolicies}
              />
            </Question>
            <Button
              type="submit"
              text="Continue"
              size="small"
              width={280}
              disabled={!isValid} // here
            />
          </div>
        </form>
      </SectionLayout>
      <SectionLayout
        title="Choose tier"
        subTitle="Choose the tier suitable for your business. You can change tier anytime."
        show={claimStep === ClaimStep.CHOOSE_TIER}
      >
        <TierTable
          isPayYearly={isPayYearly}
          onSetIsPayYearly={(e) => setIsPayYearly(e)}
          onDirectToVerification={handleDirectToVerification}
        />
      </SectionLayout>
    </React.Fragment>
  );
};

export async function getServerSideProps(context) {
  // Pass data to the page via props
  return {
    props: {
      firstStep: context.query.firstStep || ClaimStep.CLAIM_FREE_LISTING,
    },
  };
}

export default ClaimListing;
