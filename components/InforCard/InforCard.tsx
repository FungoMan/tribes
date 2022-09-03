import Break from "components/Break/Break";
import Icon from "components/Icon/Icon";
import Image from "next/image";
import styles from "./InforCard.module.scss";
import { useState } from "react";
import { CurrencyValues } from "enums";
import _ from "lodash";
import { isArray } from "utils";

export interface InforCardProps {
  className?: string;
  imgUrl?: string;
  title?: string;
  author?: string;
  position?: string;
  rate?: number;
  categories?: string[];
  tags?: string[];
  iconTag?: boolean;
  price?: string | number;
  currency?: string;
  isVerified?: boolean;
  discount?: string | number;
  rateNumber?: number;
  followerNumber?: number;
  discountUnit?: string;
  description?: string;
  width?: string | number;
  validUntil?: any;
  isFavourited?: boolean;
  onFavouritedClick?: () => void;
  onClick?: (item?: any) => void;
}

const InforCard = (props: InforCardProps) => {
  const {
    className,
    imgUrl,
    title,
    rate,
    author,
    position,
    description,
    rateNumber,
    followerNumber,
    categories,
    tags,
    iconTag = false,
    discountUnit,
    discount,
    price,
    isVerified,
    width,
    isFavourited,
    currency,
    onFavouritedClick,
    onClick,
  } = props;

  const sortingTags: string[] = Array.isArray(tags)
    ? tags.sort((a, b) => {
        return a?.length - b?.length;
      })
    : [];

  const optimizeTagSequence = () => {
    let optimizeTags: any[] = [];
    for (let index = 0; index < Math.floor(sortingTags.length / 2); index++) {
      optimizeTags.push(sortingTags[index]);
      optimizeTags.push(sortingTags[sortingTags.length - index - 1]);
    }
    return optimizeTags;
  };

  const renderSortingTags = () => {
    return optimizeTagSequence().map((tag) => (
      <div key={tag} className={`${styles.tag} flex items-center`}>
        {iconTag && tag === "Hot deals" && (
          <Icon icon="hot-deal" className="mr-2" />
        )}
        {tag}
      </div>
    ));
  };

  const showDiscountAmount =
    discount && price && discountUnit === CurrencyValues.PERCENTAGE;

  return (
    <div className={`${styles.infor_card} ${className}`} style={{ width }}>
      {isVerified && (
        <div className={styles.verified}>
          <Icon icon="verified-tag" className={styles.verified_icon} />
        </div>
      )}
      <div className={styles.cover}>
        {isFavourited && (
          <div className={styles.favourited} onClick={onFavouritedClick}>
            <Icon icon="like-solid" color="#e60112" />
          </div>
        )}
        <Image
          onClick={onClick}
          src={imgUrl || require("public/images/default-thumbnail.png")}
          alt="thumbnail"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className={styles.details} onClick={onClick}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>
          <div className="flex items-center">
            {!!rate && (
              <div className={styles.reviews}>
                <Icon icon="red-star" size={14} />
                <div className={styles.rate}>{rate}</div>
                <div>({rateNumber})</div>
              </div>
            )}
            {!!rate && !!followerNumber && (
              <Icon icon="dot" size={10} className={styles.dot} />
            )}
            {!!followerNumber && followerNumber > 0 && (
              <div>
                {followerNumber} follower{followerNumber > 1 && "s"}
              </div>
            )}
          </div>
          {description && (
            <div className={styles.description}>{description}</div>
          )}
          <div>
            {categories && isArray(categories) && (
              <div className={styles.categories}>
                {categories.map((cate) => (
                  <div key={cate} className={styles.category}>
                    {cate}
                  </div>
                ))}
              </div>
            )}
            {(price || tags) && <div className={styles.break} />}
          </div>
        </div>
        {/* <div className={styles.footer}>
          <div className="flex gap-1 items-center">
            {price && (
              <div className={styles.price}>
                {price} {!!currency && currency.toUpperCase()}
              </div>
            )}
            {showDiscountAmount && (
              <div className={styles.discount_amount}>
                {(_.toNumber(price) * (_.toNumber(discount) / 100 + 1)).toFixed(
                  2
                )}
              </div>
            )}
          </div>
          {discount && (
            <div className={styles.discount}>
              {discount} {!!discountUnit && discountUnit.toUpperCase()} OFF
            </div>
          )}
          {sortingTags.length > 0 && (
            <div className={styles.tags}>{renderSortingTags()}</div>
          )}
        </div>
        {author && <div className={styles.author}>{author}</div>}
        {position && <div className={styles.position}>{position}</div>} */}
      </div>
    </div>
  );
};

export default InforCard;
