import Modal, { ModalProps } from "components/Modal/Modal";
import Radio, { RadioProps } from "components/Radio/Radio";
import Break from "components/Break/Break";
import styles from "./ReportModal.module.scss";
import Button from "components/Button/Button";
import { useState } from "react";
import Input from "components/Input/Input";

interface ReportModalProps extends ModalProps {
  options: RadioProps[];
  onSubmit?: (data?) => void;
}

const ReportModal = (props: ReportModalProps) => {
  const { visible, title, options, onClose, onSubmit } = props;

  const [currentOption, setCurrentOption] = useState<string>();
  const [anotherReason, setAnotherReason] = useState<string>();

  const handleOnSubmit = () => {
    const reason = currentOption === "Other" ? anotherReason : currentOption;
    onSubmit?.(reason);
  };
  return (
    <Modal visible={visible} width="100%" maxWidth={578}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.close} onClick={onClose}>
          &#x2715;
        </div>
      </div>
      <Break />
      <div className={styles.options}>
        {options?.map((option, index) => (
          <div
            key={index}
            className={styles.option}
            onClick={() => {
              setCurrentOption(option?.label);
              setAnotherReason("");
            }}
          >
            <Radio
              id={option.id}
              label={option.label}
              name="report"
              className="text-sm"
            />
          </div>
        ))}
        {currentOption === "Other" && (
          <Input
            size="large"
            placeholder="Your reason"
            onChange={(e: any) => setAnotherReason(e.target.value)}
          />
        )}
      </div>
      <div className={styles.footer}>
        <Button
          variant="underlined"
          text="Cancel"
          width="max-content"
          className={styles.btn_cancel}
          onClick={onClose}
        />
        <Button
          disabled={
            !(
              (currentOption && currentOption !== "Other") ||
              (currentOption === "Other" && anotherReason)
            )
          }
          text="Submit"
          width={182}
          onClick={handleOnSubmit}
          className={styles.btn_submit}
        />
      </div>
    </Modal>
  );
};

export default ReportModal;
