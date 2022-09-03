import Break from "components/Break/Break";
import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Question from "components/Question/Question";
import Radio from "components/Radio/Radio";
import SectionLayout from "components/SectionLayout/SectionLayout";
import SelectInput from "components/SelectInput/SelectInput";
import Upload from "components/Upload/Upload";
import { formattedAreaCodes, locations, phoneAreaCodes } from "constant";
import { get } from "lodash";
import { Router } from "next/router";
import { IAddListingForm } from "pages/add-listing";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  censoredPhoneNumber,
  formatSelectInputValue,
  isPaidUser,
  removeZeroInPhoneNumber,
} from "utils";
import { useRouter } from "next/router";
import BizListingRevision from "services/biz-listing-revision";
import { UserInforContext } from "Context/UserInforContext";

import styles from "./TabContent.module.scss";

export const socialMedias = [
  { label: <Icon icon="twitter-logo" />, value: "twitter" },
  { label: <Icon icon="facebook-color" />, value: "facebook" },
  { label: <Icon icon="instagram-outlined" />, value: "instagram" },
];

interface BusinessInformationProps {
  listing: any;
  loading?: boolean;
  isRevision?: boolean;
  onSubmit: (data: any) => void;
}

const BusinessInformation = (props: BusinessInformationProps) => {
  const { listing: formData, loading, isRevision, onSubmit } = props;
  const router = useRouter();
  const { user, updateUser } = useContext(UserInforContext);

  const [isEdit, setIsEdit] = useState(false);
  const isPaid = isPaidUser(get(formData, "expiration_date"));

  const { register, handleSubmit, setValue, getValues, reset } = useForm();

  useEffect(() => {
    reset({
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      phoneNumber: formData.phone_number,
      logo: formData.logo,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      country: formData.country,
      twitter: get(formData, "social_info.twitter"),
      facebook: get(formData, "social_info.facebook"),
      instagram: get(formData, "social_info.instagram"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleCancel = () => {
    setIsEdit(false);
  };

  const onSubmitForm = async (data) => {
    let dataListing = {
      description: data.description,
      phone_number: data.phoneNumber,
      logo: data.logo,
      email: data.email,
      address: data.address,
      city: data.city,
      country: data.country,
      social_info: {
        facebook: data.facebook ? data.facebook : null,
        instagram: data.instagram ? data.instagram : null,
        twitter: data.twitter ? data.twitter : null,
      },
    };
    let createData = {
      ...dataListing,
      name: data.name,
      slug: formData.slug,
    };
    let updateData = {
      ...dataListing,
      is_accepted: false,
      expiration_date: formData.expiration_date,
    };
    if (isRevision) {
      await BizListingRevision.updateBizListingRevision(
        formData.id,
        updateData
      );
    } else {
      await BizListingRevision.createCustom(createData);
    }
    setIsEdit(false);
  };

  const updateShowSocialMedia = ({ type, value }) => {
    return;
  };

  const SocialRadio = ({ type, value }) =>
    !isPaid ? (
      <Radio
        name="social-media"
        onClick={() => updateShowSocialMedia({ type, value })}
      />
    ) : null;

  const UpgradeNow = () =>
    isPaid ? null : (
      <div className="flex justify-between">
        <div>
          Chooose which social media to show on store page. Upgrade to Basic
          Tier to show all.
        </div>
        <div
          className={styles.upgrade_now}
          onClick={() => router.push(`/claim/${get(formData, "listing_id")}`)}
        >
          Upgrade now
        </div>
      </div>
    );

  return (
    <React.Fragment>
      <SectionLayout
        loading={loading}
        show={!isEdit}
        title="Business information"
        className={styles.information}
        containerClassName="w-full"
        childrenClassName={styles.information_children}
      >
        <Break />
        <Upload
          type="avatar"
          disabled
          fileList={getValues("logo")}
          className={styles.logo}
        />
        <br />
        <div className={styles.name}>{getValues("name")}</div>
        <p>{getValues("description")}</p>
        <Question question="Address" childrenClassName="flex gap-3">
          <Icon icon="map" />
          {getValues("address")}
        </Question>
        <Question question="Official contact" childrenClassName="flex gap-3">
          <Icon icon="phone-color" />
          <p>
            {isPaid
              ? getValues("phoneNumber")
              : censoredPhoneNumber(getValues("phoneNumber"))}
          </p>
        </Question>
        <Question
          question="Social media"
          childrenClassName="flex flex-col gap-3"
        >
          <UpgradeNow />
          <Input
            value={getValues("twitter")}
            readOnly
            prefix={<Icon icon="twitter-logo" />}
            suffix={<SocialRadio type="" value={getValues("twitter")} />}
            placeholder="https://www.twitter.com/YourTwitter"
          />
          <Input
            value={getValues("facebook")}
            readOnly
            prefix={<Icon icon="facebook-color" />}
            suffix={
              <SocialRadio type="facebook" value={getValues("facebook")} />
            }
            placeholder="https://www.facebook.com/YourFacebook"
          />
          <Input
            value={getValues("instagram")}
            readOnly
            prefix={<Icon icon="instagram-outlined" />}
            suffix={<SocialRadio type="instagram" value="" />}
            placeholder="https://www.instagram.com/YourInstagram"
          />
        </Question>
        <Break />
        <Button
          text="Edit information"
          className={styles.edit_btn}
          onClick={() => {
            setIsEdit(true);
          }}
        />
      </SectionLayout>

      <SectionLayout
        title="Business information"
        className={styles.information}
        containerClassName="w-full"
        show={isEdit}
      >
        <Break />
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Upload
            key={getValues("logo")}
            type="avatar"
            className={styles.logo}
            fileList={getValues("logo")}
            onChange={(imgs) => setValue("logo", imgs)}
          />
          <Question question="Name & Desccription">
            <Input label="Business name" register={register("name")} readOnly />
            <br />
            <Input
              label="Description of property"
              register={register("description")}
            />
          </Question>
          <Question question="Address" childrenClassName="flex flex-col gap-3">
            {/* <Input
              register={register("city")}
              label="City/Town, State/Province/Region"
              placeholder="City/Town, State/Province/Region of business"
            /> */}
            <Input
              register={register("address")}
              label="Street address"
              placeholder="Address of business"
            />
            {/* <Input
              register={register("additionalAddress")}
              placeholder="Additional address information (optional)"
            /> */}
          </Question>
          <Question
            show
            question="Contact"
            childrenClassName="flex flex-col gap-3"
          >
            <SelectInput
              label="Phone number"
              placeholder="Phone number"
              selectPlaceholder="Area code"
              options={formattedAreaCodes}
              shouldControlShowValue
              defaultValue={formatSelectInputValue(
                getValues("phoneNumber"),
                phoneAreaCodes
              )}
              onChange={(e) =>
                setValue("phoneNumber", removeZeroInPhoneNumber(e))
              }
            />
            <Input
              register={register("email")}
              size="large"
              placeholder="Email (optional)"
            />
          </Question>
          <Question
            show
            question="Social media"
            childrenClassName="flex flex-col gap-3"
          >
            <UpgradeNow />
            <Input
              prefix={<Icon icon="twitter-logo" />}
              placeholder="https://www.twitter.com/YourTwitter"
              register={register("twitter")}
            />
            <Input
              prefix={<Icon icon="facebook-color" />}
              placeholder="https://www.facebook.com/YourFacebook"
              register={register("facebook")}
            />
            <Input
              prefix={<Icon icon="instagram-outlined" />}
              placeholder="https://www.instagram.com/YourInstagram"
              register={register("instagram")}
            />
          </Question>
          <Break />
          <div className="flex gap-3">
            <Button
              text="Cancel"
              variant="secondary"
              width={200}
              onClick={handleCancel}
            />
            <Button text="Apply change" width={300} type="submit" />
          </div>
        </form>
      </SectionLayout>
    </React.Fragment>
  );
};

export default BusinessInformation;
