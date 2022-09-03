import classNames from "classnames";
import Button from "components/Button/Button";
import { Tiers } from "enums";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Switch from "react-switch";
import { isPaidUser } from "utils";

import styles from "./TierTable.module.scss";

const ProvidedFeature = () => <div className={styles.feature} />;

const tableData = [
  {
    feature: "Uploading of photos on banner",
    free: "Maximum 3",
    basic: "Unlimited",
    premium: null,
  },
  {
    feature: "Add/Edit Basic Info",
    free: <ProvidedFeature />,
    basic: <ProvidedFeature />,
    premium: null,
  },
  {
    feature: "Customer can follow store",
    free: <ProvidedFeature />,
    basic: <ProvidedFeature />,
    premium: null,
  },
  {
    feature: "Verified badge",
    free: null,
    basic: <ProvidedFeature />,
    premium: null,
  },
  {
    feature: "Add/Edit Premium Info",
    free: null,
    basic: <ProvidedFeature />,
    premium: null,
  },
  {
    feature: "Reply to review",
    free: null,
    basic: <ProvidedFeature />,
    premium: null,
  },
  {
    feature: "Analytics",
    free: "Basic",
    basic: "Advance",
    premium: null,
  },
  {
    feature: "Uploading products",
    free: "Maximum 3",
    basic: "Unlimited",
    premium: null,
  },
  {
    feature: "Uploading menu",
    free: null,
    basic: "Unlimited",
    premium: null,
  },
  {
    feature: "Create deals for customer",
    free: null,
    basic: <ProvidedFeature />,
    premium: null,
  },
  // {
  //   feature: "Connect with customer through chat system",
  //   free: null,
  //   basic: <ProvidedFeature />,
  //   premium: null,
  // },
];

const tiers = [
  {
    name: "Free Tier",
    quarter_price: "SGD 0",
    yearly_price: "SGD 0",
    demo: Tiers.FREE,
    value: Tiers.FREE,
    description:
      "With simple features to help you get the ball rolling. Suitable for small business.",
    button: (
      <Button variant="outlined" text="Select" width="70%" size="small" />
    ),
  },
  {
    name: "Basic Tier",
    quarter_price: "SGD 300",
    yearly_price: "SGD 1200",
    demo: Tiers.BASIC,
    description:
      "With advance features to help you promote your business. Suitable for medium and large business.",
    value: Tiers.BASIC,
    recommended: true,
    button: <Button text="Select" width="70%" size="small" />,
  },
];

const RecommendTag = () => (
  <div className={styles.recommended}>
    <Image
      src={require("public/images/recommended.svg")}
      alt="recommended-alt"
      layout="fixed"
      height={37}
    />
  </div>
);

const TierPrice = ({ isPayYearly, tier }) => {
  if (isPayYearly) {
    return (
      <p>
        {tier?.yearly_price} <span>per year</span>
      </p>
    );
  } else {
    return (
      <p>
        {tier?.quarter_price} <span>per quarter</span>
      </p>
    );
  }
};

const DesktopTierTable = ({
  onDirectToVerification,
  setIsPayYearly,
  isPayYearly,
  isChangeTier,
  isPaid,
  expirationDate,
}: {
  onDirectToVerification?(tier: Tiers): void;
  setIsPayYearly?: (value: boolean) => void;
  isPayYearly: boolean;
  isChangeTier?: boolean;
  isPaid?: boolean;
  expirationDate?: any;
}) => {
  const handleChangePayPrice = () => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    setIsPayYearly?.(!isPayYearly);
    if (userInfo.pay_price === "1200") {
      userInfo = { ...userInfo, pay_price: "300" };
    } else {
      userInfo = { ...userInfo, pay_price: "1200" };
    }
    localStorage.setItem("user", JSON.stringify(userInfo));
  };

  return (
    <div className={styles.tier_desktop}>
      <table>
        <colgroup>
          <col width="34%" />
          <col width={!isChangeTier ? "23%" : "33%"} />
          <col
            width={!isChangeTier ? "23%" : "33%"}
            style={{ backgroundColor: "#ECF7FF" }}
          />
          {!isChangeTier && <col width="20%" />}
        </colgroup>
        <thead>
          <tr>
            <th className={styles.tier_payment}>
              <span>Pay quarterly</span>
              <Switch
                onColor="#3faeff"
                uncheckedIcon={false}
                checkedIcon={false}
                onChange={handleChangePayPrice}
                checked={isPayYearly}
              />
              <span>Pay yearly</span>
            </th>
            {tiers.map((tier, index) => (
              <th key={tier.name} style={{ position: "relative" }}>
                {tier.recommended && <RecommendTag />}
                <div className={styles.tier_name}>{tier.name}</div>
                <div className={styles.tier_price}>
                  <TierPrice isPayYearly={isPayYearly} tier={tier} />
                </div>
                <div>
                  <Link href={"/"}>View Demo page</Link>
                  {isChangeTier &&
                    expirationDate &&
                    tier.value !== Tiers.FREE && (
                      <p className="mt-[3px]">{expirationDate}</p>
                    )}
                </div>
                <br />
                {((tier.value !== Tiers.FREE && !isPaid) ||
                  (tier.value === Tiers.FREE && isPaid) ||
                  !isChangeTier) && (
                  <Button
                    variant={tier.value === Tiers.FREE ? "outlined" : "primary"}
                    text={
                      isChangeTier
                        ? tier.value === Tiers.FREE
                          ? "Downgrade"
                          : "Upgrade now"
                        : "Select"
                    }
                    width="70%"
                    size="small"
                    onClick={() => onDirectToVerification?.(tier.value)}
                  />
                )}
              </th>
            ))}
            {!isChangeTier && (
              <th>
                <div className={styles.tier_name}>Premium Tier</div>
                <div className={styles.tier_price}>
                  <span>Comming soon</span>
                </div>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.feature}>
              <td className={styles.tier_feature}>{row.feature}</td>
              <td>{row.free}</td>
              <td>{row.basic}</td>
              {!isChangeTier && <td>{row.premium}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MobileTierTable = ({
  onDirectToVerification,
  setIsPayYearly,
  isPayYearly,
  isPaid,
  isChangeTier,
  expirationDate,
}: {
  onDirectToVerification?(tier: Tiers): void;
  setIsPayYearly?: (value: boolean) => void;
  isPayYearly: boolean;
  isChangeTier?: boolean;
  isPaid?: boolean;
  expirationDate?: any;
}) => {
  const [tierList, setTierList] = useState<string[]>([]);
  const handleChangePayPrice = () => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    setIsPayYearly?.(!isPayYearly);
    if (userInfo.pay_price === "1200") {
      userInfo = { ...userInfo, pay_price: "300" };
    } else {
      userInfo = { ...userInfo, pay_price: "1200" };
    }
    localStorage.setItem("user", JSON.stringify(userInfo));
  };
  return (
    <div className={styles.tier_mobile}>
      <div className="flex items-center gap-3">
        <Switch
          onColor="#3faeff"
          uncheckedIcon={false}
          checkedIcon={false}
          onChange={handleChangePayPrice}
          checked={isPayYearly}
        />
        Pay yearly
      </div>
      {tiers.map((tier) => (
        <div key={tier.name} className="relative mt-10">
          {tier.recommended && <RecommendTag />}
          <div className={styles.tier_mobile_card}>
            <div className={styles.body}>
              <div className={styles.name}>{tier.name}</div>
              <span>{tier.description}</span>
              <div className={styles.price}>
                <TierPrice isPayYearly={isPayYearly} tier={tier} />
                <a onClick={() => setTierList([...tierList, tier.name])}>
                  View detail
                </a>
              </div>
            </div>
            {tierList.includes(tier.name) && (
              <div className={styles.features}>
                {tableData.map((feat) => {
                  const notProvided = !feat[tier.value];
                  const featureClassName = classNames(styles.feature, {
                    [styles.no_provided]: notProvided,
                  });
                  return (
                    <div key={feat.feature} className={featureClassName}>
                      <Image
                        src={require(notProvided
                          ? "public/images/x-mark.svg"
                          : "public/images/check-mark.svg")}
                        alt="check_mark_alt"
                        layout="fixed"
                        width={14}
                        height={14}
                      />
                      {feat.feature}
                    </div>
                  );
                })}
              </div>
            )}
            <div className={styles.button_container}>
              <Button
                variant={tier.value === Tiers.FREE ? "outlined" : "primary"}
                text="Select"
                width="70%"
                size="small"
                onClick={() => onDirectToVerification?.(tier.value)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const TierTable = ({
  isChangeTier,
  isPaid,
  isPayYearly,
  onSetIsPayYearly,
  onDirectToVerification,
  expirationDate,
}: {
  isChangeTier?: boolean;
  isPaid?: boolean;
  isPayYearly: boolean;
  onSetIsPayYearly?: (e: any) => void;
  onDirectToVerification?(tier: Tiers): void;
  expirationDate?: any;
}) => {
  return (
    <div className={styles.tier}>
      <DesktopTierTable
        expirationDate={expirationDate}
        isPaid={isPaid}
        isChangeTier={isChangeTier}
        onDirectToVerification={onDirectToVerification}
        isPayYearly={isPayYearly}
        setIsPayYearly={onSetIsPayYearly}
      />
      <MobileTierTable
        expirationDate={expirationDate}
        isPaid={isPaid}
        isChangeTier={isChangeTier}
        onDirectToVerification={onDirectToVerification}
        isPayYearly={isPayYearly}
        setIsPayYearly={onSetIsPayYearly}
      />
    </div>
  );
};

export default TierTable;
