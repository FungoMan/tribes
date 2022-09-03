import { useRouter } from "next/router";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import classNames from "classnames";

import Upload from "components/Upload/Upload";
import Button from "components/Button/Button";
import Input from "components/Input/Input";
import Modal, { ModalHeader } from "components/Modal/Modal";
import Radio from "components/Radio/Radio";
import Select from "components/Select/Select";
import {
  countryList,
  educationLevels,
  genderOptions,
  industryList,
} from "constant";

import styles from "styles/Auth.module.scss";
import DatePicker from "components/DatePicker/DatePicker";
import { useForm } from "react-hook-form";
import UserApi from "../../../services/user";
import AuthApi from "../../../services/auth";
import CategoryLinkAPi from "services/category-link";
import { get } from "lodash";
import categoryLink from "services/category-link";
import moment from "moment";
import Head from "next/head";

export enum ProfileSteps {
  STEP_ONE = "step_one",
  STEP_TWO = "step_two",
}

const StepOne = ({
  show,
  formData,
  onNextStep,
}: {
  show?: boolean;
  formData: any;
  onNextStep: (e: FormEvent<HTMLFormElement>) => void;
}) => {
  const router = useRouter();
  const [uploadAvatar, setUploadAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [metaTitle, setMetaTitle] = useState(
    "Sign Up Today To Be Part of the Community | Tribes by HHWT"
  );
  const [metaDescription, setMetaDescription] = useState(
    "Register. Don't have a Tribes account yet? Join now to gain access to exclusive deals from Muslim Friendly brands around the world!"
  );

  const { setValue, getValues, register, handleSubmit, watch } = useForm({
    defaultValues: {
      name: formData.name,
      displayName: formData.displayName,
      country: formData.country,
      education: formData.education,
      gender: formData.gender,
      birthday: formData.birthday,
      industry: formData.industry,
    },
  });

  const [avatar, setAvatar] = useState([
    require("public/images/default-avatar.svg"),
  ]);
  // If user is come from Facebook, Google
  useEffect(() => {
    const loginFacebookCallback = async (accessToken: any) => {
      await AuthApi.loginFacebookCallback(accessToken);
    };
    const loginGoogleCallback = async (accessTokenGoogle: any) => {
      await AuthApi.loginGoogleCallback(accessTokenGoogle);
    };
    if (router.query.id_token) {
      // google has id_token
      loginGoogleCallback(router.query.access_token).catch((e) =>
        console.log(e)
      );
    } else if (router.query.access_token) {
      loginFacebookCallback(router.query.access_token).catch((e) =>
        console.log(e)
      );
    }
  }, [router]);

  const [socialUser, setSocialUser] = useState<any>();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setSocialUser(user);
      const userJson = JSON.parse(user || "");
      setValue("name", userJson.first_name);
      if (userJson.avatar) {
        setAvatar([userJson.avatar]);
      }
    }
  }, [socialUser]);

  const handleUploadAvatar = useCallback((srcAvatar) => {
    setUploadAvatar(srcAvatar[0]);
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    let userInfo;
    if (typeof localStorage.getItem("user") !== null) {
      userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    }
    const userId = userInfo.id || "0";
    let convertBirthday =
      moment(data.birthday).format("YYYY-MM-DD") + "T:00:00.000Z";

    let dataSend: any = {
      display_name: data.displayName,
      first_name: data.name,
      gender: data.gender,
      birthday: convertBirthday,
      country: data.country || null,
      confirmed: true,
      industry: data.industry,
      educate_level: data.education,
    };
    if (uploadAvatar !== "") {
      dataSend = { ...dataSend, avatar: uploadAvatar };
    }
    try {
      await UserApi.updateUser(userId, dataSend);
    } catch (err) {
      // TODO: notify error (missing template)
      setIsLoading(false);
      return false;
    }
    onNextStep(data);
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Head>
      <ModalHeader alignTitle="center">
        <div>Almost there... set up your profile</div>
      </ModalHeader>
      <form className={styles.body} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.profile_imgs}>
          <Upload
            fileList={avatar}
            type="avatar"
            onChange={handleUploadAvatar}
          />
        </div>
        <Input placeholder="Your name" register={register("name")} />
        <Input
          placeholder="Your display name"
          register={register("displayName")}
        />
        <Select
          placeholder="Your country"
          options={countryList}
          value={getValues("country")}
          onChange={(e) => setValue("country", e.value)}
        />
        <div>
          Gender
          <div className="flex gap-[30px] mt-2">
            {genderOptions.map((item) => (
              <Radio
                key={item.value}
                name="gender"
                label={item.label}
                value={item.value}
                register={register("gender")}
              />
            ))}
          </div>
        </div>
        <DatePicker
          label="Birthday"
          placeholder="dd/mm/yyyy"
          onChange={(e) => setValue("birthday", e)}
          value={getValues("birthday")}
        />
        <Select
          placeholder="Education level (Optional)"
          options={educationLevels}
          value={getValues("education")}
          onChange={(e) => setValue("education", e.value)}
        />
        <Select
          placeholder="Industry (Optional)"
          options={industryList}
          value={getValues("industry")}
          onChange={(e) => setValue("industry", e.value)}
        />
        <div className="flex justify-end">
          {/* <div className={styles.skip} onClick={() => router.push("/signup/setup-profile")}>
            Skip
          </div> */}
          <Button
            className="w-1/2"
            text="Next"
            type="submit"
            disabled={!(watch("name") && watch("gender") && watch("birthday"))}
            isLoading={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

const StepTwo = ({ show, onBackStep, onSubmit, formData }: any) => {
  const [interest, setInterest] = useState<{ [key: string]: any }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [interestingList, setInterestingList] = useState<
    { [key: string]: any }[]
  >([]);

  const [metaTitle, setMetaTitle] = useState(
    "Get Exclusive Deals For Muslim Friendly Products | Tribes by HHWT"
  );
  const [metaDescription, setMetaDescription] = useState(
    "Welcome to Tribes! Enter your email address to sign in or register for a new account!"
  );

  useEffect(() => {
    getCategoryLinks();
  }, []);

  const getCategoryLinks = async () => {
    const data = await CategoryLinkAPi.getCategoryLinks();
    if (get(data, "data.data")) {
      const rawInterestingList = get(data, "data.data") || [];
      const interestListingArray = rawInterestingList.map((item) => ({
        id: item.id,
        label: get(item, "attributes.label"),
        avatar:
          get(item, "attributes.logo.data.attributes.url") ||
          "https://picsum.photos/200/300",
      }));
      setInterestingList(interestListingArray);
    }
  };

  const handleSetInterest = (item) => {
    let isSelected = interest.some(
      (ItemIterest) => item.label === ItemIterest.label
    );
    let newArray: any = [];
    if (isSelected) {
      newArray = interest.filter(
        (ItemIterest) => item.label !== ItemIterest.label
      );
    } else {
      newArray = [...interest, { label: item.label, id: item.id }];
    }
    setInterest(newArray);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    onSubmit(interest);
    setIsLoading(false);
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Head>
      <ModalHeader alignTitle="left">
        <div>
          <div>👋 &nbsp; Hello {formData.name}</div>
          <div>What are you most interested in lately?</div>
        </div>
      </ModalHeader>
      <div className={styles.body}>
        <p>
          We would love to recommend categories and content especially for you!
          You can choose more than 1.
        </p>
        <p>Selected: {interest?.length} / 50</p>
        <div className={styles.interesting}>
          {interestingList.map((item: any) => {
            const itemClass = classNames(styles.interesting_item, {
              [styles.selected]: interest.some(
                (ItemIterest) => item.label === ItemIterest.label
              ),
            });
            return (
              <div
                key={item.value}
                className={itemClass}
                // onClick={() => setInterest([...interest, {label: item.label, id: item.id}])}
                onClick={() => handleSetInterest(item)}
              >
                <div className={styles.avatar}>
                  <Image
                    src={item.avatar}
                    alt="avatar"
                    layout="fixed"
                    width={50}
                    height={50}
                  />
                </div>
                <div>{item.label}</div>
              </div>
            );
          })}
        </div>
        <div className={styles.actions}>
          <Button
            variant="secondary-no-outlined"
            text="Back"
            onClick={onBackStep}
            width={50}
          />
          <Button
            className="w-1/2"
            text="Next"
            onClick={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

const SetupProfilePage = () => {
  const router = useRouter();
  const { query } = router;
  const { stepProcess } = query;

  const [step, setStep] = useState(stepProcess || ProfileSteps.STEP_ONE);

  const [formData, setFormData] = useState({});

  const handleNextStep = (data) => {
    setFormData({ ...formData, ...data });
    setStep(ProfileSteps.STEP_TWO);
  };

  const handleSubmit = async (form) => {
    const categoryLinkIds = form.map((item) => item.id);
    let dataSend = {
      category_links: categoryLinkIds,
    };
    let userInfo;
    if (typeof localStorage.getItem("user") !== null) {
      userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    }
    const userId = userInfo.id || "0";
    await UserApi.updateUser(userId, dataSend);
    window.location.href = "/";
    // router.push("/");
  };

  const handleBackStep = () => {
    setStep(ProfileSteps.STEP_ONE);
  };

  return (
    <div className={styles.auth}>
      <div className={styles.form_container}>
        <StepOne
          show={step === ProfileSteps.STEP_ONE}
          key={JSON.stringify(formData)}
          onNextStep={handleNextStep}
          formData={formData}
        />
        <StepTwo
          show={step === ProfileSteps.STEP_TWO}
          onSubmit={handleSubmit}
          onBackStep={handleBackStep}
          formData={formData}
        />
      </div>
    </div>
  );
};

export default SetupProfilePage;
