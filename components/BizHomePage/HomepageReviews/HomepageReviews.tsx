import Break from "components/Break/Break";
import Button from "components/Button/Button";
import Heading from "components/Heading/Heading";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Modal from "components/Modal/Modal";
import Rate from "components/Rate/Rate";
import ReportModal from "components/ReportModal/ReportModal";
import UserReviewCard from "components/ReviewsPage/UserReviewCard/UserReviewCard";
import Select from "components/Select/Select";
import { optionsReportReview, reviewSequenceOptions } from "constant";
import { get } from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IOption } from "type";
import ReportApi from "services/report";
import AuthPopup from "components/AuthPopup/AuthPopup";
import ResultModal from "components/ReviewsPage/ResultModal/ResultModal";

import styles from "./HomepageReviews.module.scss";

interface HomepageReviewsProps {
  isPaid?: boolean;
  bizListingId?: number;
  listingSlug?: any;
  isViewPage?: boolean;
  listingRate?: number;
  reviews: any[];
  onSubmitReply: (value, id) => void;
  onChangeReviewsSequence?: (e: IOption) => void;
}

const HomepageReviews = (props: HomepageReviewsProps) => {
  const {
    bizListingId,
    listingSlug,
    reviews,
    listingRate,
    isPaid,
    isViewPage,
    onSubmitReply,
    // onChangeReviewsSequence,
  } = props;
  const [sortingReviews, setSortingReviews] = useState(reviews);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>({});
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [reply, setReply] = useState<string>("");
  const router = useRouter();

  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [submitResult, setSubmitResult] = useState<boolean>(false);
  const resultType = [
    {
      title: "Success!",
      message:
        "Thank you for your report. We will review the report and take action within 24 hours!",
      textButton: "Close",
    },
    {
      title: "Fail!",
      message: "Oops, something wrong. Please try again later.",
      textButton: "Try again",
    },
  ];

  // const handleSetReplyReview = (value) => {
  //   if (value.length <= 100) {
  //     setReplyReview(value)
  //   }
  //   else {
  //     alert('Reply cannot over 100 character')
  //   }
  // }

  const calcRateNumber = (reviews) => {
    const reviewsData = reviews;
    let rateNumber = 0;
    if (reviewsData.length > 0) {
      let sum = 0;
      reviewsData.map((review) => {
        sum += get(review, "rating") || 0;
      });
      rateNumber = Math.ceil(sum / reviewsData.length);
    } else {
      rateNumber = 0;
    }
    return rateNumber;
  };

  const handleSubmitReportReview = async (data?: any) => {
    let userInfo;
    if (typeof localStorage.getItem("user") !== null) {
      userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    }
    const userId = userInfo.id || null;
    const body = {
      type: "review",
      reason: data,
      user: userId,
      review: selectedReview.id,
      biz_listing: bizListingId,
    };

    await ReportApi.createReport(body)
      .then((res) => {
        setSubmitResult(true);
      })
      .catch((error) => {
        setSubmitResult(false);
      })
      .finally(() => {
        setShowReportModal(false);
        setShowResultModal(true);
      });
  };

  const checkLogin = () => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    userInfo.token
      ? router.push(`/reviews/${listingSlug}`)
      : setShowAuthPopup(true);
  };

  const handleChangeReviewSequence = (e) => {
    const newSequenceReviews = [...reviews];
    newSequenceReviews.sort((a, b) => {
      if (e.value === "lowest") {
        return a.rating - b.rating;
      } else if (e.value === "highest") {
        return b.rating - a.rating;
      } else {
        return 0;
      }
    });
    setSortingReviews(newSequenceReviews);
  };

  return (
    <div id="reviews" style={{ paddingTop: 130, marginTop: -130 }}>
      <Heading text="Reviews" />
      <br />
      <div className="flex gap-3 items-center">
        <div className={styles.listing_rate}>{calcRateNumber(reviews)}</div>
        <Rate readonly={true} initialRating={calcRateNumber(reviews)} />
        <div className={styles.followers}>
          | {Array.isArray(reviews) && reviews.length} review(s)
        </div>
      </div>
      {isViewPage && (
        <div className="flex justify-between items-center mt-3 gap-1">
          <Button
            variant="outlined"
            text="Add your review"
            width="max-content"
            prefix={<Icon icon="edit-color" />}
            onClick={checkLogin}
          />
          <Select
            ellipsis
            width={160}
            menuWidth={160}
            options={reviewSequenceOptions}
            defaultValue={reviewSequenceOptions[0]}
            onChange={handleChangeReviewSequence}
          />
        </div>
      )}
      <br />
      <div>
        {Array.isArray(sortingReviews) && !!sortingReviews.length ? (
          sortingReviews.map((review, index) => (
            <div key={index} className="mb-10">
              <UserReviewCard
                isPaid={isPaid}
                actions={!isViewPage}
                user={
                  get(review, "user.data.attributes") || get(review, "user")
                }
                name={
                  get(review, "user.data.attributes.display_name") ||
                  get(review, "user.display_name") ||
                  get(review, "user.data.attributes.first_name") ||
                  get(review, "user.first_name") ||
                  "" + " " + get(review, "user.data.attributes.last_name") ||
                  get(review, "user.last_name") ||
                  ""
                }
                avatarUrl={get(review, "user.data.attributes.avatar")}
                bizListingId={bizListingId}
                listImage={get(review, "images")}
                content={get(review, "content")}
                dateVisit={get(review, "visited_date")}
                createdDate={get(review, "createdAt")}
                rating={get(review, "rating")}
                reply={get(review, "reply_reviews")}
                replyAt={get(review, "date_create_reply")}
                replyAccepted={get(review, "reply_accepted")}
                onReplyClick={() => {
                  setSelectedReview(review);
                  setShowReplyModal(true);
                }}
                onReportClick={() => {
                  setSelectedReview(review);
                  setShowReportModal(true);
                }}
              />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Image
              src={require("public/images/no-review.svg")}
              width={100}
              alt="no-review"
            />
            <p>There are no review yet</p>
          </div>
        )}
      </div>
      <ReportModal
        title="Why are you reporting this comment?"
        visible={showReportModal}
        options={optionsReportReview}
        onClose={() => setShowReportModal(false)}
        onSubmit={handleSubmitReportReview}
      />
      <ResultModal
        resultType={resultType}
        visible={showResultModal}
        isSuccess={submitResult}
        onClose={() => setShowResultModal(false)}
      />
      <Modal
        visible={showReplyModal}
        title="Reply Review"
        width={780}
        onClose={() => setShowReplyModal(false)}
      >
        <div className="p-[30px]">
          <UserReviewCard
            isPaid={isPaid}
            actions={false}
            bizListingId={bizListingId}
            // user={get(selectedReview, "user.data.attributes")}
            name={
              get(selectedReview, "user.data.attributes.display_name") ||
              get(selectedReview, "user.display_name") ||
              get(selectedReview, "user.data.attributes.first_name") ||
              get(selectedReview, "user.first_name") ||
              "" +
                " " +
                get(selectedReview, "user.data.attributes.last_name") ||
              get(selectedReview, "user.last_name") ||
              ""
            }
            avatarUrl={get(selectedReview, "user.data.attributes.avatar")}
            listImage={get(selectedReview, "images")}
            content={get(selectedReview, "content")}
            dateVisit={get(selectedReview, "visited_date")}
            rating={get(selectedReview, "rating")}
            reply={get(selectedReview, "reply_reviews")}
            replyAt={get(selectedReview, "date_create_reply")}
            onReplyClick={() => setShowReplyModal(false)}
          />
          {!get(selectedReview, "reply_reviews") && (
            <Input
              placeholder="Reply ( 100 character maximum )"
              value={reply}
              maxLength={100}
              onChange={(e: any) => setReply(e.target.value)}
            />
          )}
        </div>
        <div className="flex gap-3 justify-end p-[30px]">
          <Button
            text="Cancel"
            variant="secondary-no-outlined"
            onClick={() => setShowReplyModal(false)}
          />
          <Button
            text="Send reply"
            onClick={() => {
              setShowReplyModal(false);
              setReply(get(selectedReview, "reply_reviews") || "");
              onSubmitReply(reply, selectedReview);
            }}
          />
        </div>
      </Modal>
      <AuthPopup
        onClose={() => setShowAuthPopup(false)}
        visible={showAuthPopup}
      />
    </div>
  );
};

export default HomepageReviews;
