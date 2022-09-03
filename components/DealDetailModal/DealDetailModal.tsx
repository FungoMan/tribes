import Image from "next/image";

import Modal, { ModalProps } from "components/Modal/Modal";
import Icon from "components/Icon/Icon";
import Button from "components/Button/Button";
import React, { useState, useEffect } from "react";
import styles from "./DealDetailModal.module.scss";
import get from "lodash/get";
import DealFavouriteApi from "services/user-deal-favourite";
import ShareModal from "components/ShareModal/ShareModal";
import FavouriteDealApi from "services/user-deal-favourite";
import { useRouter } from "next/router";
import moment from "moment";
export interface IDealsDetails {
  name: string;
  imgUrl: string;
  description?: string;
  endDate?: Date;
  termsConditions?: string;
}
interface DealDetailModalProps extends ModalProps {
  data: any;
  onShare?: () => void;
  onFavourite?: () => void;
}

const DealDetailModal = (props: DealDetailModalProps) => {
  const { data, visible, onClose, onShare, onFavourite } = props;
  const router = useRouter();
  const { asPath } = router;
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState(false);
  useEffect(() => {
    const checkFavouriteDeal = async () => {
      const dataFavouriteDeal = await FavouriteDealApi.checkIsFavourite(
        data.id
      );
      get(dataFavouriteDeal, "data.data.length") == 0
        ? setIsFavourite(true)
        : setIsFavourite(false);
    };
    checkFavouriteDeal();
  }, [data]);

  const handleAddFavouriteDeal = async (id) => {
    const data = await DealFavouriteApi.createDealFavourite(id);
    if (get(data, "data")) {
      setIsFavourite(true);
    }
  };

  const handleOpenShareModal = () => {
    onShare?.();
    setShowShareModal(true);
  };

  return (
    <React.Fragment>
      <Modal
        visible={visible}
        width="100%"
        maxWidth={678}
        mobilePosition="center"
        onClose={onClose}
      >
        <div className={styles.header}>
          <div className="flex items-center min-w-0">
            <div className={styles.icon}>
              <Icon icon="deals-color" size={22} />
            </div>
            <div className={`${styles.title} truncate`}>{data.name}</div>
          </div>
          <div className={styles.close} onClick={onClose}>
            <Icon icon="cancel-mobile" />
          </div>
        </div>
        <div className={styles.cover_image}>
          <Image
            src={
              get(data, "images[0]") ||
              require("public/images/default-avatar.svg")
            }
            alt={data.name}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={styles.content}>
          {data.description && (
            <div className={styles.item}>
              <h6 className={styles.label}>Offers</h6>
              <p className="text-left">{data.description}</p>
            </div>
          )}
          <div className={styles.item}>
            <h6 className={styles.label}>Valid</h6>
            <p className="text-left">
              {data.startDate && moment(data.startDate).format("YYYY/MM/DD")}
              {" - "}
              {data.endDate && moment(data.endDate).format("YYYY/MM/DD")}
            </p>
          </div>
          {(get(data, "attributes.terms_conditions") ||
            data.conditions ||
            data.terms_conditions ||
            data.termsConditions) && (
            <div className={styles.item}>
              <h6 className={styles.label}>Terms & Conditions</h6>
              <p className="text-left">
                {get(data, "attributes.terms_conditions") ||
                  data.terms_conditions ||
                  data.conditions ||
                  data.termsConditions}
              </p>
            </div>
          )}
        </div>
        <div className={styles.footer}>
          <div className="flex">
            <Button
              variant="secondary"
              text="Share"
              className="text-sm	font-bold mr-[17px]"
              width={115}
              prefix={<Icon icon="share" />}
              onClick={handleOpenShareModal}
            />
            <Button
              variant="primary"
              text="Add to favourite"
              className="text-sm	font-bold"
              width="max-content"
              prefix={<Icon icon="like-stroke" color="#ffffff" />}
              onClick={() => handleAddFavouriteDeal(data.id)}
              disabled={!isFavourite}
            />
          </div>
          <Button
            variant="underlined"
            text="Cancel"
            className={`${styles.btn_cancel} text-sm font-medium no-underline`}
            width="max-content"
            onClick={() => {
              onClose && onClose();
              setIsFavourite(false);
            }}
          />
        </div>
      </Modal>
      <ShareModal
        url={asPath}
        onClose={() => setShowShareModal(false)}
        visible={showShareModal}
      />
    </React.Fragment>
  );
};

export default DealDetailModal;
