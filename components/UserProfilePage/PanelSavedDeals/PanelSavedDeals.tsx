import React, { useEffect, useState } from "react";
import { get, isArray } from "lodash";
import PromotionCard, {
  PromotionProps,
} from "components/PromotionCard/PromotionCard";
import BizlistingApi from "services/biz-listing";
import DealDetailModal from "components/DealDetailModal/DealDetailModal";
import Loader from "components/Loader/Loader";
import UserApi from "services/user";

import styles from "./PanelSavedDeals.module.scss";

const SavedDealsPanel = (props: { data: PromotionProps[] }) => {
  // const { data } = props
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [total, setTotal] = useState<number>();
  const [showDealDetailModal, setShowDealDetailModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<any>({});

  useEffect(() => {
    const getData = async () => {
      const data = await BizlistingApi.getFavouriteDeals();
      if (get(data, "data.data")) {
        const rawDealFavourite = get(data, "data.data");
        const favouriteDeals = isArray(rawDealFavourite)
          ? rawDealFavourite.map((item) => ({
              key: get(item, "attributes.deal.data.id"),
              title: get(item, "attributes.deal.data.attributes.name"),
              imgUrl: get(item, "attributes.deal.data.attributes.images[0]"),
              endDate: get(item, "attributes.deal.data.attributes.end_date"),
              startDate: get(
                item,
                "attributes.deal.data.attributes.start_date"
              ),
            }))
          : [];
        setData(favouriteDeals);
      }
      setLoading(false);
    };

    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    // setTotal(data.length)
    userInfo && userInfo?.token && getData();
  }, [loading]);

  const handleRemoveFavorite = async (removedListing) => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");

    await UserApi.removeDealFavourite({
      userId: userInfo.id,
      dealFavouriteId: removedListing.key,
    });
    setLoading(true);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.save_deals_panel}>
      {total && <div className={styles.total}>Total: {total}</div>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 xl:gap-x-16">
        {isArray(data) &&
          data.map((item: PromotionProps, index) => (
            <PromotionCard
              key={index}
              title={item.title}
              imgUrl={item.imgUrl}
              endDate={item.endDate}
              type={item.type}
              favourite
              startDate={item.startDate}
              onUnSaveDeal={() => handleRemoveFavorite(item)}
              onCardClick={() => {
                setShowDealDetailModal(true);
                setSelectedDeal(item);
              }}
            />
          ))}
      </div>
      <DealDetailModal
        data={{
          ...selectedDeal,
          name: selectedDeal.title,
          description: selectedDeal.description,
          information: selectedDeal.information,
          start_date: selectedDeal.startDate,
          end_date: selectedDeal.expiredAt,
        }}
        visible={showDealDetailModal}
        onClose={() => setShowDealDetailModal(false)}
      />
    </div>
  );
};

export default SavedDealsPanel;
