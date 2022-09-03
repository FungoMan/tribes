import Album from "components/Album/Album";
import Carousel from "components/Carousel/Carousel";
import Icon from "components/Icon/Icon";
import Modal from "components/Modal/Modal";
import Upload from "components/Upload/Upload";
import { homeBannerResponsive, homeCuratedResponsive } from "constant";
import { get } from "lodash";
import Image from "next/image";
import React, { useState } from "react";
import { detectIsVideo, isArray } from "utils";
import styles from "./Banner.module.scss";
interface BannerProps {
  isViewPage?: boolean;
  isPaid?: boolean;
  listingImages: string[];
  listingId?: string | number;
  onChangeImages?: (images: string[]) => void;
}

const CenterIcon = () => (
  <div className="flex flex-col items-center gap-1">
    <Icon icon="camera-color" size={40} />
    <p>Add photos/ videos</p>
  </div>
);

const Banner = (props: BannerProps) => {
  const { isPaid, isViewPage, listingImages, listingId, onChangeImages } =
    props;
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  return (
    <React.Fragment>
      <Upload
        className={styles.banner}
        centerIcon={<CenterIcon />}
        onChange={onChangeImages}
        type="banner"
        isPaid={isPaid}
        fileList={listingImages}
        disabled={isViewPage}
        isViewPage={isViewPage}
        multiple
        onImageClick={() => {
          setShowAlbumModal(true);
        }}
      />
      <Carousel
        responsive={homeCuratedResponsive}
        key={get(listingImages, "length")}
        isShow={isArray(listingImages)}
        className={styles.mobile_banner}
      >
        {isArray(listingImages) &&
          listingImages.map((img, index) => (
            <div key={index}>
              <div
                className={styles.mobile_banner_card}
                onClick={() => setShowAlbumModal(true)}
              >
                {detectIsVideo(img) ? (
                  <video
                    src={img}
                    onClick={() => setShowAlbumModal(true)}
                    // className={styles.mobile_banner_card_video}
                  />
                ) : (
                  <Image
                    alt="banner"
                    layout="intrinsic"
                    height={300}
                    width={300}
                    src={img}
                    objectFit="cover"
                  />
                )}
              </div>
            </div>
          ))}
      </Carousel>
      <Modal
        visible={showAlbumModal}
        title=" "
        width="90%"
        maxHeight="800px"
        mobilePosition="center"
        contentClassName="pb-3"
        onClose={() => setShowAlbumModal(false)}
      >
        <Album
          id="banner-album"
          key={get(listingImages, "length")}
          images={listingImages}
          listingId={listingId}
        />
      </Modal>
    </React.Fragment>
  );
};

export default Banner;
