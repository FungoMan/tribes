import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { get } from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";

import Button from "components/Button/Button";
import Carousel from "components/Carousel/Carousel";
import CollectionCard from "components/CollectionCard/CollectionCard";
import Icon from "components/Icon/Icon";
import InforCard from "components/InforCard/InforCard";
import SectionLayout from "components/SectionLayout/SectionLayout";
import TopSearches from "components/TopSearches/TopSearches";
import BizListingApi from "services/biz-listing";
import CollectionApi from "services/collection";
import BannerApi from "services/banner";
import CategoryApi from "services/category";
import Loader from "components/Loader/Loader";
import {
  formatBanner,
  formatCardItemProps,
  formatListingArray,
  getListingUrl,
  isArray,
} from "utils";
import { UserInforContext } from "Context/UserInforContext";
import { Ilisting } from "type";
import {
  curatedList,
  homeBannerResponsive,
  homeCuratedResponsive,
  infoCardResponsive,
} from "constant";
import { CategoryText } from "enums";
import styles from "styles/Home.module.scss";
import Head from "next/head";
import ArticleCard from "components/ArticleCard/ArticleCard";
import ArticleApi from "services/article";

const Home: NextPage = (props: any) => {
  const {
    listingExclusiveDeal,
    listBanners,
    // listHomeArticles,
    listCollections,
    listCategories,
  } = props;

  const [metaTitle, setMetaTitle] = useState(
    "Get Exclusive Deals For Muslim Friendly Products | Tribes by HHWT"
  );
  const [metaDescription, setMetaDescription] = useState(
    "Register. Don't have a Tribes account yet? Join now to gain access to exclusive deals from Muslim Friendly brands around the world!"
  );

  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState<number>(16);
  // const [listingForYou, setListingForYou] = useState<Ilisting[]>([]);
  const [listings, setListings] = useState<{
    buy: Ilisting[];
    eat: Ilisting[];
    seeAndDo: Ilisting[];
    stay: Ilisting[];
    transport: Ilisting[];
  }>();
  const { locale } = useRouter();
  const router = useRouter();
  const { user } = useContext(UserInforContext);
  const { location } = user;

  useEffect(() => {
    switch (locale) {
      case "sg":
        setMetaTitle(
          "Tribes: Get travel information and recommendation for what to eat, buy, things to do, where to stay and how to get there"
        );
        break;
      case "id":
        setMetaTitle(
          "Tribes: Dapatkan Informasi Travelling Seputar Tempat Makan Halal dan Penginapan"
        );
        break;
      default:
        setMetaTitle(
          "Tribes: Get travel information and recommendation for what to eat, buy, things to do, where to stay and how to get there"
        );
        break;
    }
  }, [locale]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    const getListings = async () => {
      const data = await BizListingApi.getAllBizlitingPinnedByCategory(
        location
      );
      const buyListingArray = formatListingArray(get(data, "data.data[0]"));
      const seeListingArray = formatListingArray(get(data, "data.data[1]"));
      const eatListingArray = formatListingArray(get(data, "data.data[2]"));
      const stayListingArray = formatListingArray(get(data, "data.data[4]"));
      const transportListingArray = formatListingArray(
        get(data, "data.data[3]")
      );

      setListings({
        buy: buyListingArray,
        eat: eatListingArray,
        seeAndDo: seeListingArray,
        stay: stayListingArray,
        transport: transportListingArray,
      });
      setLoading(false);
    };

    location && getListings();
    // userInfo && userInfo.token && getBizListingForYou(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // const getBizListingForYou = async (isChangeLocation?: boolean) => {
  //   setLoading(true);

  //   const dataListing = await BizListingApi.getBizListingForYou({
  //     limit: isChangeLocation ? 16 : limit,
  //     country: location || "singapore",
  //   });
  //   const rawForYouListing = get(dataListing, "data.data");
  //   const listingArray = isChangeLocation
  //     ? formatListingArray(rawForYouListing)
  //     : listingForYou.concat(formatListingArray(rawForYouListing));

  //   setListingForYou(listingArray);
  //   setLimit(limit + 16);
  //   setLoading(false);
  // };

  const handleHref = (item: any) => {
    const url = `/${getListingUrl(
      get(item, "categories[0]"),
      get(item, "categoryLinks[0].attributes.value"),
      item.slug
    )}`;
    router.push(
      {
        pathname: url,
        query: { referrer: "deals" },
      },
      url
    );
  };

  if (loading) {
    return (
      <SectionLayout childrenClassName="flex justify-center">
        <Loader />
      </SectionLayout>
    );
  }

  return (
    <div>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Head>
      {isArray(listBanners) && (
        <SectionLayout>
          <Carousel responsive={homeBannerResponsive}>
            {listBanners?.map((img, index) => (
              <div
                key={index}
                className={styles.banner_card}
                onClick={() => router.push(`${img.linkActive}`)}
              >
                <Image
                  alt="banner"
                  layout="intrinsic"
                  src={img.imgUrl}
                  objectFit="contain"
                  width={500}
                  height={200}
                />
              </div>
            ))}
          </Carousel>
        </SectionLayout>
      )}
      {isArray(listCategories) && (
        <SectionLayout title="Explore BESTS" childrenClassName={styles.bests}>
          {listCategories.map((item, index) => (
            <div
              key={item.slug}
              className={styles.category}
              onClick={() => router.push(item.slug)}
            >
              <div className={styles.category_icon}>
                <Icon size={60} icon={item.icon} />
              </div>
              <div className={styles.category_label}>{item.label}</div>
            </div>
          ))}
        </SectionLayout>
      )}
      {isArray(listingExclusiveDeal) && (
        <SectionLayout
          title="Brands With Exclusive Deals For You"
          seeMore="/deals"
        >
          <Carousel responsive={infoCardResponsive}>
            {listingExclusiveDeal?.map((card) => (
              <div key={card.name} className="pb-5 pt-3 pl-3">
                <InforCard
                  {...formatCardItemProps(card)}
                  onClick={() => handleHref(card)}
                />
              </div>
            ))}
          </Carousel>
        </SectionLayout>
      )}
      {isArray(listCollections) && (
        <SectionLayout backgroundColor title="Specially Curated For You">
          <Carousel responsive={homeCuratedResponsive}>
            {listCollections?.map((item, index) => (
              <div key={item.slug}>
                <CollectionCard
                  slug={item.slug}
                  title={item.title}
                  imgUrl={item.imgUrl}
                />
              </div>
            ))}
          </Carousel>
        </SectionLayout>
      )}
      {isArray(listings?.buy) && (
        <SectionLayout title="Where to Buy" seeMore={CategoryText.BUY}>
          <Carousel responsive={infoCardResponsive}>
            {listings?.buy.map((card) => {
              return (
                <div key={card.title} className="pb-5 pt-3 pl-3">
                  <InforCard
                    {...formatCardItemProps(card)}
                    onClick={() =>
                      router.push(
                        `/${getListingUrl(
                          get(card, "categories[0]"),
                          get(card, "categoryLinks[0]"),
                          card.slug
                        )}`
                      )
                    }
                  />
                </div>
              );
            })}
          </Carousel>
        </SectionLayout>
      )}
      {isArray(listings?.seeAndDo) && (
        <SectionLayout title="What to See" seeMore={CategoryText.SEE_AND_DO}>
          <Carousel responsive={infoCardResponsive}>
            {listings?.seeAndDo.map((card) => (
              <div key={card.title} className="pb-5 pt-3 pl-3">
                <InforCard
                  {...formatCardItemProps(card)}
                  onClick={() =>
                    router.push(
                      `/${getListingUrl(
                        get(card, "categories[0]"),
                        get(card, "categoryLinks[0]"),
                        card.slug
                      )}`
                    )
                  }
                />
              </div>
            ))}
          </Carousel>
        </SectionLayout>
      )}
      {/* <SectionLayout backgroundColor title="Featured Articles">
        <Carousel responsive={homeCuratedResponsive}>
          {listHomeArticles.map((item, index) => (
            <div key={index} className="pb-5 pt-3 pl-3">
              <ArticleCard
                title={item.title}
                imgUrl={item.imgUrl}
                time={item.time}
                onClick={() => router.push(`/articles/${item.slug}`)}
              />
            </div>
          ))}
        </Carousel>
      </SectionLayout> */}
      {isArray(listings?.eat) && (
        <SectionLayout title="What to Eat" seeMore={CategoryText.EAT}>
          <Carousel responsive={infoCardResponsive}>
            {listings?.eat.map((card) => (
              <div key={card.title} className="pb-5 pt-3 pl-3">
                <InforCard
                  {...formatCardItemProps(card)}
                  onClick={() =>
                    router.push(
                      `/${getListingUrl(
                        get(card, "categories[0]"),
                        get(card, "categoryLinks[0]"),
                        card.slug
                      )}`
                    )
                  }
                />
              </div>
            ))}
          </Carousel>
        </SectionLayout>
      )}
      {isArray(listings?.transport) && (
        <SectionLayout
          title="Access to Transport"
          seeMore={CategoryText.TRANSPORT}
        >
          <Carousel responsive={infoCardResponsive}>
            {listings?.transport.map((card) => (
              <div key={card.title} className="pb-5 pt-3 pl-3">
                <InforCard
                  {...formatCardItemProps(card)}
                  onClick={() =>
                    router.push(
                      `/${getListingUrl(
                        get(card, "categories[0]"),
                        get(card, "categoryLinks[0]"),
                        card.slug
                      )}`
                    )
                  }
                />
              </div>
            ))}
          </Carousel>
        </SectionLayout>
      )}
      {isArray(listings?.stay) && (
        <SectionLayout title="Where to Stay" seeMore={CategoryText.STAY}>
          <Carousel responsive={infoCardResponsive}>
            {listings?.stay.map((card) => (
              <div key={card.title} className="pb-5 pt-3 pl-3">
                <InforCard
                  {...formatCardItemProps(card)}
                  onClick={() =>
                    router.push(
                      `/${getListingUrl(
                        get(card, "categories[0]"),
                        get(card, "categoryLinks[0]"),
                        card.slug
                      )}`
                    )
                  }
                />
              </div>
            ))}
          </Carousel>
        </SectionLayout>
      )}
      {/* {isArray(listingForYou) && (
        <div>
          <SectionLayout className={styles.for_you}>
            <div className={styles.for_you_tag}>
              <Icon
                icon="user-fill-1"
                size={30}
                className={styles.for_you_icon}
              />
              <div>For you</div>
            </div>
          </SectionLayout>
          <SectionLayout childrenClassName={styles.for_you_container}>
            {listingForYou?.map((card) => (
              <div key={card.title} className="pb-5 pt-3">
                <InforCard
                  imgUrl={card.images[0]}
                  title={card.title}
                  rate={card.rate}
                  rateNumber={card.rateNumber}
                  followerNumber={card.followerNumber}
                  price={card.price}
                  currency={card?.currency?.toUpperCase()}
                  categories={card.categories}
                  tags={card.tags}
                  isVerified={card.isVerified}
                  description={card.description}
                  onClick={() => router.push(`/biz/home/${card.slug}`)}
                />
              </div>
            ))}
          </SectionLayout>
          <SectionLayout childrenClassName="flex justify-center">
            <Button
              isLoading={loading}
              variant={loading ? "primary" : "outlined"}
              text="Load more"
              width={400}
              onClick={() => getBizListingForYou()}
            />
          </SectionLayout>
        </div>
      )} */}
      <div className={styles.introduction}>
        <SectionLayout transparent>
          <h1 className={styles.header}>
            A <span>Curated Platform & Experience</span>
            <p>For The Muslim Lifestyle</p>
          </h1>
          {curatedList.map((item, index) => (
            <div key={index} className="flex gap-3 mt-5">
              <Icon icon="star-2" color="#e60112" />
              <div>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.content}>{item.content}</div>
              </div>
            </div>
          ))}
        </SectionLayout>
      </div>
      <SectionLayout>
        <TopSearches />
      </SectionLayout>
    </div>
  );
};

export async function getServerSideProps(context) {
  // Pass data to the page via props
  const dataExclusiveDeal =
    await BizListingApi.getAllBizListingsHaveExclusiveDeal();
  const dataBanners = await BannerApi.getBannerCustom({
    pinnedHomepage: true,
  });
  const dataCollections = await CollectionApi.getCollection({
    pinnedHomepage: true,
  });
  const dataCategories = await CategoryApi.getCategories();
  // const dataArticlesPinHome = await ArticleApi.getArticlesPinHome();
  const rawListBanners = get(dataBanners, "data.data");
  const rawListCollections = get(dataCollections, "data.data");
  const rawCategories = get(dataCategories, "data.data");

  // const rawArticlesPinHome = get(dataArticlesPinHome, "data.data");
  const exclusiveDealListingArray = formatListingArray(
    get(dataExclusiveDeal, "data.data")
  );

  const bannerArray = formatBanner(rawListBanners);

  const collectionArray =
    Array.isArray(rawListCollections) &&
    rawListCollections.map((item) => ({
      imgUrl: item.thumbnail || null,
      slug: item.slug,
      title: item.name,
    }));
  const categoryArray =
    Array.isArray(rawCategories) &&
    rawCategories.map((item) => ({
      label: get(item, "attributes.name"),
      slug: get(item, "attributes.slug"),
      icon: get(item, "attributes.icon"),
    }));
  // const homeArticleArray =
  //   Array.isArray(rawArticlesPinHome) &&
  //   rawArticlesPinHome.map((item) => ({
  //     title: get(item, "attributes.name") || null,
  //     imgUrl: get(item, "attributes.thumbnail.data.attributes.url"),
  //     time: get(item, "attributes.createdAt"),
  //     slug: get(item, "attributes.slug"),
  //   }));

  return {
    props: {
      listingExclusiveDeal: exclusiveDealListingArray,
      listBanners: JSON.parse(JSON.stringify(bannerArray)),
      listCollections: collectionArray,
      listCategories: categoryArray,
      // listHomeArticles: homeArticleArray,
    },
  };
}

export default Home;
