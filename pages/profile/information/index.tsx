import { useRouter } from "next/router";
import { useContext, useState } from "react";

import { userInformationList } from "constant";
import { UserInformationList } from "enums";
import SectionLayout from "components/SectionLayout/SectionLayout";
import Heading from "components/Heading/Heading";
import UserInformation from "components/UserProfilePage/UserInformation/TabContent/UserInformation";
import ChangePassword from "components/UserProfilePage/UserInformation/TabContent/ChangePassword";

import styles from "styles/BizInformation.module.scss";
import style from "styles/Profile.module.scss";
import { UserInforContext } from "Context/UserInforContext";
import Head from "next/head";

const ProfileInformationPage = () => {
  const [selectedTab, setSelectedTab] = useState<string>(
    userInformationList[0].label
  );

  const [metaTitle, setMetaTitle] = useState("My Account | Tribes by HHWT");
  const [metaDescription, setMetaDescription] = useState(
    "Access your profile page"
  );

  const router = useRouter();
  const { logout } = useContext(UserInforContext);

  const tabContent = () => {
    switch (selectedTab) {
      case UserInformationList.USER_INFORMATION:
        return <UserInformation />;
      case UserInformationList.CHANGE_PASSWORD:
        return <ChangePassword />;
      default:
        return <div />;
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Head>
      <SectionLayout
        backgroundColor
        className={style.section_user_information}
        containerClassName={style.container_user_information}
      >
        <div className={`${styles.biz_information} ${style.user_information}`}>
          <div className={`${styles.left_col} ${style.menu_sidebar}`}>
            <div className={`${styles.left_col_bottom}  mt-0`}>
              <div>View profile</div>
              {userInformationList.map((item) => (
                <div
                  className="flex gap-3 justify-between"
                  key={item.label}
                  onClick={() => {
                    item.directUrl
                      ? router.push(item.directUrl)
                      : setSelectedTab(item.label);
                  }}
                >
                  <Heading
                    icon={item.icon}
                    type="tab"
                    text={item.label}
                    selected={selectedTab === item.label}
                  />
                  {/* {item.star && <Icon icon="star-2" color="#653fff" />} */}
                </div>
              ))}
              <div
                className="flex gap-3 justify-between"
                onClick={handleLogout}
              >
                <Heading
                  icon="logout"
                  type="tab"
                  text="Log out"
                  selected={false}
                />
              </div>
            </div>
          </div>
          <div
            className={`${styles.right_col} ${style.tab_content} overflow-visible`}
          >
            {tabContent()}
          </div>
        </div>
      </SectionLayout>
    </div>
  );
};

export default ProfileInformationPage;
