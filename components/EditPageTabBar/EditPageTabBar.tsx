import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Popover from "components/Popover/Popover";
import { contributePopOverList } from "constant";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styles from "./EditPageTabBar.module.scss";

export interface EditPageTabBarProps {
  klookUrl?: string;
  action: { label: string; value: string };
}

const EditPageTabBar = (props: EditPageTabBarProps) => {
  const { klookUrl, action } = props;

  const handleOpenNewWindow = (action) => {
    const { label, value } = action;
    if (["Contact us", "Send WhatApps message"].includes(label)) {
      let phoneNumber = value;
      window.open(`tel:${phoneNumber}`);
    } else {
      let url = value;
      if (url && url.indexOf("//") < 0) url = "https://" + url;
      window.open(url, "_blank")?.focus();
    }
  };

  return (
    <div className={styles.contribute}>
      {action && (
        <Button
          className={styles.button}
          text={action.label}
          onClick={() => handleOpenNewWindow(action)}
        />
      )}
      {klookUrl && (
        <Button
          className={styles.button}
          text="Book on KLOOK"
          onClick={() => window.open(klookUrl, "_blank")?.focus()}
          backgroundColor="rgb(255, 91, 2)"
        />
      )}
    </div>
  );
};

export default EditPageTabBar;
