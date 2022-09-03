import classNames from "classnames";
import Icon from "components/Icon/Icon";
import { ReactNode, useState } from "react";
import styles from "./Tabs.module.scss";

const TabPane = (props: {
  icon?: string;
  label: ReactNode | ReactNode[];
  subLabel: ReactNode | ReactNode[];
  value: string;
  currentTab: string;

  setCurrentTab: (e: string) => void;
}) => {
  const { label, subLabel, value, currentTab, icon, setCurrentTab } = props;
  const tabClassNames = classNames(styles.tab_label, {
    [styles.selected]: currentTab === value,
  });
  return (
    <div
      key={value}
      className={tabClassNames}
      onClick={() => setCurrentTab(value)}
    >
      <div className={styles.left_border} />
      <div className={styles.tab_label_content}>
        <div className={styles.label}>
          {icon && <Icon icon={icon} size={20} />}
          {label}
        </div>
        <p className={styles.sub_label}>{subLabel}</p>
      </div>
    </div>
  );
};

const Tabs = (props: {
  tabList: {
    icon?: string;
    label: ReactNode | ReactNode[];
    subLabel?: ReactNode | ReactNode[];
    value: string;
    content?: ReactNode | ReactNode[];
  }[];
}) => {
  const { tabList } = props;
  const [currentTab, setCurrentTab] = useState<string>(tabList[0].value);
  const getCurrentTabIndex = tabList.findIndex(
    (item) => item.value === currentTab
  );
  return (
    <div className={styles.tabs}>
      <div className={styles.tab_label_container}>
        {tabList.map((tab) => {
          return (
            <TabPane
              key={tab.value}
              icon={tab.icon}
              label={tab.label}
              subLabel={tab.subLabel}
              value={tab.value}
              currentTab={currentTab}
              setCurrentTab={(e) => setCurrentTab(e)}
            />
          );
        })}
      </div>
      <div className={styles.panel}>{tabList[getCurrentTabIndex].content}</div>
    </div>
  );
};

export default Tabs;
