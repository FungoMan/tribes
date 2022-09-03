import Icon from "components/Icon/Icon";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styles from "./ListingInfoCardInReview.module.scss";

const ListingInfoCardInReview = (props) => {
  const {
    title,
    rate,
    rateNumber,
    followerNumber,
    imgUrl,
    tags,
    location,
    listingUrl,
  } = props;
  const router = useRouter();

  const handleDirectToHomepage = () => router.push(`/${listingUrl}`);

  return (
    <div className={styles.biz_info}>
      <div className={styles.avatar} onClick={handleDirectToHomepage}>
        {imgUrl && (
          <Image
            src={imgUrl || require("public/images/default-page-avatar.svg")}
            height="100%"
            width="100%"
            layout="responsive"
            alt="banner-listing"
          />
        )}
      </div>
      <div className={styles.summary}>
        {title && (
          <h6 className={styles.title} onClick={handleDirectToHomepage}>
            {title}
          </h6>
        )}
        <div className={styles.group}>
          {rate && (
            <>
              <Icon icon="red-star" size={12} className="mr-2" />
              <span className={styles.rate}>{rate}</span>
            </>
          )}
          {rateNumber && (
            <React.Fragment>
              <Icon icon="dot" size={10} color="#C6C8D2" className="mx-2" />
              <span className="ml-1">{rateNumber}</span>
            </React.Fragment>
          )}
          <div>{followerNumber} followers</div>
        </div>
        {location && (
          <div className={styles.group}>
            <Icon icon="map" size={12} className="mr-2" />
            <div>{location}</div>
          </div>
        )}
        {tags && (
          <div className={styles.group}>
            {tags?.map((tag) => (
              <div key={tag} className={styles.tag}>
                <span>{tag}</span>
                <span className="mx-2.5">|</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingInfoCardInReview;
