import React, { useContext, useState } from "react";
import { useRouter } from "next/router";

import Modal, { ModalProps } from "components/Modal/Modal";
import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import ScrollingBox from "components/ScrollingBox/ScrollingBox";

import styles from "./ProgressUserModal.module.scss";
import CompleteProfileCard from "components/UserProfilePage/CompleteProfileCard/CompleteProfileCard";
import classNames from "classnames";
import Checkbox from "components/Checkbox/Checkbox";
import { UserInforContext } from "Context/UserInforContext";
import { get } from "lodash";
import Break from "components/Break/Break";

interface ProgressUserModalProps extends ModalProps {
  visible: boolean;
  onClose?: () => void;
}

const ProgressUserModal = (props: ProgressUserModalProps) => {
  const { visible, onClose } = props;
  const router = useRouter();

  const { user } = useContext(UserInforContext);
  const options = [
    {
      label: "Add Birthday",
      value: "birthday",
      checked: !!user?.birthday,
    },
    {
      label: "Add Gender",
      value: "gender",
      checked: !!user?.gender,
    },
    {
      label: "Add Mobile Number",
      value: "phone_number",
      checked: !!user?.phone_number,
    },
    {
      label: "Add Email Address",
      value: "email",
      checked: !!user?.email,
    },
    {
      label: "Add Education Level",
      value: "educate_level",
      checked: !!user?.educate_level,
    },
    {
      label: "Add Industry",
      value: "industry",
      checked: !!user?.industry,
    },
    {
      label: "Add Content Preferences",
      value: "content_preferences",
      checked: get(user, "category_links.length") > 0,
    },
    {
      label: "Add First & Last Name",
      value: "birthday",
      checked: !!user?.birthday,
    },
    {
      label: "Add Display Name",
      value: "display_name",
      checked: !!user?.display_name,
    },
  ];

  return (
    <React.Fragment>
      <Modal visible={visible} width="90%" maxWidth={778} onClose={onClose}>
        <div className={styles.container}>
          <div className={styles.close} onClick={onClose}>
            <Icon icon="cancel-mobile" />
          </div>
          <div className={styles.left}>
            <div className={styles.title}>You’re alsmost done!</div>
            <CompleteProfileCard className={styles.progress} />
          </div>
          <div className={styles.right}>
            <div className={styles.title}>Complete your profile</div>
            <div className={classNames(styles.text, styles.content)}>
              Completing your profile helps Tribes enhance your experience
              better everyday!
            </div>
            {options.map((opt) => (
              <Checkbox
                key={opt.value}
                label={opt.label}
                id={opt.value}
                className={classNames(
                  styles.text,
                  styles.item,
                  opt.checked && styles.checked
                )}
                checked={opt.checked}
                onClick={() =>
                  router.push(
                    {
                      pathname: "/profile/information",
                      query: { field: opt.value },
                    },
                    "/profile/information"
                  )
                }
              />
            ))}
            <Break className={styles.break} />
            <div className="flex flex-row justify-between">
              <Button
                className={classNames(styles.button, styles.small)}
                text="Close"
                onClick={onClose}
                variant="secondary-no-outlined"
              />
              <Button
                className={styles.button}
                text="Edit profile"
                onClick={() => router.push("/profile/information")}
              />
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default ProgressUserModal;
