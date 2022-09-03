import React, { useState } from "react";
import { useRouter } from "next/router";

import Modal, { ModalProps } from "components/Modal/Modal";
import ShareModal from "components/ShareModal/ShareModal";
import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import ScrollingBox from "components/ScrollingBox/ScrollingBox";
import Album from "components/Album/Album";

import styles from "./ProductDetailModal.module.scss";
import { get } from "lodash";
import _ from "lodash";
import { CategoryText } from "enums";

export interface IProduct {
  id: number;
  name: string;
  images?: any[];
  price?: string | number;
  priceSale?: string | number;
  discount?: string | number;
  klookUrl?: string;
  websiteUrl?: string;
  description?: string;
  type: "paid" | "klook" | "free" | "";
}

interface ProductDetailsModalProps extends ModalProps {
  data: IProduct;
  onShare?: () => void;
  onKlook?: () => void;
  onBookNow?: () => void;
  isPaid?: boolean;
}

const ProductDetailModal = (props: ProductDetailsModalProps) => {
  const { data, visible, isPaid, onClose, onShare, onKlook, onBookNow } = props;
  console.log("data", data);
  const [showShareModal, setShowShareModal] = useState(false);
  const router = useRouter();
  const { asPath, query } = router;
  const { category } = query;

  const handleShare = () => {
    setShowShareModal(true);
    onShare?.();
  };

  const calcPrice =
    data.discount && data.price
      ? (
          _.toNumber(data.price) *
          (_.toNumber(data.discount) / 100 + 1)
        ).toFixed(2)
      : null;

  return (
    <React.Fragment>
      <Modal visible={visible} width="100%" maxWidth={1328} onClose={onClose}>
        <div className={styles.container}>
          <div className={styles.close} onClick={onClose}>
            <Icon icon="cancel-mobile" />
          </div>
          <div className={styles.container_gallery}>
            <Album
              //make rerender album when popup product detail modal
              id="product-detail-modal-album"
              key={get(data, "images.length")}
              images={data.images}
              showedPicsNumber={{ slidesToShow: 6, slidesToScroll: 6 }}
            />
          </div>
          <div className={styles.container_info}>
            <h2 className={styles.title}>{data.name}</h2>
            <div className="flex items-center justify-between mb-[10px]">
              <div className="flex items-center gap-[16px]">
                {calcPrice ? (
                  <div>
                    <div className={styles.price_sale}>
                      <span>$</span>
                      <span>{calcPrice}</span>
                    </div>
                    <div className={styles.price}>
                      <span>$</span>
                      <span>{data.price}</span>
                    </div>
                    <div className={styles.discount}>
                      <div
                        className={`${styles.badge} ${styles.badge_warning}`}
                      >
                        {data.discount}% OFF
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.price_sale}>
                    <span>$</span>
                    <span>{data.price}</span>
                  </div>
                )}
              </div>
              <Button
                className={styles.btn_share}
                variant="underlined"
                text="Share"
                prefix={<Icon icon="share" color="#7F859F" size={14} />}
                onClick={handleShare}
              />
            </div>
            {data?.description && (
              <ScrollingBox>
                <div
                  className={styles.description}
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              </ScrollingBox>
            )}
            <div className={styles.call_to_action}>
              {data.klookUrl && (
                <Button
                  text="Book on KLOOK"
                  backgroundColor="#FF5B02"
                  className="text-sm"
                  onClick={() => window.open(data.klookUrl, "_blank")?.focus()}
                />
              )}
              {(data?.type === "paid" || isPaid) && data?.websiteUrl && (
                <Button
                  text={
                    category === CategoryText.EAT ? "Order now" : "Book now"
                  }
                  backgroundColor="#E60112"
                  className="text-sm"
                  onClick={() =>
                    window.open(data.websiteUrl, "_blank")?.focus()
                  }
                />
              )}
            </div>
          </div>
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

export default ProductDetailModal;
