import Modal from "components/Modal/Modal";
import Image from "next/image";
import Button from "components/Button/Button";
import styles from "./ResultModal.module.scss";

export interface IResultModal {
  visible: boolean;
  isSuccess: boolean;
  onClose?: () => void;
  resultType?: any;
}

const ResultModal = (props: IResultModal) => {
  const { visible = false, isSuccess = false, resultType, onClose,  } = props;
  
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
            src={
              isSuccess
                ? require("public/images/success-submit.svg")
                : require("public/images/failed-submit.svg")
            }
            width="100%"
            height="100%"
            layout="responsive"
            alt="icon"
          />
        </div>
        <div>
          <div className="text-center text-xl">
            <strong className="block text-2xl mb-4">
              {isSuccess ? resultType[0].title : resultType[1].title}
            </strong>
            <p className="text-base sm:px-11 mb-8">
              {isSuccess ? resultType[0].message : resultType[1].message}
            </p>
          </div>
          <Button
            className="mt-5"
            text={
              isSuccess ? resultType[0].textButton : resultType[1].textButton
            }
            onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ResultModal;
