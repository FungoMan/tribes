import {
  FacebookShareButton,
  LineShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  LineIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import Image from "next/image";
import { toast } from "react-toastify";

import Modal from "components/Modal/Modal";

import styles from "./ShareModal.module.scss";

interface ShareModalProps {
  visible?: boolean;
  onClose?: () => void;
  url?: string;
}

const ShareModal = (props: ShareModalProps) => {
  const { onClose, visible, url } = props;
  console.log("url", url?.slice(1));

  const handleCopyUrl = () =>
    navigator.clipboard
      .writeText(`${process.env.NEXT_PUBLIC_DOMAIN}${url?.slice(1)}`)
      .then(() => {
        toast.success("Copied!", {
          autoClose: 2000,
          position: "top-right",
          hideProgressBar: true,
          closeOnClick: true,
        });
      });

  return (
    <Modal
      title="Share"
      mobilePosition="center"
      visible={visible}
      width={600}
      onClose={onClose}
    >
      <div className={styles.share_container}>
        <FacebookShareButton
          className={styles.social}
          url={`${process.env.NEXT_PUBLIC_DOMAIN}${url?.slice(1)}`}
        >
          <FacebookIcon borderRadius={100} size={50} />
          Facebook
        </FacebookShareButton>
        <LineShareButton
          url={`${process.env.NEXT_PUBLIC_DOMAIN}${url?.slice(1)}`}
          className={styles.social}
        >
          <LineIcon borderRadius={100} size={50} />
          Line
        </LineShareButton>
        <TelegramShareButton
          url={`${process.env.NEXT_PUBLIC_DOMAIN}${url?.slice(1)}`}
          className={styles.social}
        >
          <TelegramIcon borderRadius={100} size={50} />
          Telegram
        </TelegramShareButton>
        <TwitterShareButton
          url={`${process.env.NEXT_PUBLIC_DOMAIN}${url?.slice(1)}`}
          className={styles.social}
        >
          <TwitterIcon borderRadius={100} size={50} />
          Twitter
        </TwitterShareButton>
        <WhatsappShareButton
          url={`${process.env.NEXT_PUBLIC_DOMAIN}${url?.slice(1)}`}
          className={styles.social}
        >
          <WhatsappIcon borderRadius={100} size={50} />
          Whatsapp
        </WhatsappShareButton>
        <div className={styles.social} onClick={handleCopyUrl}>
          <Image
            src={require("public/icons/copy-link.svg")}
            alt="icon-copy"
            layout="fixed"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
