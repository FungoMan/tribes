import classNames from "classnames";
import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Image from "next/image";
import { PromotionType } from "./enums";
import styles from "./PromotionCard.module.scss";

export interface PromotionProps {
  imgUrl?: string;
  title?: string;
  startDate?: string;
  endDate?: string;
  type?: string | number;
  favourite?: boolean;
  width?: string | number;
  size?: "medium" | "large";
  description?: string;
  onCardClick?: () => void;
  onClick?: () => void;
  onUnSaveDeal?: () => void;
}

const PromotionCard = (props: PromotionProps) => {
  const {
    imgUrl,
    width,
    title,
    endDate,
    startDate,
    description,
    type,
    favourite,
    size = "medium",
    onUnSaveDeal,
    onCardClick,
    onClick,
  } = props;

  const buttonClasses = classNames({
    [styles.promotion_cta_primary]:
      PromotionType.VIEW_DETAIL === type || PromotionType.USE_NOW === type,
  });
  const avatarClassName = classNames(styles.promotion_avatar, {
    [styles.medium]: size === "medium",
    [styles.large]: size === "large",
  });

  const types = {
    [PromotionType.VIEW_DETAIL]: "View detail",
    [PromotionType.USE_NOW]: "Use now",
  };

  return (
    <div style={{ width }} className={styles.promotion_card}>
      <div className={avatarClassName}>
        {imgUrl && (
          <Image
            onClick={onCardClick}
            src={imgUrl || require("public/images/default-avatar.svg")}
            width="100%"
            height="100%"
            alt="promotion-alt"
            layout="responsive"
            objectFit="cover"
            className={styles.promotion_image}
          />
        )}
        {favourite && (
          <div className={styles.promotion_favourite} onClick={onUnSaveDeal}>
            <Icon icon="like-solid" color="#e60112" />
          </div>
        )}
      </div>
      <div className={styles.promotion_info} onClick={onCardClick}>
        <div>
          <h3 className={styles.promotion_title}>{title}</h3>
          <div className={styles.promotion_date}>
            {startDate} {startDate && endDate && `-`} {endDate}
          </div>
          <div className={styles.promotion_date}>{description}</div>
        </div>
        {type && (
          <Button
            className={buttonClasses}
            text={types[type]}
            onClick={onClick}
            width="max-content"
          />
        )}
      </div>
    </div>
  );
};

export default PromotionCard;
