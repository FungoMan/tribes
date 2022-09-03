import { homeCuratedResponsive, inforCardList } from "constant";
import DealsDetailsModal, {
  IDealsDetails,
} from "components/DealDetailModal/DealDetailModal";
import ProductDetailsModal, {
  IProduct,
} from "components/ProductDetailModal/ProductDetailModal";
import InforCard from "components/InforCard/InforCard";
import PromotionCard from "components/PromotionCard/PromotionCard";
import Image from "next/image";
import CarouselBanner from "components/CarouselBanner/CarouselBanner";
import SectionLayout from "components/SectionLayout/SectionLayout";
import ScrollingBox from "components/ScrollingBox/ScrollingBox";
import styles from "styles/Promotions.module.scss";
import style from "components/SectionLayout/SectionLayout.module.scss";
import { useEffect, useState } from "react";
import PromotionApi from "services/promotion";
import get from "lodash/get";
import { useRouter } from "next/router";
import AuthPopup from "components/AuthPopup/AuthPopup";
import {
  calcRateNumber,
  formatArrayImages,
  formatArticle,
  formatCardItemProps,
  getListingUrl,
  isArray,
} from "utils";
import DividerSection from "components/DividerSection/DividerSection";
import Banner from "components/MicrositePage/Banner";
import { format } from "path";
import Loader from "components/Loader/Loader";
import ArticleApi from "../../services/article";
import Carousel from "components/Carousel/Carousel";
import Link from "next/link";
import ArticleCard from "components/ArticleCard/ArticleCard";
import classNames from "classnames";

const PromotionsPage = () => {
  const [showModalDealsDetails, setShowModalDealsDetails] = useState<boolean>();
  const [dealsDetails, setDealsDetails] = useState<IDealsDetails>(
    {} as IDealsDetails
  );
  const [showModalProductDetails, setShowModalProductDetails] =
    useState<boolean>();

  const router = useRouter();

  const handleDealsDetails = (value: boolean, dealInfo?: any) => {
    setShowModalDealsDetails(value);
    if (dealInfo) {
      setDealsDetails(dealInfo);
    }
  };

  const handleShare = () => {
    console.log("handleShare");
  };

  const handleFavourite = () => {
    console.log("handleFavourite");
  };

  const [bizListings, setBizListings] = useState<any>([]);

  const {
    query: { slug },
  } = useRouter();

  interface IType {
    [key: string]: any;
  }
  [];

  const [promotion, setPromotion] = useState<any>([]);
  const [banners, setBanners] = useState<any>([]);
  const [backgroundColor, setBackgroundColor] = useState([]);
  const [backgroundColorBar, setBackgroundColorBar] = useState([]);
  const [titleColor, setTitleColor] = useState([]);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [articleArray, setArticleArray] = useState<IType[]>([]);

  useEffect(() => {
    const getPromotionBySlug = async (slug) => {
      const data = await PromotionApi.getPromotionBySlug(slug);
      const promotionData = get(data, "data.data");
      if (promotionData.length === 0) {
        router.push("/");
      }
      const rawArticle = formatArticle(
        get(promotionData, "[0].attributes.microsite_articles.articles.data")
      );
      console.log("rawArticle", rawArticle);
      const arrayImages = formatArrayImages(
        get(promotionData, "[0].attributes.main_banner.data")
      );
      console.log("arrayImages", arrayImages);
      setBanners(arrayImages);
      setPromotion(get(promotionData, "[0].attributes"));
      setIsLoading(false);
      setBizListings(
        get(promotionData, "[0].attributes.microsite_biz_listings")
      );
      setArticleArray(rawArticle);
      setBackgroundColor(get(promotionData, "[0].attributes.background_color"));
      setBackgroundColorBar(
        get(promotionData, "[0].attributes.background_color_bar")
      );
      setTitleColor(get(promotionData, "[0].attributes.title_color"));
    };
    if (slug) {
      getPromotionBySlug(slug).catch((e) => console.log(e));
    }
  }, [slug]);

  const checkLogin = () => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    if (userInfo.token) {
      handleDealsDetails(true, promotion);
    } else {
      setShowAuthPopup(true);
    }
  };

  const sectionLayoutStyle: any = {
    backgroundColor: backgroundColor ? backgroundColor : "#fef1f2",
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper_promotions} style={sectionLayoutStyle}>
      <SectionLayout>
        <Banner
          className={styles.banner}
          key={banners}
          listingImages={banners}
        />
      </SectionLayout>
      {/* Start FEATURED VOUCHERS */}
      {Array.isArray(get(promotion, "deals.data")) &&
        get(promotion, "deals.data").length > 0 && (
          <SectionLayout
            className={`${styles.section_layout_inherit} ${style.special} pt-0 pb-10`}
          >
            <DividerSection
              color={titleColor}
              backgroundColor={backgroundColorBar}
              title="FEATURED VOUCHERS"
              className="mb-5 md:mb-8"
            />
            <ScrollingBox
              className={styles.scrolling_box_custom}
              maxHeight={475}
            >
              <div className="promotion_list grid grid-cols-1 lg:grid-cols-2 gap-x-10 xl:gap-x-16">
                {get(promotion, "deals.data").map((promotion, index) => (
                  <PromotionCard
                    key={index}
                    title={get(promotion, "attributes.name")}
                    imgUrl={get(promotion, "attributes.images[0]")}
                    endDate={`${get(
                      promotion,
                      "attributes.start_date"
                    )} - ${get(promotion, "attributes.end_date")}`}
                    type={1}
                    favourite={false}
                    size="large"
                    onClick={checkLogin}
                  />
                ))}
              </div>
            </ScrollingBox>
          </SectionLayout>
        )}
      {/* End FEATURED VOUCHERS */}

      {/* Start BANNERS */}
      {Array.isArray(get(promotion, "banners.data")) &&
        get(promotion, "banners.data").length > 0 && (
          <SectionLayout
            className={`${styles.section_layout_inherit} ${styles.special} pt-0 pb-12 md:pb-16`}
          >
            <DividerSection
              color={titleColor}
              backgroundColor={backgroundColorBar}
              title="BANNERS"
              className="mb-5 md:mb-8"
            />
            <CarouselBanner>
              {get(promotion, "banners.data").map((banner: any) => (
                <Image
                  key={banner}
                  alt={banner}
                  src={get(banner, "attributes.url")}
                  width={1185}
                  height={225}
                  layout="responsive"
                  className="rounded-lg"
                />
              ))}
            </CarouselBanner>
          </SectionLayout>
        )}
      {/* End BANNERS */}

      {/* Start HOT DEALS */}
      {Array.isArray(get(promotion, "hot_deals.data")) &&
        get(promotion, "hot_deals.data").length > 0 && (
          <SectionLayout
            className={`${styles.section_layout_inherit} ${style.special} pt-0 pb-10`}
          >
            <DividerSection
              color={titleColor}
              backgroundColor={backgroundColorBar}
              title="HOT DEALS"
              className="mb-5 md:mb-8"
            />
            <ScrollingBox
              className={styles.scrolling_box_custom}
              maxHeight={475}
            >
              <div className="promotion_list grid grid-cols-1 lg:grid-cols-2 gap-x-10 xl:gap-x-16">
                {get(promotion, "hot_deals.data").map((promotion, index) => (
                  <PromotionCard
                    key={index}
                    title={get(promotion, "attributes.name")}
                    imgUrl={get(promotion, "attributes.images[0]")}
                    endDate={`${get(
                      promotion,
                      "attributes.start_date"
                    )} - ${get(promotion, "attributes.end_date")}`}
                    type={1}
                    favourite={false}
                    size="large"
                    onClick={checkLogin}
                  />
                ))}
              </div>
            </ScrollingBox>
          </SectionLayout>
        )}
      {/* End HOT DEALS */}

      {/* Start loop biz_listing components */}
      {bizListings?.map((bizListing, index) => {
        const dataBizlisting = get(bizListing, "biz_listings.data");

        return (
          <div key={index}>
            {isArray(dataBizlisting) && (
              <SectionLayout
                className={classNames(
                  styles.section_layout_inherit,
                  style.special
                )}
                key={index}
              >
                <DividerSection
                  color={titleColor}
                  backgroundColor={backgroundColorBar}
                  title={bizListing.title}
                  className="mb-5 md:mb-8"
                />
                <div className={styles.lists}>
                  {dataBizlisting?.map((card, index) => (
                    <InforCard
                      key={index}
                      {...formatCardItemProps(card)}
                      className="w-full"
                      onClick={() => {
                        router.push(
                          `/${getListingUrl(
                            get(
                              card,
                              "attributes.categories.data[0].attributes.name"
                            ),
                            get(
                              card,
                              "attributes.category_links.data[0].attributes.value"
                            ),
                            get(card, "attributes.slug")
                          )}`
                        );
                      }}
                    />
                  ))}
                </div>
              </SectionLayout>
            )}
            {index === 0 && isArray(articleArray) && (
              <SectionLayout backgroundColor title="Articles">
                <Carousel responsive={homeCuratedResponsive}>
                  {articleArray?.map((item, index) => (
                    <Link href={`/articles/${item.slug}`} passHref key={index}>
                      <div className="pb-5 pt-3 pl-3">
                        <ArticleCard
                          title={item.title}
                          imgUrl={item.imgUrl}
                          time={item.time}
                        />
                      </div>
                    </Link>
                  ))}
                </Carousel>
              </SectionLayout>
            )}
          </div>
        );
      })}

      {/* Start Shop more deals */}
      {Array.isArray(get(promotion, "more_deals.data")) &&
        get(promotion, "more_deals.data").length > 0 && (
          <SectionLayout
            className={`${styles.section_layout_inherit} ${style.special} pt-0 pb-10`}
          >
            <DividerSection
              color={titleColor}
              backgroundColor={backgroundColorBar}
              title="Shop more deals"
              className="mb-5 md:mb-8"
            />
            <ScrollingBox
              className={styles.scrolling_box_custom}
              maxHeight={475}
            >
              <div className="promotion_list grid grid-cols-1 lg:grid-cols-2 gap-x-10 xl:gap-x-16">
                {get(promotion, "more_deals.data").map((promotion, index) => (
                  <PromotionCard
                    key={index}
                    title={get(promotion, "attributes.name")}
                    imgUrl={get(promotion, "attributes.images[0]")}
                    endDate={`${get(
                      promotion,
                      "attributes.start_date"
                    )} - ${get(promotion, "attributes.end_date")}`}
                    type={1}
                    favourite={false}
                    size="large"
                    onClick={checkLogin}
                  />
                ))}
              </div>
            </ScrollingBox>
          </SectionLayout>
        )}

      <DealsDetailsModal
        visible={showModalDealsDetails}
        data={dealsDetails}
        onClose={() => handleDealsDetails(false)}
        onShare={() => handleShare()}
        onFavourite={() => handleFavourite()}
      />

      {/* <ProductDetailsModal
        visible={showModalProductDetails}
        data={dummyProductDetails}
        onClose={() => setShowModalProductDetails(false)}
      /> */}
      <AuthPopup
        onClose={() => setShowAuthPopup(false)}
        visible={showAuthPopup}
      />
    </div>
  );
};

export default PromotionsPage;
