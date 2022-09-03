import { get } from "lodash";
import { useEffect, useState } from "react";

import { ProfileTabFavourited } from "enums";
import TabsHorizontal, { ITab } from "components/TabsHorizontal/TabsHorizontal";
import InforCard, { InforCardProps } from "components/InforCard/InforCard";
import BizlistingApi from "services/biz-listing";

import styles from "./PanelFavouried.module.scss";
import UserApi from "services/user";
import Loader from "components/Loader/Loader";
import { useRouter } from "next/router";
import { formatCardItemProps, getListingUrl } from "utils";

const ListCard = (props: {
  data: { [key: string]: any }[];
  onRemoveFavourite: (listing) => void;
}) => {
  const { data, onRemoveFavourite } = props;
  const router = useRouter();

  const handleDirectToHomeListing = (item) => {
    const listingUrl = getListingUrl(
      get(item, "categories[0]"),
      get(item, "category_links[0]"),
      item.slug
    );
    router.push(`/${listingUrl}`);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-5 gap-y-4 md:gap-y-8">
      {Array.isArray(data) &&
        data.map((card, index) => (
          <InforCard
            key={card.slug}
            {...formatCardItemProps(card)}
            className="w-full"
            isFavourited={true}
            onFavouritedClick={() => onRemoveFavourite(card)}
            onClick={() => handleDirectToHomeListing(card)}
          />
        ))}
    </div>
  );
};

const FavouriedPanel = () => {
  const [currentTab, setCurrentTab] = useState<ProfileTabFavourited>(
    ProfileTabFavourited.EAT
  );
  const [loading, setLoading] = useState(true);
  const [favouriteListings, setFavouriteListings] = useState<any>();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    const getListingFavourite = async (slug) => {
      const data = await BizlistingApi.getListingFavouriteByCategory(slug);
      const rawData = get(data, "data.data");
      const listings =
        (Array.isArray(rawData) &&
          rawData.map((item) => ({
            id: item.id,
            images: item.images || [],
            imgUrl: get(item, "images[0]") || "https://picsum.photos/200/300",
            title: item.name,
            slug: item.slug,
            isVerified: item.is_verified,
            address: item.address,
            country: item.country,
            description: item.description,
            followerNumber: get(item, "user_listing_follows.length") || 0,
            tags: item.tags,
            categories: item.categories,
            price: item.min_price || "",
            currency: item.currency?.toUpperCase() || "",
            rate: item.rate,
            rateNumber: item.rate_number,
            category_links: item.category_links,
          }))) ||
        [];
      setFavouriteListings(listings);
      setTotal(listings.length);
      setLoading(false);
    };

    userInfo && userInfo?.token && getListingFavourite(currentTab);
  }, [currentTab, loading]);

  const handleRemoveFavorite = async (removedListing) => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");

    await UserApi.removeListingFavourite({
      userId: userInfo.id,
      listingFavouriteId: removedListing.id,
    });
    setLoading(true);
  };

  const TabList: ITab[] = [
    {
      label: ProfileTabFavourited.EAT,
      value: ProfileTabFavourited.EAT,
      content: (
        <ListCard
          data={favouriteListings}
          onRemoveFavourite={handleRemoveFavorite}
        />
      ),
    },
    {
      label: ProfileTabFavourited.BUY,
      value: ProfileTabFavourited.BUY,
      content: (
        <ListCard
          data={favouriteListings}
          onRemoveFavourite={handleRemoveFavorite}
        />
      ),
    },
    {
      label: ProfileTabFavourited.SEE_DO,
      value: ProfileTabFavourited.SEE_DO,
      content: (
        <ListCard
          data={favouriteListings}
          onRemoveFavourite={handleRemoveFavorite}
        />
      ),
    },
    {
      label: ProfileTabFavourited.TRANSPORT,
      value: ProfileTabFavourited.TRANSPORT,
      content: (
        <ListCard
          data={favouriteListings}
          onRemoveFavourite={handleRemoveFavorite}
        />
      ),
    },
    {
      label: ProfileTabFavourited.STAY,
      value: ProfileTabFavourited.STAY,
      content: (
        <ListCard
          data={favouriteListings}
          onRemoveFavourite={handleRemoveFavorite}
        />
      ),
    },
  ];

  if (loading) {
    return (
      <div className="w-full flex justify-center mt-20">
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.favouried_panel}>
      <TabsHorizontal
        selectedTab={ProfileTabFavourited.EAT}
        type="primary-outline"
        tablist={TabList}
        className={styles.favouried_tab}
        onChangeTab={(e) => setCurrentTab(e)}
      />
      {total > 0 && <div className={styles.total}>Total: {total}</div>}
    </div>
  );
};

export default FavouriedPanel;
