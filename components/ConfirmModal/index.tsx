import Modal from "components/Modal/Modal";
import Image from "next/image";
import Button from "components/Button/Button";
import styles from "./CofirmModal.module.scss";
import { ReactNode } from "react";

export interface IConfirmModal {
  visible: boolean;
  title: string;
  content?: any;
  onClose?: () => void;
  onSubmit?: () => void;
}

const ConfirmModal = (props: IConfirmModal) => {
  const { visible = false, title, content, onClose, onSubmit } = props;

  return (
    <Modal
      visible={visible}
      width={452}
      mobilePosition="center"
      onClose={onClose}
    >
      <div className="flex flex-col items-center justify-between mx-auto p-8">
        <div className={styles.image_container}>
          <Image
            className="mb-5"
            src={require("public/images/confirm.svg")}
            width="100%"
            height="100%"
            layout="responsive"
            alt="icon"
          />
        </div>
        <div className="w-full">
          <div className="text-center text-xl">
            <strong className="block text-2xl mb-4">{title}</strong>
            {content}
          </div>
          <div className="flex flex-row items-center justify-between">
            <Button variant="outlined" className={styles.button} text="No" onClick={onClose} />
            <Button className={styles.button} text="Yes" onClick={onSubmit} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
