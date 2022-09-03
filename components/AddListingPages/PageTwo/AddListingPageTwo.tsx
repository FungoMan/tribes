import { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import Input from "components/Input/Input";
import Question from "components/Question/Question";
import SectionLayout from "components/SectionLayout/SectionLayout";
import Select from "components/Select/Select";
import SelectInput from "components/SelectInput/SelectInput";
import {
  countryList,
  locations,
  formattedAreaCodes,
  socialMediaOptions,
} from "constant";
import Image from "next/image";
import { IAddListingForm } from "pages/add-listing";
import { formatSelectInputValue, removeZeroInPhoneNumber } from "utils";
import { IOption } from "type";

interface AddListingProps {
  onPrevPage: () => void;
  onNextPage: () => void;
  onUpdateFormData: (data: { [key: string]: any }) => void;
  show: boolean;
  data: IAddListingForm;
}

const AddListingPageTwo = (props: AddListingProps) => {
  const { data, show, onUpdateFormData, onNextPage, onPrevPage } = props;
  const [isOnlineLocation, setIsOnlineLocation] = useState(false);

  const { register, handleSubmit, getValues, setValue, watch } = useForm({
    defaultValues: {
      businessName: data.businessName,
      description: data.description,
      isOnline: data.description,
      city: data.description,
      country: data.country,
      address: data.address,
      additionalAddress: data.additionalAddress,
      contact: data.contact,
      email: data.email,
      socialMedia: data.socialMedia,
      typeMedia: data?.typeMedia,
    },
  });

  const [country, setCountry] = useState();

  if (!show) {
    return null;
  }

  const onSubmit = (form) => {
    onUpdateFormData(form);
    onNextPage();
  };

  const formattedSocialMediaOptions = socialMediaOptions.map((item) => ({
    label: (
      <div className="flex gap-2 items-center">
        <Image src={item.icon} width={20} alt="icon_social" layout="fixed" />{" "}
        {item.label}
      </div>
    ),
    value: item.value,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SectionLayout title="Add a new listing">
        <p>How can we find this place</p>
        <br />
        <Question show question="Name & Description">
          <Input
            required
            label="Business name"
            placeholder="Name of the business"
            register={register("businessName")}
          />
          <br />
          <Input
            register={register("description")}
            placeholder="Description of property (optional)"
            size="large"
          />
        </Question>
        <Question show question="Address">
          <Checkbox
            label="Online business with no address"
            // name="isOnline"
            value={"on"}
            register={register("isOnline")}
            onChange={() => setIsOnlineLocation(!isOnlineLocation)}
          />
          <br />
          {!isOnlineLocation && (
            <>
              <Input
                register={register("city")}
                label="City/Town, State/Province/Region"
                placeholder="50 Bussorah St, Singapore 199466"
              />
              <br />
              <Select
                required
                label="Country"
                placeholder="Please select your country"
                options={locations}
                value={getValues("country")}
                onChange={(e) => {
                  setCountry(e.value);
                  setValue("country", e.value);
                }}
              />
              <br />
              <Input
                required
                register={register("address")}
                label="Street address"
                placeholder="50 Bussorah St, Singapore 199466"
              />
              <br />
              <Input
                register={register("additionalAddress")}
                size="large"
                placeholder="Additional address information (optional)"
              />
            </>
          )}
          {isOnlineLocation && (
            <Select
              required
              label="Country"
              placeholder="Please select your country"
              options={locations}
              value={getValues("country")}
              onChange={(e) => {
                setCountry(e.value);
                setValue("country", e.value);
              }}
            />
          )}
        </Question>
        <Question show question="Contact">
          <SelectInput
            defaultValue={{
              select: {
                label: "Singapore",
                value: "+65",
              },
              input: "",
            }}
            required
            label="Phone number"
            selectPlaceholder="Area code"
            placeholder="Store’s phone number"
            shouldControlShowValue
            options={formattedAreaCodes}
            value={formatSelectInputValue(
              getValues("contact"),
              formattedAreaCodes
            )}
            onChange={(e) => {
              setValue("contact", removeZeroInPhoneNumber(e));
            }}
          />
          <br />
          <Input
            label="Email"
            required
            type="email"
            register={register("email")}
            size="large"
            placeholder="Email"
          />
        </Question>
        <Question show question="Social media">
          <SelectInput
            label="Social media (optional )"
            placeholder="https://www.facebook.com/YourFacebook"
            onChange={(e) => {
              // console.log(e.select)
              const select = e.select as IOption;
              setValue("socialMedia", e.input);
              setValue("typeMedia", select.value);
            }}
            options={formattedSocialMediaOptions}
            value={formatSelectInputValue(
              getValues("socialMedia"),
              formattedSocialMediaOptions
            )}
          />
        </Question>
        <br />
        <br />
        <br />
        <div className="flex gap-3 sm:gap-10  text-sm">
          <button
            className="underline w-max cursor-pointer flex items-end text-left"
            onClick={onPrevPage}
          >
            Go back
          </button>
          <Button
            text="Continue"
            size="small"
            width={270}
            type="submit"
            disabled={
              !(
                country &&
                watch("businessName") &&
                watch("email") &&
                watch("contact") &&
                (isOnlineLocation || watch("address"))
              )
            }
          />
        </div>
      </SectionLayout>
    </form>
  );
};

export default AddListingPageTwo;
