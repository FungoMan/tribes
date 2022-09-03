import axios from "axios";
import classNames from "classnames";
import Icon from "components/Icon/Icon";
import { get } from "lodash";
import Image from "next/image";
import VideoThumbnail from "react-video-thumbnail";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import styles from "./Upload.module.scss";
import Popover from "components/Popover/Popover";
import { detectIsVideo } from "utils";
import Router from "next/router";
import { UserInforContext } from "Context/UserInforContext";
import { ClaimStep } from "enums";
import UpgradePopup from "components/UpgradePopup/UpgradePopup";
import ConfirmModal from "components/ConfirmModal";
import Modal from "components/Modal/Modal";
import Button from "components/Button/Button";

export interface UploadProps {
  name?: string;
  onChange?: (event: string[]) => void;
  accept?: string;
  fileList?: any[];
  className?: string;
  disabled?: boolean;
  multiple?: boolean;
  centerIcon?: ReactNode;
  type?: "avatar" | "cover" | "upload" | "media" | "banner";
  isPaid?: boolean;
  isViewPage?: boolean;
  onImageClick?: ((value?: string) => void) | any;
}

const Upload = (props: UploadProps) => {
  const {
    name,
    onChange,
    className,
    centerIcon = <Icon icon="camera" size={40} />,
    multiple,
    disabled,
    accept = "image/*, video/*",
    fileList = [],
    type = "media",
    isPaid,
    isViewPage,
    onImageClick,
  } = props;

  const { user, updateUser } = useContext(UserInforContext);

  const [srcList, setSrcList] = useState<string[]>([]);
  const [localFileList, setLocalFileList] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    if (Array.isArray(fileList) && fileList.length > 0) {
      const lastItemArray = Array.isArray(fileList)
        ? [fileList[fileList.length - 1]]
        : [];
      const initFileList = multiple ? fileList : lastItemArray;
      setSrcList(initFileList);
      setLocalFileList(initFileList);
    }
  }, [fileList, multiple]);

  // setup for banner for not show all images even its paid listing
  const showedImages =
    type === "banner"
      ? isPaid
        ? Array.isArray(srcList) && srcList.slice(0, 4)
        : Array.isArray(srcList) && srcList.slice(0, 3)
      : srcList;

  const showInput =
    ((!multiple && !srcList?.length) || multiple) &&
    (isPaid || (!isPaid && srcList?.length < 3));

  const hasOnePic = get(srcList, "length") == 1;
  const hasTwoPics = get(srcList, "length") == 2;
  const hasThreePics = get(srcList, "length") == 3;
  const hasMoreThanOnePic = get(srcList, "length") > 1;
  const hasMoreThanTwoPics = get(srcList, "length") > 2;
  const hasMoreThanThreePics = get(srcList, "length") > 3;
  const hasMoreThanFourPics = get(srcList, "length") > 4;

  const handleChange = (event: any, src?: any) => {
    const imgIndex: any = srcList.indexOf(src);

    const files: Blob[] = Object.values(event.target.files);
    const srces = files?.map((file) => URL.createObjectURL(file));
    let newSrcList = [...srcList];

    if (!multiple) {
      newSrcList = [...srces];
    } else if (imgIndex !== -1) {
      newSrcList[imgIndex] = srces[0];
    } else {
      newSrcList = [...newSrcList, ...srces];
    }

    setSrcList(newSrcList);

    setIsUploading(true);
    let data = new FormData();
    files.forEach((file) => {
      data.append("files", file);
    });

    axios
      .post(
        "https://services.eastplayers-client.com/api/v1/files/multiple-upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGNjNjFiLTg0ZjgtNDhkMS04Y2MwLWI1NDY2OTg1OThiNCIsImZ1bGxfbmFtZSI6bnVsbCwiZW1haWwiOiJuYW1lbmFtZUBnbWFpbC5jb20iLCJzY2hlbWEiOiJwdWJsaWMiLCJpYXQiOjE2NTU0MDc1NTksImV4cCI6MTY4Njk0MzU1OX0.mUqlELAL8G5YrK5MA4M_WZeHbQSdbvikU7C4vgPIPaI`,
          },
        }
      )
      .then((res) => {
        const responseUrls = get(res, "data.urls") || [];
        if (responseUrls.length > 0) {
          let newFileList = Array.isArray(fileList) ? [...fileList] : [];
          if (!multiple) {
            newFileList = [...responseUrls];
          } else if (imgIndex !== -1) {
            newFileList[imgIndex] = responseUrls[0];
          } else {
            newFileList = [...newFileList, ...responseUrls];
          }
          setLocalFileList(newFileList);
          onChange?.(newFileList);
        }
      })
      .finally(() => setIsUploading(false));
  };

  const Input = ({ onChange, multiple }) => (
    <input
      id="upload-input-btn"
      disabled={disabled || isUploading}
      type="file"
      name={name}
      accept={accept}
      multiple={multiple}
      onChange={onChange}
    />
  );

  const handleRemoveItem = (src) => {
    const imgIndex: any = srcList.indexOf(src);
    const newSrcList = [...srcList].filter((item) => item !== src);

    const newFileList = [...localFileList].filter(
      (item, index) => imgIndex !== index
    );

    setSrcList(newSrcList);
    setLocalFileList(newFileList);
    onChange?.(newFileList);
  };

  const containerClassName = classNames(styles.upload, className, {
    [styles.avatar]: type === "avatar",
    [styles.cover]: type === "cover",
    [styles.media]: type === "media",
    [styles.banner]: type === "banner",
    [styles.disabled]: disabled,
  });

  const mediaClassName = (index) => {
    const viewBanner = isViewPage && type === "banner";
    const editBanner = !isViewPage && type === "banner";
    const firstPic = index == 0;
    const secondPic = index == 1;
    const thirdPic = index == 2;
    const fourthPic = index == 3;

    return classNames(styles.image, {
      [styles.uploading]: isUploading,
      [styles.view_page]: isViewPage,
      //images in edit
      [styles.first_pic]: firstPic && editBanner,
      [styles.second_pic]: secondPic && editBanner,
      [styles.third_pic]: thirdPic && editBanner && isPaid,
      [styles.third_pic_free]: thirdPic && editBanner && !isPaid,
      [styles.fourth_pic]: index === 3 && editBanner,
      //images in view
      [styles.view_first_one_pic]: firstPic && hasOnePic && viewBanner,
      [styles.view_first_two_pics]: firstPic && hasMoreThanOnePic && viewBanner,
      [styles.view_second_two_pics]: secondPic && hasTwoPics && viewBanner,
      [styles.view_second_three_pics]: secondPic && hasThreePics && viewBanner,
      [styles.view_third_three_pics]: thirdPic && hasThreePics && viewBanner,
      [styles.view_second_four_pics]:
        secondPic && hasMoreThanThreePics && viewBanner,
      [styles.view_third_four_pics]:
        thirdPic && hasMoreThanThreePics && viewBanner,
      [styles.view_fourth_four_pics]:
        fourthPic && hasMoreThanThreePics && viewBanner,
      [styles.see_more]: fourthPic && hasMoreThanFourPics && viewBanner,
    });
  };

  const addMoreButtonClassName = classNames(styles.input, {
    [styles.one_pic]: type === "banner" && hasOnePic,
    [styles.two_pics]: type === "banner" && hasTwoPics,
    [styles.three_pics]: type === "banner" && hasThreePics,
    [styles.more_than_three_pics]: type === "banner" && hasMoreThanThreePics,
  });

  const handleOpenFileModal = () => {
    isPaid
      ? document.getElementById("upload-input-btn")?.click()
      : setShowUpgradeModal(true);
  };

  const manageMedia = (
    <React.Fragment>
      <div onClick={handleOpenFileModal}>Add photos/videos</div>
      <div onClick={onImageClick}>Manage photos/videos</div>
    </React.Fragment>
  );

  const deleteIconClassName = classNames(styles.close, {
    [styles.hide]: type === "avatar",
  });

  const handleHref = () => {
    updateUser({
      type_handle: "Claim",
    });
    Router.push({
      href: `/claim/${get(user, "now_biz_listing.listing_id")}`,
      query: {
        firstStep: ClaimStep.CHOOSE_TIER,
      },
    });
  };

  return (
    <div className={containerClassName}>
      {Array.isArray(showedImages) &&
        showedImages.map((src, index) => (
          <div
            key={src}
            className={mediaClassName(index)}
            onClick={() => isViewPage && onImageClick?.(src)}
          >
            <div
              className={deleteIconClassName}
              onClick={() => handleRemoveItem(src)}
            >
              <Icon icon="cancel" size={25} />
            </div>
            <div className={styles.add_icon}>{centerIcon}</div>
            <div className={styles.loader} />
            <Input onChange={(e) => handleChange(e, src)} multiple={false} />
            {detectIsVideo(src) ? (
              <video id="video" src={src} controls className={styles.video} />
            ) : (
              src && (
                <Image
                  src={src}
                  alt="thumbnail"
                  layout="fill"
                  objectFit="cover"
                />
              )
            )}
          </div>
        ))}

      {showInput && !isUploading && !isViewPage && (
        <div className={addMoreButtonClassName}>
          <div className={styles.add_icon}>{centerIcon}</div>
          <Input onChange={handleChange} multiple={multiple} />
        </div>
      )}

      {type === "media" && !isPaid && hasMoreThanTwoPics && (
        <div className={styles.upgrade_now}>
          <div className={styles.tips}>
            <Icon icon="Group-966" color="#653fff" /> Tips
          </div>
          <div className={styles.upgrade}>
            Upgrade to Basic Tier to upload more photos and video
          </div>
          <a onClick={handleHref}>Upgrade now</a>
        </div>
      )}

      {type === "banner" && !isViewPage && get(srcList, "length") > 2 && (
        <div className={styles.edit_banner_add_more_btn}>
          <Popover content={manageMedia} contentClassName="mt-3">
            <Icon icon="plus" />
            <span>Manage photos/videos</span>
          </Popover>
        </div>
      )}
      <Modal
        visible={showUpgradeModal}
        title="Upgrade to upload more!"
        width={500}
        onClose={() => setShowUpgradeModal(false)}
      >
        <div className="flex flex-col items-center">
          <Image
            src={require("public/images/upcoming-feature.svg")}
            alt="upcoming-feature-alt"
            layout="fixed"
            height={150}
            width={150}
          />
          <div className="flex gap-5 justify-end py-3 px-[30px] w-full">
            <Button
              width="max-content"
              variant="secondary"
              text="Cancel"
              onClick={() => setShowUpgradeModal(false)}
            />
            <Button
              width="max-content"
              className="text-sm"
              text="Ok"
              onClick={handleHref}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Upload;
