import Icon from "components/Icon/Icon";
import Popover, { PopoverProps } from "components/Popover/Popover";

import styles from "./UpgradePopup.module.scss";

interface UpgradePopupProps extends PopoverProps {}

const UpgradePopup = (props: UpgradePopupProps) => (
  <Popover
    position={props.position}
    contentClassName={styles.free_deals_popover}
    content={
      <div className="p-0">
        <Icon icon="star-2" color="white" />
        Upgrade to use feature!
      </div>
    }
  >
    {props.children}
  </Popover>
);

export default UpgradePopup;
