import { ReactElement, ReactNode, useState } from "react";
import { rateType } from "../ReviewCard/ReviewCard";
import classNames from "classnames";
import Icon from "components/Icon/Icon";
import Rate from "components/Rate/Rate";
import Image from "next/image";
import styles from "./UserReviewCard.module.scss";
import Popover from "components/Popover/Popover";
import Button from "components/Button/Button";
import { calcDistanceFromNow } from "utils";
import Upload from "components/Upload/Upload";
import Album from "components/Album/Album";
import { get, isArray } from "lodash";
import Modal from "components/Modal/Modal";
import UpgradePopup from "components/UpgradePopup/UpgradePopup";
export interface UserReviewCardProps {
  reply?: string;
  replyAt?: string;
  idReview?: string;
  className?: string;
  name?: string;
  isPaid?: boolean;
  actions?: boolean;
  replyAccepted?: boolean;
  children?: ReactElement | ReactNode;
  listingCard?: ReactElement | ReactNode;
  avatarUrl?: string;
  content?: string;
  listImage?: any[];
  dateVisit?: string;
  displayName?: string;
  rating?: number;
  censorshipLabel?: string;
  status?: "Pending" | "Approved" | "Denied";
  date?: string;
  approvedDate?: string;
  publishedAt?: string;
  createdDate?: string;
  bizListingId?: number | string;
  user?: any;
  layout?: "default" | "split";
  isDivider?: boolean;
  onReplyClick?(): void;
  onReportClick?(): void;
}

const UserReviewCard = (props: UserReviewCardProps) => {
  const {
    bizListingId,
    reply,
    replyAt,
    className = "",
    name,
    avatarUrl = "https://picsum.photos/200",
    content,
    listImage,
    dateVisit,
    layout = "default",
    replyAccepted,
    rating,
    isPaid,
    actions,
    user,
    censorshipLabel,
    status,
    children,
    isDivider,
    date,
    approvedDate,
    createdDate,
    onReplyClick,
    onReportClick,
  } = props;

  const [showAlbumModal, setShowAlbumModal] = useState(false);

  const userReviewCardClassName = classNames(
    styles.review_completed,
    className,
    {
      [styles.divider]: isDivider,
    }
  );
  const showReply = reply
    ? actions
      ? true
      : replyAccepted
      ? true
      : false
    : false;

  const statusClassName = classNames(styles.status, {
    [styles.pending]: status === "Pending",
    [styles.approved]: status === "Approved",
    [styles.denied]: status === "Denied",
  });
  const censoredStatusClassName = classNames(styles.censored_status, "flex", {
    ["justify-end"]: status === "Denied",
  });

  const UserReviewHeader = ({ show }) =>
    show ? (
      <div className="flex items-center justify-between flex-wrap w-full mb-2.5">
        <div className={styles.header}>
          <h6 className={styles.name}>
            <span>{name}</span>
            {censorshipLabel && (
              <span className="font-normal ml-2">{censorshipLabel}</span>
            )}
          </h6>
          {actions && (
            <Popover
              content={<div onClick={onReportClick}>Report review</div>}
              position="bottom-left"
            >
              <Icon icon="toolbar" />
            </Popover>
          )}
        </div>
        {/* <div className={styles.status_date}>
          {status && <div className={statusClassName}>{status}</div>}
          {(createdDate || date) && (
            <div className={styles.date}>{createdDate || date}</div>
          )}
        </div> */}
      </div>
    ) : (
      <div />
    );

  return (
    <div className={userReviewCardClassName}>
      <div className={styles.group_heading}>
        <div className={styles.review_avatar}>
          <Image
            src={
              user?.avatar ||
              avatarUrl ||
              require("public/images/default-page-avatar.svg")
            }
            height={56}
            width={56}
            alt="avatar"
            className="rounded-full"
          />
        </div>
        <UserReviewHeader show={layout === "split"} />
      </div>
      <div className={styles.review_summary}>
        <UserReviewHeader show={layout === "default"} />
        {rating && (
          <div className={styles.rating_group}>
            <Rate readonly={true} initialRating={rating} />
            <div className={styles.rating_type}>{rateType[rating]}</div>
          </div>
        )}
        {content && <p className={styles.content}>{content}</p>}
        <Upload
          onImageClick={() => setShowAlbumModal(true)}
          disabled
          type="media"
          fileList={listImage}
          isPaid={isPaid}
          isViewPage
        />
        {dateVisit && (
          <div className={styles.date_visit}>
            <strong>Date of visit: </strong>
            {dateVisit}
          </div>
        )}
        {children && <div className={styles.children}>{children}</div>}
        {status !== "Pending" && (
          <div className={censoredStatusClassName}>
            {status === "Approved" && (
              <div className={styles.censored_status_approved}>
                <Icon icon="checked-approved" className="mr-3" />
                <span>Approved on {approvedDate}</span>
              </div>
            )}
            {status === "Denied" && (
              <div className={styles.censored_status_denied}>
                <span>Contact admin</span>
              </div>
            )}
          </div>
        )}
        {showReply && (
          <div className={styles.reply_review}>
            <div className={styles.head_review}>
              <p className={styles.title}>Response from the owner</p>
              <div className={styles.time_date}>
                {calcDistanceFromNow(replyAt)}
              </div>
            </div>
            <div className={styles.description_review}>{reply}</div>
          </div>
        )}
        {actions && (
          <UpgradePopup>
            <Button
              variant="secondary"
              text="Reply review"
              width={150}
              onClick={() => isPaid && onReplyClick?.()}
            />
          </UpgradePopup>
        )}
      </div>
      {isArray(listImage) && (
        <Modal
          visible={showAlbumModal}
          title=" "
          width="90%"
          // maxHeight="90%"
          mobilePosition="center"
          onClose={() => setShowAlbumModal(false)}
          contentClassName="pb-3"
        >
          <Album
            id="listing-review-album"
            reportMedia={false}
            key={get(listImage, "length")}
            images={listImage}
            listingId={bizListingId}
          />
        </Modal>
      )}
    </div>
  );
};

export default UserReviewCard;
