import { useRouter } from "next/router";

import styles from "./AuthPopup.module.scss";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";


export interface AuthPopupProps {
  visible?: boolean;
  onClose: () => void;
}

const AuthPopup = (props: AuthPopupProps) => {
  const { onClose, visible } = props;
  const router = useRouter();
  const goToLogin = () => {
    onClose();
    router.push("/login");
  };
  const goToSignup = () => {
    onClose();
    router.push("/signup");
  };
  return (
    <Modal
      mobilePosition="center"
      transparent
      visible={visible}
      onClose={onClose}
    >
      <div className={styles.auth_popup}>
        <div className={styles.close} onClick={onClose}>
          &#x2715;
        </div>
        <div className={styles.button_container}>
          <Button text="Log in" className={styles.login} onClick={goToLogin} />
          <Button
            text="Sign up"
            variant="no-outlined"
            onClick={goToSignup}
            className={styles.sign_up}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AuthPopup;
