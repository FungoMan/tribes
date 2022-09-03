import { get } from "lodash";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import classNames from "classnames";

import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Modal from "components/Modal/Modal";
import Radio from "components/Radio/Radio";
import ResultModal from "components/ReviewsPage/ResultModal/ResultModal";
import { reportReasons } from "constant";
import { UserInforContext } from "Context/UserInforContext";
import reportApi from "services/report";
import { detectIsVideo } from "utils";
import { isArray } from "utils";

import styles from "./Album.module.scss";

interface AlbumProps {
  id: string;
  listingId?: string | number;
  reportMedia?: boolean;
  images?: any[];
  showedPicsNumber?: { slidesToShow: number; slidesToScroll: number };
}

export const Album = (props: AlbumProps) => {
  const {
    id,
    listingId,
    reportMedia = true,
    images = [],
    showedPicsNumber = { slidesToShow: 8, slidesToScroll: 8 },
  } = props;

  const [navThumbnail, setNavThumbnail] = useState<any>();
  const [navGallery, setNavGallery] = useState<any>();
  const [isMobile, setIsMobile] = useState(false);
  const [reason, setReason] = useState<string>("default");
  const [showReportModal, setShowReportModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [submitResult, setSubmitResult] = useState(false);

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

  const { user } = useContext(UserInforContext);

  const refSlider1 = useRef<any>(null);
  const refSlider2 = useRef<any>(null);

  const handlePrevGallery = () => {
    if (refSlider2 && refSlider2.current) {
      refSlider2.current.slickPrev();
    }
  };
  const handleNextGallery = () => {
    if (refSlider2 && refSlider2.current) {
      refSlider2.current.slickNext();
    }
  };

  const handlePrevThumbnail = () => {
    if (refSlider1 && refSlider1.current) {
      refSlider1.current.slickPrev();
    }
  };

  const handleNextThumbnail = () => {
    if (refSlider1 && refSlider1.current) {
      refSlider1.current.slickNext();
    }
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < 430);
    setNavThumbnail(refSlider1.current);
    setNavGallery(refSlider2.current);
  }, []);

  const configThumbnail: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
    asNavFor: navGallery,
  };

  const configGallery: Settings = {
    className: styles.slider_gallery_item,
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 4 : showedPicsNumber.slidesToShow,
    slidesToScroll: isMobile ? 4 : showedPicsNumber.slidesToScroll,
    cssEase: "linear",
    focusOnSelect: true,
    asNavFor: navThumbnail,
    adaptiveHeight: true,
  };

  const handleShowReportModal = () => {
    setShowReportModal(true);
  };

  const handleCloseReportModal = () => {
    setShowReportModal(false);
    setReason("default");
  };

  const onSubmit = async () => {
    setShowReportModal(false);
    const body = {
      type: "media",
      reason: reason,
      user: user.id,
      biz_listing: listingId,
      link_media: images,
    };

    await reportApi
      .createReport(body)
      .then((res) => {
        setSubmitResult(true);
        setReason("default");
      })
      .catch((error) => {
        setSubmitResult(false);
      })
      .finally(() => {
        setShowReportModal(false);
        setShowResultModal(true);
      });
  };

  const notOtherReason = reportReasons?.slice(0, 5).map((item) => item.value);
  notOtherReason.push("default");

  const galleryPrevBtnClassName = classNames(styles.btn_prev, {
    hide: get(images, "length") > 12,
  });

  const galleryNextBtnClassName = classNames(styles.btn_next, {
    hide: get(images, "length") > 12,
  });

  return (
    <div className={styles.slider_syncing}>
      <div className={styles.slider_thumbnail_container}>
        {reportMedia && (
          <div onClick={handleShowReportModal} className={styles.btn_report}>
            <Icon icon="flag" size={25} color="#FFFFFF" />
          </div>
        )}
        <div onClick={handlePrevThumbnail} className={styles.btn_prev}>
          <Icon icon="carret-left" size={40} color="#FFFFFF" />
        </div>
        {Array.isArray(images) && images.length > 0 && (
          <Slider
            ref={refSlider1}
            {...configThumbnail}
            className={styles.slider_thumbnail}
          >
            {images.map((src, index) => (
              <div key={index} className={styles.slider_thumbnail_item}>
                {detectIsVideo(src) ? (
                  <video
                    id="video"
                    src={src}
                    controls
                    className={styles.video}
                  />
                ) : (
                  <Image
                    src={src}
                    layout="fill"
                    alt={`thumbnail-${index}`}
                    objectFit="contain"
                  />
                )}
              </div>
            ))}
          </Slider>
        )}
        <div onClick={handleNextThumbnail} className={styles.btn_next}>
          <Icon icon="carret-right" size={40} color="#FFFFFF" />
        </div>
      </div>
      <div className={styles.slider_gallery_container}>
        <div onClick={handlePrevGallery} className={galleryPrevBtnClassName}>
          <Icon icon="carret-left" size={30} color="#FFFFFF" />
        </div>
        <Slider
          ref={refSlider2}
          {...configGallery}
          className={styles.slider_gallery}
        >
          {isArray(images) &&
            images.map((src, index) => (
              <div key={index} className={styles.slider_gallery_item}>
                {detectIsVideo(src) ? (
                  <video src={src} className={styles.video} />
                ) : (
                  <Image
                    src={src}
                    layout="fill"
                    alt={`gallery-${index}`}
                    objectFit="contain"
                  />
                )}
              </div>
            ))}
        </Slider>
        <div onClick={handleNextGallery} className={galleryNextBtnClassName}>
          <Icon icon="carret-right" size={30} color="#FFFFFF" />
        </div>
      </div>
      <Modal
        visible={showReportModal}
        title="Why do you report this photo/video?"
        width={780}
        onClose={handleCloseReportModal}
      >
        <div className="p-[30px] flex flex-col gap-5">
          {reportReasons.map((item) => (
            <Radio
              id={`${id} - ${item.label}`}
              key={item.value}
              label={item.label}
              value={item.value}
              name={`${id}-report-media`}
              onChange={(e: any) => setReason(e.target.value)}
              checked={
                notOtherReason.includes(reason)
                  ? reason === item.value
                  : undefined
              }
            />
          ))}
          <Input
            value={notOtherReason.includes(reason) ? "" : reason}
            placeholder="Your reason"
            onChange={(e: any) => setReason(e.target.value)}
            disabled={notOtherReason.includes(reason)}
          />
          <div className="flex justify-end gap-3">
            <Button
              variant="no-outlined"
              text="Cancel"
              width={100}
              onClick={handleCloseReportModal}
            />
            <Button
              text="Submit"
              width={150}
              onClick={onSubmit}
              disabled={!(reason && reason !== "default")}
            />
          </div>
        </div>
      </Modal>
      <ResultModal
        resultType={resultType}
        visible={showResultModal}
        isSuccess={submitResult}
        onClose={() => setShowResultModal(false)}
      />
    </div>
  );
};

export default Album;
