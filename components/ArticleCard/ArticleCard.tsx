import Image from "next/image";
import styles from "./ArticleCard.module.scss";

interface CollectionCardProps {
  imgUrl?: string;
  title?: string;
  time?: string;
  width?: string | number;
  onClick?: () => void;
}

const ArticleCard = (props: CollectionCardProps) => {
  const { onClick, imgUrl, title, time, width } = props;
  return (
    <div className={styles.article_card} style={{ width }} onClick={onClick}>
      <div className={styles.banner}>
        {imgUrl && (
          <Image alt="thumbnail" layout="fill" src={imgUrl} objectFit="cover" />
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.title}>{title}</div>
        <div className={styles.time}>{time}</div>
      </div>
    </div>
  );
};

export default ArticleCard;
