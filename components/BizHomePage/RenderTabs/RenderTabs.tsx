import { get, isArray } from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

import Button from "components/Button/Button";
import DealDetailModal from "components/DealDetailModal/DealDetailModal";
import Icon from "components/Icon/Icon";
import InforCard from "components/InforCard/InforCard";
import Input from "components/Input/Input";
import MenuCard from "components/MenuCard/MenuCard";
import ProductDetailModal from "components/ProductDetailModal/ProductDetailModal";
import PromotionCard from "components/PromotionCard/PromotionCard";
import { eatTabList, productTabList, serviceTabList } from "constant";
import { Categories, ListingHomePageScreens, ListingTabs } from "enums";
import Heading from "../../Heading/Heading";
import AuthPopup from "components/AuthPopup/AuthPopup";
import MenuDetailModal from "components/MenuDetailModal/MenuDetailModal";

import styles from "./RenderTabs.module.scss";
import Popover from "components/Popover/Popover";
import moment from "moment";
import UpgradePopup from "components/UpgradePopup/UpgradePopup";
import { formatCardItemProps } from "utils";
import { UserInforContext } from "Context/UserInforContext";

const initSelectedTab = (category) => {
  switch (category) {
    case Categories.BUY:
      return { itemType: ListingTabs.DEAL, tabList: productTabList };
    case Categories.EAT:
      return { itemType: ListingTabs.DEAL, tabList: eatTabList };
    default:
      return { itemType: ListingTabs.DEAL, tabList: serviceTabList };
  }
};

const EditList = ({ category, selectedTab, onSetScreen }) => {
  const tabList = initSelectedTab(category).tabList;
  const tabScreen = tabList.find((tab) => tab.value === selectedTab)?.screen;
  return <a onClick={() => onSetScreen(tabScreen)}>Edit {selectedTab}</a>;
};

interface TabContentProps {
  isViewPage?: boolean;
  selectedTab?: ListingTabs;
  cardItem?: any;
  list: any[];
  blankImg: string;
  blankText: string;
  buttonText: string;
  isPaid?: boolean;
  onClick: () => void;
  onDelete: (item: any) => void;
}

const TabContent = ({
  isViewPage,
  selectedTab,
  cardItem,
  isPaid,
  list,
  blankImg,
  blankText,
  buttonText,
  onClick,
  onDelete,
}: TabContentProps) => {
  const router = useRouter();
  const { query } = router;
  const { category, subCategory, listingSlug } = query;

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>({});
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const isDeal = selectedTab === ListingTabs.DEAL;
  const isProduct =
    selectedTab === ListingTabs.PRODUCT || selectedTab === ListingTabs.DISH;
  const itemArray = [
    ListingTabs.DISH,
    ListingTabs.PRODUCT,
    ListingTabs.SERVICE,
  ];
  const isItem = selectedTab && itemArray.includes(selectedTab);
  const CardItem = cardItem;
  const isDiabled = isPaid || isProduct;

  if (!(Array.isArray(list) && list.length)) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Image src={blankImg} width={100} height={170} alt="image_empty_box" />
        <p>{blankText}</p>
        {!isViewPage && (
          <Button
            disabled={!isDiabled}
            text={buttonText}
            size="small"
            width={300}
            className="my-5"
            onClick={onClick}
          />
        )}
      </div>
    );
  }

  const handleOpenDetailModal = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  // let DetailModal = ProductDetailModal;
  let DetailModal;
  switch (selectedTab) {
    case ListingTabs.DISH:
      DetailModal = ProductDetailModal;
      break;
    case ListingTabs.PRODUCT:
      DetailModal = ProductDetailModal;
      break;

    case ListingTabs.SERVICE:
      DetailModal = ProductDetailModal;
      break;
    case ListingTabs.DEAL:
      DetailModal = DealDetailModal;
      break;
    case ListingTabs.MENU:
      DetailModal = MenuDetailModal;
      break;
  }

  return (
    <div className={styles.tab_content_container}>
      <div className="w-full flex justify-center p-[16px]">
        <Input
          placeholder="search"
          width="100%"
          prefix={<Icon icon="search" />}
        />
      </div>
      <div className={styles.items_container}>
        {isArray(list) &&
          list.map((item) => (
            <div
              key={get(item, "attributes.id") || item.id}
              className={styles.info_card_container}
              style={{ width: isDeal ? "100%" : "" }}
            >
              <CardItem
                className={styles.small_infor_card}
                onClick={() => handleOpenDetailModal(item)}
                onCardClick={() => handleOpenDetailModal(item)}
                {...formatCardItemProps(item)}
              />
              {isItem && !isViewPage && (
                <div className={styles.delete} onClick={() => onDelete(item)}>
                  <Icon icon="delete" />
                </div>
              )}
            </div>
          ))}
      </div>
      <div
        className={styles.see_all}
        onClick={() =>
          router.push(
            `/${category}/${subCategory}/${listingSlug}/${selectedTab}/`
          )
        }
      >
        See all
      </div>
      <DetailModal
        isPaid={isPaid}
        visible={showDetailModal}
        data={selectedItem}
        onClose={() => setShowDetailModal(false)}
      />
      <AuthPopup
        onClose={() => setShowAuthPopup(false)}
        visible={showAuthPopup}
      />
    </div>
  );
};

const RenderTabs = (props: {
  id?: string;
  isPaid?: boolean;
  isViewPage?: boolean;
  itemList: any[];
  dealList: any[];
  menuList: any[];
  category: Categories;
  onSetScreen: (e: ListingHomePageScreens) => void;
  onDelete: (e: { [key: string]: any }) => void;
}) => {
  const {
    id,
    isPaid,
    isViewPage,
    itemList,
    dealList,
    menuList,
    category,
    onSetScreen,
    onDelete,
  } = props;
  const [selectedTab, setSelectedTab] = useState<ListingTabs>(
    initSelectedTab(category).itemType
  );
  const { user, updateUser } = useContext(UserInforContext);

  let tabContent;
  switch (selectedTab) {
    case ListingTabs.SERVICE:
      tabContent = (
        <TabContent
          isPaid={isPaid}
          selectedTab={selectedTab}
          isViewPage={isViewPage}
          cardItem={InforCard}
          onDelete={onDelete}
          list={itemList}
          blankImg={require("public/images/no-product.svg")}
          blankText="There are no products yet"
          buttonText="Add Service now"
          onClick={() => onSetScreen(ListingHomePageScreens.ADD_ITEMS)}
        />
      );
      break;
    case ListingTabs.PRODUCT:
      tabContent = (
        <TabContent
          isPaid={isPaid}
          selectedTab={selectedTab}
          isViewPage={isViewPage}
          cardItem={InforCard}
          onDelete={onDelete}
          list={itemList}
          blankImg={require("public/images/no-product.svg")}
          blankText="There are no products yet"
          buttonText="Add product now"
          onClick={() => onSetScreen(ListingHomePageScreens.ADD_ITEMS)}
        />
      );
      break;
    case ListingTabs.DISH:
      tabContent = (
        <TabContent
          isPaid={isPaid}
          selectedTab={selectedTab}
          isViewPage={isViewPage}
          cardItem={InforCard}
          onDelete={onDelete}
          list={itemList}
          blankImg={require("public/images/no-dish.svg")}
          blankText="There are no dish yet"
          buttonText="Add dish now"
          onClick={() => onSetScreen(ListingHomePageScreens.ADD_ITEMS)}
        />
      );
      break;
    case ListingTabs.MENU:
      const blankTextMenu =
        isPaid || isViewPage ? "There are no menu yet" : "Upgrade to upload";
      tabContent = (
        <TabContent
          isPaid={isPaid}
          selectedTab={selectedTab}
          isViewPage={isViewPage}
          cardItem={MenuCard}
          onDelete={onDelete}
          list={isPaid ? menuList : []}
          blankImg={require("public/images/no-product.svg")}
          blankText={blankTextMenu}
          buttonText="Add menu now"
          onClick={() => onSetScreen(ListingHomePageScreens.ADD_MENU)}
        />
      );
      break;
    case ListingTabs.DEAL:
      const blankTextDeal = get(user, "token")
        ? isPaid || isViewPage
          ? "There are no deal yet"
          : "Upgrade to upload"
        : "Login/sign up to see deals";
      tabContent = (
        <TabContent
          isPaid={isPaid}
          selectedTab={selectedTab}
          isViewPage={isViewPage}
          cardItem={PromotionCard}
          onDelete={onDelete}
          list={get(user, "token") ? (isPaid ? dealList : []) : []}
          blankImg={require("public/images/no-product.svg")}
          blankText={blankTextDeal}
          buttonText="Add deals now"
          onClick={() => onSetScreen(ListingHomePageScreens.ADD_DEALS)}
        />
      );
      break;
  }

  return (
    <div className="w-full" id={id}>
      <div className="flex gap-5 items-center justify-between">
        <div className="flex gap-5 items-center">
          {initSelectedTab(category).tabList.map((tab) => {
            return !isPaid &&
              (tab.value === ListingTabs.DEAL ||
                tab.value === ListingTabs.MENU) &&
              !isViewPage ? (
              <UpgradePopup>
                <Heading key={tab.text} text={tab.text} selected={false} />
              </UpgradePopup>
            ) : (
              <Heading
                key={selectedTab + tab.text}
                selected={selectedTab === tab.value}
                text={tab.text}
                onClick={() => setSelectedTab(tab.value)}
              />
            );
          })}
        </div>
        {!isViewPage &&
          (isPaid ||
            selectedTab === ListingTabs.PRODUCT ||
            selectedTab === ListingTabs.SERVICE ||
            selectedTab === ListingTabs.DISH) && (
            <EditList
              category={category}
              selectedTab={selectedTab}
              onSetScreen={onSetScreen}
            />
          )}
      </div>
      {tabContent}
    </div>
  );
};
export default RenderTabs;
