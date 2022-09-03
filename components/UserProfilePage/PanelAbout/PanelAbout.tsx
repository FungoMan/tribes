import classNames from "classnames";
import { useRouter } from "next/router";
import React from "react";
import styles from "./PanelAbout.module.scss";
export interface IUserData {
  first_name?: string;
  last_name?: string;
  avatar?: string;
  email: string;
  phone_number?: string;
  country?: string;
  gender: "male" | "female" | "others";
  educate_level?: string;
  industry?: string;
  birthday?: string;
}
export interface UserProps {
  email: string;
  phoneNumber?: string;
  country?: string;
  gender: "male" | "female" | "others";
  educationLevel?: string;
  industry?: string;
  birthday?: string;
}

const AboutInfor = (props: {
  label: string;
  text?: string;
  blankText: string;
}) => {
  const { label, text, blankText } = props;
  const router = useRouter();
  return (
    <React.Fragment>
      <h6 className={styles.label}>{label}</h6>
      {text ? (
        <span className={styles.value}>{text}</span>
      ) : (
        <span
          className={styles.empty}
          onClick={() => router.push("/profile/information")}
        >
          {blankText}
        </span>
      )}
    </React.Fragment>
  );
};

const PanelAbout = (props: { data: { [key: string]: any } }) => {
  const {
    email,
    phone_number,
    country,
    gender = "others",
    educate_level,
    industry,
    birthday,
  } = props.data;
  const containerClassName = classNames(
    "grid md:grid-cols-3",
    styles.container
  );
  const col2ClassName = classNames(
    "md:col-start-2 md:col-span-4",
    styles.field
  );

  return (
    <div className={styles.about_panel}>
      <div className={containerClassName}>
        <div className={styles.field}>
          <AboutInfor
            label="Phone number"
            text={phone_number}
            blankText="Add phone number"
          />
        </div>
        <div className={col2ClassName}>
          <AboutInfor label="Email" text={email} blankText="Add email" />
        </div>
        <div className={styles.field}>
          <AboutInfor label="Country" text={country} blankText="Add country" />
        </div>
        <div className={col2ClassName}>
          <AboutInfor label="Gender" text={gender} blankText="Add gender" />
        </div>
        <div className={styles.field}>
          <AboutInfor
            label="Education Level"
            text={educate_level}
            blankText="Add Education level"
          />
        </div>
        <div className={styles.field}>
          <AboutInfor
            label="Industry"
            text={industry}
            blankText="Add industry"
          />
        </div>
        <div className={styles.field}>
          <AboutInfor
            label="Birthday"
            text={birthday}
            blankText="Add birthday"
          />
        </div>
      </div>
    </div>
  );
};

export default PanelAbout;
