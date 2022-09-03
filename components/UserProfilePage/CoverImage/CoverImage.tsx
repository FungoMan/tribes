import Image from "next/image";
import styles from "./CoverImage.module.scss";

interface CoverImageProps {
  className?: string;
  imageUrl?: string;
  layout?: "fixed" | "fill" | "intrinsic" | "responsive" | "raw";
}

const CoverImage = (props: CoverImageProps) => {
  const { className = "", imageUrl, layout = "responsive"} = props;

  return (
    <div className={`${className} ${styles.container}`}>
      <div className={styles.image}>
        <Image
          src={imageUrl || "cover_default"}
          height="100%"
          width="100%"
          // layout="responsive"
          alt="cover_image"
          objectFit="cover"
          layout={layout}
          objectPosition= 'cover'
        />
      </div>
    </div>
  );
};

export default CoverImage;
