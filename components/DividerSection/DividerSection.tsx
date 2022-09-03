import styles from "./DividerSection.module.scss";

interface IDividerSection {
  className?: string;
  title?: string;
  color?: any;
  backgroundColor?: any;
}

const DividerSection = (props: IDividerSection) => {
  const { title, className, backgroundColor, color } = props;

  const titleColor: any = {
    color: color ? color : "#ffffff",
  };

  const backgroundColorBar: any = {
    backgroundColor: backgroundColor ? backgroundColor : "#e60112",
  };

  return (
    <div
      className={`${styles.divider_section} ${className} ${
        backgroundColor && styles.color
      }`}
      style={backgroundColorBar}
    >
      <h1
        style={titleColor}
        className={`${styles.divider_section_title} uppercase text-center font-extrabold`}
      >
        {title || "Title"}
      </h1>
    </div>
  );
};

export default DividerSection;
