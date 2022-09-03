import _, { get, isArray } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import Break from "components/Break/Break";
import Button from "components/Button/Button";
import Loader from "components/Loader/Loader";
import SectionLayout from "components/SectionLayout/SectionLayout";
import Upload from "components/Upload/Upload";
import useGetRevision from "hooks/useGetRevision";
import bizListingRevision from "services/biz-listing-revision";

import styles from "./TabContent.module.scss";

const PhotosVideos = () => {
  const { query } = useRouter();
  const { listingSlug }: any = query;

  const { loading, setLoading, revisionListing, isRevision, revisionId } =
    useGetRevision(listingSlug);

  const [images, setImages] = useState<string[]>([]);

  const preMedia = useRef(revisionListing.images);

  useEffect(() => {
    preMedia.current = revisionListing.images;
    setImages(revisionListing.images);
  }, [revisionListing.images]);

  const updateListingImages = async () => {
    const updateMedia =
      isRevision && revisionId
        ? bizListingRevision.updateBizListingRevision(revisionId, {
            images: images,
            is_revision: isRevision,
          })
        : bizListingRevision.createBizListingRevision({
            slug: revisionListing.slug,
            images: images,
            is_revision: isRevision,
          });

    updateMedia
      .then((res) => {
        toast.success("Update successfully!", { autoClose: 2000 });
        preMedia.current = images;
        setLoading(true);
      })
      .catch((error) => toast.error("Update failed"));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <SectionLayout
      title="Photos/videos"
      className={styles.photos_videos}
      containerClassName="w-full"
    >
      <div className={styles.tips_button}>
        <div className={styles.tips}>
          <strong>Tips:</strong> Click the pin icon to put 5 images on the top.
        </div>
        <Button
          text="Save change"
          width={200}
          disabled={_.isEqual(images, preMedia.current)}
          onClick={updateListingImages}
        />
      </div>
      <Break />
      <div className={styles.product_container}>
        <Upload
          multiple
          type="media"
          fileList={images}
          onChange={(imageList) => setImages(imageList)}
          isPaid={revisionListing.isPaid}
        />
      </div>
      <Break />
    </SectionLayout>
  );
};

export default PhotosVideos;
