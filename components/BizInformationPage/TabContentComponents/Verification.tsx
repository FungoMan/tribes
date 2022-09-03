import Break from "components/Break/Break";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import SectionLayout from "components/SectionLayout/SectionLayout";
import { bizInformationDefaultFormData } from "constant";
import React, { useState } from "react";
import { numberVerify } from "utils";
import styles from "./TabContent.module.scss";

interface VerificationProps {
  isPaid: boolean;
  listing: any;
}

const Verification = (props: VerificationProps) => {
  const { isPaid, listing } = props;

  return (
    <SectionLayout
      title="Verification"
      subTitle="You need to verify your info in order to publish your business."
      className={styles.verification}
      containerClassName="w-full"
    >
      <Break />
      {listing.number_verify && (
        <Input
          className={styles.input_verify}
          label="Verify Personal phone number"
          value={numberVerify(listing.number_verify)}
          size="large"
          width={300}
          suffix={<Icon icon="verified-tag" style={{ width: 70 }} />}
        />
      )}
      {isPaid && (
        <React.Fragment>
          <br />
          <Input
            className={styles.input_verify}
            label="Verify Personal phone number"
            value={listing.provided}
            size="large"
            width={300}
            suffix={<Icon icon="verified-tag" style={{ width: 70 }} />}
          />
        </React.Fragment>
      )}
    </SectionLayout>
  );
};

export default Verification;
