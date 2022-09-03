import React, { useContext } from "react";
import Heading from "components/Heading/Heading";
import Icon from "components/Icon/Icon";
import { InformationList } from "enums";
import { UserInforContext } from "Context/UserInforContext";
import { freeInformationList, paidInformationList } from "constant";
import { useRouter } from "next/router";

interface BizAccountManagementPanelProps {
  selectedTab?: string;
  onShowSwitchModal?: () => void;
}

const BizAccountManagementPanel = (props: BizAccountManagementPanelProps) => {
  const { onShowSwitchModal } = props;

  const router = useRouter();
  const {
    query: { information },
  } = router;

  const { logout, user } = useContext(UserInforContext);

  const informationList = user.is_paid
    ? paidInformationList
    : freeInformationList;

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <React.Fragment>
      {informationList.map((item) => (
        <div
          key={item.label}
          className="flex gap-3 justify-between"
          onClick={() =>
            router.push(`/biz/${item.slug}/${user.current_listing_slug}`)
          }
        >
          <Heading
            icon={item.icon}
            text={item.label}
            type="tab"
            selected={information === item.slug}
          />
          {item.star && <Icon icon="star-2" color="#653fff" />}
        </div>
      ))}
      <div onClick={onShowSwitchModal} className="flex gap-3 justify-between">
        <Heading type="tab" text="Switch account" selected={false} />
      </div>
      <div className="flex gap-3 justify-between" onClick={handleLogout}>
        <Heading
          icon="logout"
          type="tab"
          text="Log out"
          selected={false}
          color="#e60112"
        />
      </div>
    </React.Fragment>
  );
};

export default BizAccountManagementPanel;
