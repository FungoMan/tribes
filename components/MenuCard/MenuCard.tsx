import Image from "next/image";
import styles from "./MenuCard.module.scss";

interface MenuCardProps {
  imgUrl?: string;
  title?: string;
  onClick?: () => void;
}

const MenuCard = (props: MenuCardProps) => {
  const { imgUrl, title, onClick } = props;
  return (
    <div className={styles.menu_container} onClick={onClick}>
      {imgUrl && <Image src={imgUrl} alt="thumbnail" width={200} height={200} />}
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default MenuCard;
