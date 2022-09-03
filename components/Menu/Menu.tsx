import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import classNames from "classnames";
import Icon from "components/Icon/Icon";
import { languages, locations } from "constant";
import { ILoginInfor } from "pages/_app";
import { UserInforContext } from "Context/UserInforContext";
import { ProfileTabs } from "enums";
import Select from "components/Select/Select";
import useTrans from "hooks/useTrans";

import styles from "./Menu.module.scss";

interface MenuMenuProps {
  loginInfor: ILoginInfor;
  mobile?: boolean;
  onShowSwitchModal?: () => void;
  onShowCategoriesModal?: () => void;
  onShowAuthPopup?: () => void;
  onShowHamModal?: (value: boolean) => void;
}

const Menu = (props: MenuMenuProps) => {
  const {
    loginInfor = {},
    mobile,
    onShowCategoriesModal,
    onShowSwitchModal,
    onShowAuthPopup,
    onShowHamModal,
  } = props;
  const router = useRouter();
  const { locale, pathname, asPath } = router;
  const trans = useTrans();

  const { user, logout, updateUser } = useContext(UserInforContext);
  const { location } = user;

  const checkLogin = (href: string) => {
    onShowHamModal?.(false);
    user && user.token ? router.push(`/profile/${href}`) : onShowAuthPopup?.();
  };

  const menuItems = [
    // {
    //   icon: "categories-color",
    //   label: "Categories",
    //   onClick: onShowCategoriesModal,
    // },
    {
      icon: "deal",
      label: "Saved deals",
      onClick: () => checkLogin(ProfileTabs.SAVED_DEALS),
    },
    {
      icon: "heart-color",
      label: "Favorited",
      borderBottom: true,
      onClick: () => checkLogin(ProfileTabs.FAVOURITED),
    },
    {
      icon: "comment-color",
      label: "Edit profile",
      onClick: () => checkLogin(ProfileTabs.ABOUT),
    },
    // { icon: "settings-color", label: "Settings", borderBottom: true },
    // { icon: "like-color-2", label: "Referral code" },
    {
      icon: "business",
      label: "Claim your listing",
      onClick: () => router.push("/claim"),
    },
    {
      icon: "support-color",
      label: "Support",
      onClick: () => router.push("/support"),
    },
    // { icon: "eng-flag", label: "Languages" },
  ];

  const handleLogout = () => {
    window.location.href = "/";
    logout();
  };

  // const handleOpenSwitchAccountModal = () => {};

  // const handleSwitchToNormalUser = () => {
  //   let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  //   userInfo.type = UserTypes.NORMAL_USER;
  //   localStorage.setItem("user", JSON.stringify(userInfo));
  //   router.push("/");
  //   router.reload();
  // };

  const changeLanguage = async (language) => {
    onShowHamModal?.(false);
    router.isReady &&
      (await router.push(pathname, asPath, { locale: language.value }));
    toast.success("Change language successfully!", { autoClose: 1000 });
  };

  const handleChangeLocation = async (e) => {
    onShowHamModal?.(false);
    await updateUser({ location: e.value });
    toast.success("Change location successfully!", {
      autoClose: 1000,
    });
  };

  return (
    <>
      {menuItems.map((item) => {
        const menuItemClassName = classNames(styles.menu_item, {
          [styles.border_bottom]: mobile && item.borderBottom,
        });
        return (
          <div
            key={item.label}
            className={menuItemClassName}
            onClick={() => item.onClick?.()}
          >
            <Icon icon={item.icon} size={20} />
            <div>{item.label}</div>
          </div>
        );
      })}
      <div className="flex gap-2 items-center md:hidden">
        <Icon icon="map" size={20} />
        <Select
          size="small"
          className={styles.location}
          variant="no-outlined"
          placeholder={trans.location}
          options={locations}
          value={location}
          singleValueStyles={{ fontSize: "16px", fontWeight: 500 }}
          onChange={handleChangeLocation}
          width={200}
        />
      </div>
      <div className="flex gap-1 items-center  md:hidden">
        <Icon
          icon={languages.find((item) => item.value === locale)?.icon || ""}
          size={26}
        />
        <Select
          size="small"
          width={200}
          className={styles.menu_item}
          options={languages}
          isSearchable={false}
          variant="no-outlined"
          closeMenuOnSelect
          onChange={changeLanguage}
          value={locale}
          singleValueStyles={{ fontSize: "16px", fontWeight: 500 }}
        />
      </div>
      {!!loginInfor.token && (
        <React.Fragment>
          <div
            onClick={onShowSwitchModal}
            className={styles.switch_account_button}
          >
            <Icon icon="user-color" size={20} />
            <div>Switch account</div>
          </div>
          <div onClick={handleLogout} className={styles.logout}>
            <Icon icon="log-out" size={20} color="#e60112" />
            <div>Logout</div>
          </div>
        </React.Fragment>
      )}
    </>
  );
};

export default Menu;
