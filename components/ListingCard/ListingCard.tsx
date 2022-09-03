import Button from "components/Button/Button";
import Image from "next/image";
import { ReactNode } from "react";
import styles from "./ListingCard.module.scss";

interface ListingCardProps {
  listing: { [key: string]: any };
  rightColumn?: ReactNode;
  onClose?: () => void;
}
const ListingCard = (props: ListingCardProps) => {
  const { listing, rightColumn, onClose } = props;
  let avatar = null;
  let imageNumber = 0;
  if (listing.attributes?.logo !== null) {
    avatar = listing.attributes?.logo?.[0];
    imageNumber = Array.isArray(listing.attributes?.logo)
      ? listing.attributes?.logo.length
      : 0;
  }
  const reviewNumber = Array.isArray(listing.attributes?.reviews?.data)
    ? listing.attributes?.reviews?.data.length
    : 0;
  const followers = Array.isArray(
    listing.attributes?.user_listing_follows?.data
  )
    ? listing.attributes?.user_listing_follows?.data.length
    : 0;
  const location = listing.attributes?.location;
  const name = listing.attributes?.name;
  // const { avatar, location, name, reviewNumber, imageNumber, followers, id } =
  //   listing;

  return (
    <div className={styles.add_listing_card}>
      <div className={styles.left_col}>
        <div className={styles.listing_details}>
          <div className={styles.listing_details_avatar}>
            {avatar && <Image src={avatar} layout="fill" alt="avatar" />}
          </div>
          <div className={styles.listing_details_infor}>
            <div className={styles.listing_details_infor_name}>{name}</div>
            <div className={styles.listing_details_infor_location}>
              {location}
            </div>
          </div>
        </div>
        <div className={styles.listing_number}>
          <div>
            <p>{reviewNumber}</p>
            reviews
          </div>
          <div>
            <p>{imageNumber}</p>
            image
          </div>
          <div>
            <p>{followers}</p>
            followers
          </div>
        </div>
      </div>
      {rightColumn && <div className={styles.right_col}>{rightColumn}</div>}
      {onClose && (
        <div className={styles.close} onClick={onClose}>
          &times;
        </div>
      )}
    </div>
  );
};
export default ListingCard;
