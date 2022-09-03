import { getListingUrl, isArray, randomId } from "utils";
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import SectionLayout from "components/SectionLayout/SectionLayout";
import ReviewSearchBox from "components/ListingSearchBox/ListingSearchBox";
import ReviewCard from "components/ReviewsPage/ReviewCard/ReviewCard";
import ResultModal from "components/ReviewsPage/ResultModal/ResultModal";
import { dummyKeywords } from "constant";

import styles from "styles/Reviews.module.scss";
import TopSearches from "components/TopSearches/TopSearches";
import BizListingApi from "../../services/biz-listing";
import get from "lodash/get";
import ReviewApi from "../../services/review";
import ContributeApi from "services/contribute";
import { UserInforContext } from "Context/UserInforContext";
import { useDebounce } from "usehooks-ts";
import { changeToSlugify } from "utils";
import { useRouter } from "next/router";
import useGetCountry from "hooks/useGetCountry";
import Head from "next/head";

const ReviewsPage = () => {
  const { user } = useContext(UserInforContext);
  const country = useGetCountry();
  const [isShowResultModal, setIsShowResultModal] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [location, setLocation] = useState(country.value);
  const [listingOptions, setListingOptions] = useState<any>([]);
  const [searchKey, setSearchKey] = useState("");
  const [listingSearchResult, setListingSearchResult] = useState<any>([]);
  const debouncedSearchTerm = useDebounce(changeToSlugify(searchKey), 500);
  const router = useRouter();

  const [metaTitle, setMetaTitle] = useState("Write a Review | Tribes by HHWT");
  const [metaDescription, setMetaDescription] = useState(
    "Been to a place or bought a product? Share your experience with the community!"
  );

  const resultType = [
    {
      title: "Thank you",
      message:
        "Thank you for your contribution. Your submission is currently under review and will be up in no time!",
      textButton: "Close",
    },
    {
      title: "Uh...oh...",
      message: "Something went wrong. Let’s give it another try!",
      textButton: "Try again",
    },
  ];

  useEffect(() => {
    const getRandomListing = async () => {
      const result = await BizListingApi.getListingBySlug("", location, 7);
      const data = get(result, "data.data") || [];
      setListingSearchResult(data);
    };

    if (listingSearchResult.length === 0) {
      getRandomListing();
    }
  }, []);

  useEffect(() => {
    const getBizListing = async () => {
      const data = await BizListingApi.getListingBySlug(
        debouncedSearchTerm,
        location,
        20
      );
      setListingOptions(get(data, "data.data"));
    };

    debouncedSearchTerm ? getBizListing() : setListingOptions([]);
  }, [debouncedSearchTerm, location]);

  const calcRateNumber = (reviews) => {
    // TODO: rateNumber not work on FE
    const reviewsData = get(reviews, "data");
    let rateNumber = 0;
    if (reviewsData?.length > 0) {
      let sum = 0;
      reviewsData.map((review) => {
        sum += get(review, "attributes.rating") || 0;
      });
      rateNumber = Math.ceil(sum / reviewsData.length);
    } else {
      rateNumber = 0;
    }
    return rateNumber;
  };

  const handleCloseModal = () => {
    router.push("/");
    setIsShowResultModal(false);
  };

  const handleSubmit = async (dataSend: any) => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    const bizListingId = get(listingSearchResult, "[0].id");
    const dataSendApi = {
      user: userInfo.id,
      biz_listing: bizListingId,
      rating: dataSend.rating,
      content: dataSend.content,
      visited_date: dataSend.visitedDate,
      images: dataSend.images,
      is_revision: true,
    };
    const data = await ReviewApi.addReview(dataSendApi);
    if (data) {
      const dataSendContribute = {
        user: userInfo.id,
        biz_listing: bizListingId,
        type: "Review",
        status: "Pending",
        review: get(data, "data.data.id"),
      };
      await ContributeApi.createContribute(dataSendContribute).then(() => {});
      setIsShowResultModal(true);
      setIsSuccess(true);
    }
  };

  return (
    <div className={`${styles.review}`}>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Head>
      <div className="relative pb-6 bg-white">
        <Image
          src="https://picsum.photos/1440"
          width="100%"
          height="30%"
          layout="responsive"
          objectFit="cover"
          alt="banner"
        />
        <SectionLayout
          className={styles.section_review_search_box}
          childrenClassName="h-full"
          containerClassName={styles.section_review_search_box_container}
        >
          <ReviewSearchBox
            title="Review a place you've visited"
            onListingSearchChange={(e) => {
              setListingSearchResult([e]);
            }}
            onInputChange={(e) => setSearchKey(e)}
            onLocationChange={(e) => setLocation(e.value)}
            listingOptions={listingOptions}
          />
        </SectionLayout>
      </div>
      <SectionLayout
        childrenClassName={styles.section_children_reviews}
        containerClassName={styles.section_children_reviews_container}
      >
        <div className={styles.main_content}>
          <h3 className="font-semibold text-sm sm:text-base mb-8">
            Share your experiences with the Tribes community!
          </h3>
          <div className="review-list">
            {isArray(listingSearchResult) &&
              listingSearchResult.map((rawReview) => {
                const review = rawReview.attributes || {};
                return (
                  review && (
                    <ReviewCard
                      key={review.id}
                      id={review.id}
                      title={get(review, "name")}
                      imgUrl={get(review, "images[0]")}
                      isVerified={get(review, "is_verified")}
                      rateNumber={calcRateNumber(get(review, "reviews"))}
                      location={get(review, "address")}
                      onSubmit={handleSubmit}
                      listingUrl={getListingUrl(
                        get(review, "categories.data[0].attributes.slug"),
                        get(review, "category_links.data[0].attributes.value"),
                        get(review, "slug")
                      )}
                    />
                  )
                );
              })}
          </div>
        </div>
        <div className={`${styles.advertisement} mt-8`}>
          <Image
            src="https://picsum.photos/300/600"
            height={600}
            width={300}
            alt="advertisement-alt"
          />
        </div>
      </SectionLayout>

      <SectionLayout
        className={styles.top_search}
        containerClassName={styles.top_search_container}
      >
        <TopSearches />
      </SectionLayout>

      <ResultModal
        resultType={resultType}
        visible={isShowResultModal}
        isSuccess={isSuccess}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ReviewsPage;
