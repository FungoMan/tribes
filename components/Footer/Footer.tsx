import Image from "next/image";
import { useRouter } from "next/router";

import SectionLayout from "components/SectionLayout/SectionLayout";

import styles from "./Footer.module.scss";
import { templateSettings } from "lodash";
import { isArray } from "utils";

const Footer = (props: {
  backgroundColor?: boolean;
  visible: boolean;
  navList: { [key: string]: any }[];
}) => {
  const { visible, backgroundColor = true, navList } = props;
  const router = useRouter();

  let newNavList;
  if (navList) {
    const navListFooter = navList.map((item) => ({
      category: item.category,
      icon: item.icon,
      slug: item.slug,
      id: item.id,
      items: isArray(item.items) ? item.items.slice(0, 5) : [],
    }));
    newNavList = [
      ...navListFooter,
      {
        category: "For Users",
        items: [
          { label: "Write review", value: "", href: "/reviews" },
          { label: "Add listing", value: "", href: "/add-listing" },
        ],
      },
      {
        category: "Business owners",
        items: [{ label: "Claim your listing", value: "", href: "/claim" }],
      },
      {
        category: "About",
        items: [
          { label: "About us", value: "" },
          { label: "FAQ", value: "", href: "/support" },
          { label: "Contact us", value: "", href: "/support" },
          { label: "Terms and conditions", href: "/terms-conditions" },
        ],
      },
    ];
  }

  if (!visible) return null;
  return (
    <SectionLayout backgroundColor={backgroundColor}>
      <div className={styles.footer}>
        <div className={styles.left_col}>
          <div>
            <Image src={require("public/logo.svg")} alt="logo" />
          </div>
          <div className={styles.social_row}>
            <div
              className={styles.social_image}
              onClick={() =>
                window.open("https://www.facebook.com/tribesbyhhwt", "_blank")
              }
            >
              <Image
                src={require("public/images/facebook_svg.svg")}
                alt="icon-facebook"
                width={41}
              />
            </div>
            <div
              className={styles.social_image}
              onClick={() =>
                window.open(
                  "https://www.tiktok.com/@tribesbyhhwt?lang=en",
                  "_blank"
                )
              }
            >
              <Image
                src={require("public/images/tiktok_svg.svg")}
                alt="icon-titok"
                width={41}
              />
            </div>
            <div
              className={styles.social_image}
              onClick={() =>
                window.open("https://www.instagram.com/tribesbyhhwt/", "_blank")
              }
            >
              <Image
                src={require("public/images/instagram_svg.svg")}
                alt="icon-instagram"
                width={41}
              />
            </div>
          </div>
        </div>
        <div className={styles.right_col}>
          {newNavList.map((nav) => {
            return (
              <div key={nav.category} className={styles.nav}>
                <h3 className={styles.header}>{nav.category}</h3>
                <div className={styles.item_container}>
                  {nav.items.map((item: any) => (
                    <div
                      key={item.label}
                      className={styles.label}
                      onClick={() => router.push(item.href)}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.rights}>
        <div>© 2022 Hello Travel Pte Ltd.All Rights Reserved</div>
        <div>End User License Agreement | Privacy</div>
      </div>
    </SectionLayout>
  );
};

export default Footer;
