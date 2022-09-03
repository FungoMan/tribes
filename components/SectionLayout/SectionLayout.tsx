import classNames from "classnames";
import Loader from "components/Loader/Loader";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import Icon from "components/Icon/Icon";

import styles from "./SectionLayout.module.scss";

export interface SectionLayoutProps {
  id?: string;
  title?: string;
  loading?: boolean;
  className?: string;
  childrenClassName?: string;
  children?: any;
  subTitle?: string;
  show?: boolean;
  backgroundColor?: boolean;
  containerClassName?: string;
  titleContainerClassName?: string;
  transparent?: boolean;
  seeMore?: string;
}
const SectionLayout = (props: SectionLayoutProps) => {
  const {
    id,
    loading,
    title,
    className,
    subTitle,
    show = true,
    childrenClassName,
    backgroundColor,
    children,
    transparent,
    containerClassName,
    titleContainerClassName,
    seeMore,
  } = props;

  const sectionlayoutClassName = classNames(className, styles.section_layout, {
    [styles.colored_background]: backgroundColor,
    [styles.transparent]: transparent,
  });
  const router = useRouter();

  const titleContainerClassNames = classNames(
    styles.title_container,
    titleContainerClassName
  );

  const childrenClassNames = classNames(styles.children, childrenClassName);
  if (!show) {
    return null;
  }
  return (
    <div className={sectionlayoutClassName}>
      <div className={`${styles.container} ${containerClassName}`}>
        {title && (
          <div className={styles.row}>
            <div className={titleContainerClassNames}>
              <h1 className={styles.title}>{title}</h1>
              {subTitle && <div className={styles.sub_title}>{subTitle}</div>}
            </div>
            {seeMore && (
              <div className={styles.wrapper_seemore}>
                <div
                  className={styles.see_more}
                  onClick={() => router.push(`/${seeMore}`)}
                >
                  See more
                </div>
                <Icon
                  className={styles.icon_seemore}
                  size={16}
                  color="#e60112"
                  icon="next"
                />
              </div>
            )}
          </div>
        )}
        <div className={childrenClassNames}>
          {loading ? <Loader /> : children}
        </div>
      </div>
    </div>
  );
};
export default SectionLayout;
