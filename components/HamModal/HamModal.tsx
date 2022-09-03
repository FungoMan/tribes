import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { UserInforContext } from "Context/UserInforContext";

import Button from "components/Button/Button";
import Menu from "components/Menu/Menu";
import Modal from "components/Modal/Modal";
import Tabs from "components/Tabs/Tabs";
import {
  categories,
  freeInformationList,
  paidInformationList,
  user,
} from "constant";
import { ILoginInfor } from "pages/_app";
import AuthPopup from "components/AuthPopup/AuthPopup";
import { SwitchAccountsContent } from "components/TheHeader/HeaderComponents";
import { UserTypes } from "enums";
import BizAccountManagementPanel from "components/BizAccountManagementPanel/BizAccountManagementPanel";

import styles from "./HamModal.module.scss";

const HamModalHeader = ({
  loginInfor,
  gotoLogin,
  gotoSignup,
}: {
  loginInfor: ILoginInfor;
  gotoLogin: () => void;
  gotoSignup: () => void;
}) => {
  const { user } = useContext(UserInforContext);

  return !!loginInfor.token ? (
    <div className={styles.user_profile}>
      <Image
        src={user.avatar || require("public/images/default-avatar.svg")}
        alt="avatar"
        layout="fixed"
        width={50}
        height={50}
        className={styles.avatar}
        objectFit="cover"
      />
      <div className={styles.user_infor}>
        <div className={styles.name}>
          {user.first_name} {user.last_name}
        </div>
        <div className={styles.see_profile}>See profile</div>
      </div>
    </div>
  ) : (
    <>
      <div className={styles.banner} />
      <div className={styles.button_container}>
        <Button text="Sign up" variant="outlined" onClick={gotoSignup} />
        <Button text="Login" onClick={gotoLogin} />
      </div>
    </>
  );
};

export interface HamModalProps {
  loginInfor: ILoginInfor;
  showHamModal: boolean;
  onSetShowHamModal: (e: boolean) => void;
}

const HamModal = (props: HamModalProps) => {
  const { onSetShowHamModal, loginInfor, showHamModal } = props;

  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  const router = useRouter();
  const { user } = useContext(UserInforContext);

  useEffect(() => {
    setShowSwitchModal(false);
    onSetShowHamModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  const gotoLogin = () => {
    onSetShowHamModal(false);
    router.push("/login");
  };

  const gotoSignup = () => {
    onSetShowHamModal(false);
    router.push("/signup");
  };

  const categoriesTabs = [
    {
      icon: "buy-color",
      label: "Buy",
      value: "buy",
      content: (
        <div className="flex gap-[20px] flex-wrap">
          {categories[0].options.map((item) => (
            <div key={item.value} className="flex flex-col flex-wrap w-[28%]">
              <div className={styles.category_item_icon}>
                <Image
                  src={"https://picsum.photos/200/300"}
                  alt=""
                  layout="fill"
                />
              </div>
              <div>{item.label}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: "eat-color",
      label: "Eat",
      value: "eat",
      content: (
        <div className="flex gap-[20px] flex-wrap">
          {categories[1].options.map((item) => (
            <div key={item.value} className="flex flex-col flex-wrap w-[28%]">
              <div className={styles.category_item_icon}>
                <Image
                  src={"https://picsum.photos/200/300"}
                  alt=""
                  layout="fill"
                />
              </div>
              <div>{item.label}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: "camera-color",
      label: "See & Do",
      value: "see-and-do",
      content: (
        <div className="flex gap-[20px] flex-wrap">
          {categories[2].options.map((item) => (
            <div key={item.value} className="flex flex-col flex-wrap w-[28%]">
              <div className={styles.category_item_icon}>
                <Image
                  src={"https://picsum.photos/200/300"}
                  alt=""
                  layout="fill"
                />
              </div>
              <div>{item.label}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: "car-color",
      label: "Transport",
      value: "transport",
      content: (
        <div className="flex gap-[20px] flex-wrap">
          {categories[3].options.map((item) => (
            <div key={item.value} className="flex flex-col flex-wrap w-[28%]">
              <div className={styles.category_item_icon}>
                <Image
                  src={"https://picsum.photos/200/300"}
                  alt=""
                  layout="fill"
                />
              </div>
              <div>{item.label}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: "bed-color",
      label: "Stay",
      value: "stay",
      content: (
        <div className="flex gap-[20px] flex-wrap">
          {categories[4].options.map((item) => (
            <div key={item.value} className="flex flex-col flex-wrap w-[28%]">
              <div className={styles.category_item_icon}>
                <Image
                  src={"https://picsum.photos/200/300"}
                  alt=""
                  layout="fill"
                />
              </div>
              <div>{item.label}</div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal
        visible={showHamModal}
        mobileFullHeight
        mobileFullWidth={false}
        mobilePosition="right"
        onClose={() => onSetShowHamModal(false)}
      >
        {user.user_type === UserTypes.BIZ_USER ? (
          <div className="flex flex-col gap-5 px-3 pt-10">
            <BizAccountManagementPanel
              onShowSwitchModal={() => {
                onSetShowHamModal(false);
                setShowSwitchModal(true);
              }}
            />
          </div>
        ) : (
          <div className={styles.ham_modal}>
            <HamModalHeader
              loginInfor={loginInfor}
              gotoLogin={gotoLogin}
              gotoSignup={gotoSignup}
            />
            <Menu
              loginInfor={loginInfor}
              mobile
              onShowHamModal={(value) => onSetShowHamModal(value)}
              onShowCategoriesModal={() => setShowCategoriesModal(true)}
              onShowAuthPopup={() => setShowAuthPopup(true)}
              onShowSwitchModal={() => {
                onSetShowHamModal(false);
                setShowSwitchModal(true);
              }}
            />
          </div>
        )}
      </Modal>
      <Modal
        visible={showCategoriesModal}
        onClose={() => setShowCategoriesModal(false)}
        title="BEST categories"
        width="100%"
        mobileFullHeight
        mobilePosition="right"
      >
        <Tabs tabList={categoriesTabs} />
      </Modal>
      <Modal
        title="Switch account"
        visible={showSwitchModal}
        mobilePosition="center"
        onClose={() => setShowSwitchModal(false)}
      >
        <div className="p-[10px] flex flex-col gap-5">
          <SwitchAccountsContent />
        </div>
      </Modal>
      <AuthPopup
        onClose={() => setShowAuthPopup(false)}
        visible={showAuthPopup}
      />
    </>
  );
};

export default HamModal;
