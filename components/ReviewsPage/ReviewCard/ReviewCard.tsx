import { useContext, useEffect, useState } from "react";
import Input from "components/Input/Input";
import Icon from "components/Icon/Icon";
import Image from "next/image";
import Upload from "components/Upload/Upload";
import Select from "components/Select/Select";
import Checkbox from "components/Checkbox/Checkbox";
import Button from "components/Button/Button";
import styles from "./ReviewCard.module.scss";
import Rate from "components/Rate/Rate";
import Link from "next/link";
import classNames from "classnames";
import Break from "components/Break/Break";
import AuthPopup from "components/AuthPopup/AuthPopup";
import { useRouter } from "next/router";
import moment from "moment";
import { monthOfTwoYearsOptions } from "utils";
import { url } from "inspector";
import { UserInforContext } from "Context/UserInforContext";

const dummyDate = [
  { label: "April 2022", value: "April 2022" },
  { label: "March 2022", value: "March 2022" },
  { label: "Febuary 2022", value: "Febuary 2022" },
  { label: "January 2022", value: "January 2022" },
  { label: "December 2021", value: "December 2021" },
];

export const rateType = {
  1: "Very poor",
  2: "Poor",
  3: "OK",
  4: "Good",
  5: "Very good",
};

export const ReviewForm = (props) => {
  const { rating, onSubmit } = props;

  const [content, setContent] = useState<string>();
  const [images, setImages] = useState<any>([]);
  const [visitedDate, setVisitedDate] = useState<any>();
  const [checkbox, setCheckbox] = useState<boolean>(false);

  const handleSubmit = () => {
    const dataSend = {
      content,
      images,
      visitedDate,
      rating, // TODO: check
    };
    onSubmit(dataSend);
  };

  const checkDisabled = (rating: number, checkbox: boolean) => {
    return rating && rating > 0 && checkbox ? true : false;
  };

  return (
    <div className={styles.form_review}>
      <div className={styles.form_group}>
        <Input
          size="large"
          placeholder="Review"
          width={`100%`}
          autoFocus
          onChange={(e: any) => setContent(e.target.value)}
        />
      </div>
      <div className={styles.form_group}>
        <div className={styles.form_label}>Add images/ videos ( up to 3 )</div>
        <Upload
          isPaid
          multiple
          type="media"
          fileList={images}
          centerIcon={<Icon icon="plus" />}
          onChange={(imageList) => setImages(imageList)}
        />
      </div>
      <div className={styles.form_group}>
        <Select
          label="When did you purchase item / use services?"
          placeholder="Select one"
          size="large"
          options={monthOfTwoYearsOptions()}
          onChange={(e: any) => {
            setVisitedDate(e.label);
          }}
        />
      </div>
      <div className={styles.form_group}>
        <Checkbox
          id={Math.random().toString()}
          label="I certify that this review is solely based on my own experience, my genuine opinion and that I have no personal or business relationship with the establishment. I have not been offered any incentive or payment originating from the establishment to write this review. I understand that Tribes has a zero-tolerance policy on fake reviews"
          onChange={() => setCheckbox(!checkbox)}
        />
      </div>
      <Button
        text="Submit"
        width="auto"
        className={styles.btn_submit}
        onClick={handleSubmit}
        disabled={!checkDisabled(rating, checkbox)}
      />
    </div>
  );
};

interface IReviewCardProps {
  listingUrl?: string;
  id: string | number;
  title: string;
  imgUrl: string;
  isVerified: boolean;
  rateNumber: number;
  location?: string;
  onSubmit?: any;
}

const ReviewCard = (props: IReviewCardProps) => {
  const {
    listingUrl,
    id,
    title,
    imgUrl,
    isVerified,
    rateNumber,
    location,
    onSubmit,
  } = props;

  const [expanded, setExpanded] = useState<boolean>(false);
  const [rating, setRating] = useState<number>();
  const [ratingType, setRatingType] = useState<string>("");
  const [ratingReadonly, setRatingReadonly] = useState<boolean>(true);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const router = useRouter();
  const { user } = useContext(UserInforContext);

  const isLoggedIn = user.token ? false : true;

  const handleReview = () => {
    isLoggedIn ? setShowAuthPopup(true) : setExpanded(!expanded);
  };

  const handleCickRating = (value: number) => {
    setRating(value);
    setRatingType(rateType[value]);
  };

  return (
    <div className={styles.review_card}>
      <div className="flex">
        <div className={styles.featured_image}>
          {isVerified && (
            <div className={styles.verified}>
              <Icon icon="verified-tag" className={styles.verified_icon} />
            </div>
          )}
          <Image
            src={imgUrl || require("public/images/default-page-avatar.svg")}
            width="100%"
            height="56%"
            layout="responsive"
            className="rounded-lg"
            objectFit="contain"
            alt="review_featured_image"
          />
        </div>
        <div className={styles.display_mobile}>
          <h4
            className={styles.title}
            onClick={() => router.push(`/${listingUrl}`)}
          >
            {title}
          </h4>
          <div className={styles.location}>{location}</div>
          <Break />
          <div className={`${styles.cta_group} mb-0`}>
            <Rate
              readonly={isLoggedIn}
              initialRating={rating}
              placeholderRating={rateNumber}
              onClick={(value) => handleCickRating(value)}
            />
            {expanded ? (
              <div className={styles.cta_click}>{ratingType}</div>
            ) : (
              <div
                className={`${styles.cta_click} cursor-pointer`}
                onClick={handleReview}
              >
                Click to rate
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className={styles.display_desktop}>
          <h4
            className={styles.title}
            onClick={() => router.push(`/${listingUrl}`)}
          >
            {title}
          </h4>
          <div className={styles.location}>{location}</div>
        </div>
        <div className={`${styles.cta_group} ${styles.display_desktop}`}>
          <Rate
            readonly={isLoggedIn}
            initialRating={rating}
            placeholderRating={rateNumber}
            onChange={(value) => handleCickRating(value)}
          />
          {expanded ? (
            <div className={styles.cta_click}>{ratingType}</div>
          ) : (
            <div
              className={`${styles.cta_click} cursor-pointer`}
              onClick={handleReview}
            >
              Click to rate
            </div>
          )}
        </div>
        {expanded && <ReviewForm onSubmit={onSubmit} rating={rating} />}
      </div>
      <AuthPopup
        onClose={() => setShowAuthPopup(false)}
        visible={showAuthPopup}
      />
    </div>
  );
};

export default ReviewCard;
