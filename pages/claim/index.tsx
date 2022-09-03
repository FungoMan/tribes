import React, { useState, useEffect } from "react";
import { useDebounce } from "usehooks-ts";
import get from "lodash/get";
import { useRouter } from "next/router";
import Image from "next/image";

import SectionLayout from "components/SectionLayout/SectionLayout";
import TopSearches from "components/TopSearches/TopSearches";
import ListingSearchBox from "components/ListingSearchBox/ListingSearchBox";
import ListingCard from "components/ListingCard/ListingCard";
import Button from "components/Button/Button";
import BizListingApi from "services/biz-listing";
import InforCard from "components/InforCard/InforCard";
import AuthPopup from "components/AuthPopup/AuthPopup";
import { changeToSlugify, formatCardItemProps } from "utils";

import styles from "styles/Claim.module.scss";
import Head from "next/head";

const RightColumn = (props: { listing: { [key: string]: any } }) => {
  const { listing } = props;
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const listingRolesArray =
      get(listing, "attributes.listing_roles.data") || [];
    const isBeingClaimed =
      get(listing, "attributes.claim_listings.data.length") > 0;
    const doesHasOwners = listingRolesArray.some(
      (item) => get(item, "attributes.name") == "owner"
    );
    if (isBeingClaimed || doesHasOwners) setIsDisabled(true);
  }, []);

  const handleClick = () => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    userInfo && userInfo.token
      ? router.push(`/claim/${listing.id}`)
      : setShowAuthPopup(true);
  };

  return (
    <>
      <Button
        text="Claim free listing"
        onClick={handleClick}
        disabled={isDisabled}
      />
      <span onClick={() => router.push("/add-listing")}>
        Not your business?
      </span>
      <AuthPopup
        onClose={() => setShowAuthPopup(false)}
        visible={showAuthPopup}
      />
    </>
  );
};

const ClaimPage = () => {
  const [metaTitle, setMetaTitle] = useState(
    "Claim your Listing | Tribes by HHWT"
  );
  const [metaDescription, setMetaDescription] = useState(
    "Own a store? Claim full control of your page by claiming it!"
  );

  const [listing, setListing] = useState<{ [key: string]: any }>();
  const [bizListing, setBizListing] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [location, setLocation] = useState();
  const debouncedSearchTerm = useDebounce(changeToSlugify(searchKey), 500);
  const getRandomListing = async () => {
    const result = await BizListingApi.getListingBySlug(
      "",
      location || "singapore",
      7
    );
    const data = get(result, "data.data");
    setBizListing(data);
  };
  useEffect(() => {
    if (bizListing.length === 0) {
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
      setBizListing(get(data, "data.data"));
    };

    debouncedSearchTerm ? getBizListing() : getRandomListing();
  }, [debouncedSearchTerm, location]);

  const handleSetListing = (e) => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    userInfo = {
      ...userInfo,
      type_handle: "Claim",
      biz_id: e.id,
      biz_slug: get(e, "attributes.slug"),
    };
    localStorage.setItem("user", JSON.stringify(userInfo));
    setListing(e);
  };

  const whyTribes = [
    {
      imgUrl: require("public/images/why-tribes-1.png"),
      author: "Meri Pipenbaher",
      position: "Founder, Vidly",
      description:
        "I used to spend hours writing creative copy, but now all I do is tell Rytr what I need and it writes everything for me. It's the ultimate AI content writer, and a must-have tool for bloggers, marketers, & entrepreneurs. ",
    },
    {
      imgUrl: require("public/images/why-tribes-3.png"),
      author: "Meri Pipenbaher",
      position: "Founder, Vidly",
      description:
        "I used to spend hours writing creative copy, but now all I do is tell Rytr what I need and it writes everything for me. It's the ultimate AI content writer, and a must-have tool for bloggers, marketers, & entrepreneurs. ",
    },
    {
      imgUrl: require("public/images/why-tribes-2.png"),
      author: "Meri Pipenbaher",
      position: "Founder, Vidly",
      description:
        "I used to spend hours writing creative copy, but now all I do is tell Rytr what I need and it writes everything for me. It's the ultimate AI content writer, and a must-have tool for bloggers, marketers, & entrepreneurs. ",
    },
  ];
  return (
    <div className={styles.claim}>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Head>
      <div className="relative bg-white">
        <Image
          src={require("/public/images/bg-claim-listing.png")}
          width="100%"
          height="30%"
          layout="responsive"
          alt="banner"
          objectFit="cover"
        />
        <SectionLayout className={styles.section_claim_search_box}>
          {listing ? (
            <ListingCard
              listing={listing}
              onClose={() => setListing(undefined)}
              rightColumn={<RightColumn listing={listing} />}
            />
          ) : (
            <ListingSearchBox
              title="Claim Your Free Listing"
              listingOptions={bizListing}
              onListingSearchChange={handleSetListing}
              onInputChange={(e) => setSearchKey(e)}
              onLocationChange={(e) => setLocation(e.value)}
            />
          )}
        </SectionLayout>
      </div>
      <SectionLayout className={styles.section_two}>
        <h1 className={styles.header}>Grow your business with Tribes</h1>
        <div className={styles.advantage}>
          <Image
            src={require("public/images/take-control.svg")}
            width={600}
            alt="take-control-alt"
          />
          <div className={styles.description}>
            <h2 className={styles.title}>Take control of your listing</h2>
            <p className={styles.content}>
              Customise your listing details, upload photos, and more to show
              customers what makes your business special.
            </p>
          </div>
        </div>
        <div className={styles.advantage}>
          <Image
            src={require("public/images/respond-to-reviews.svg")}
            width={600}
            alt="respond-to-reviews-alt"
          />
          <div className={styles.description}>
            <h2 className={styles.title}>Respond to reviews</h2>
            <p className={styles.content}>
              Analyse reviews that can help your company overall customer
              satisfaction and Increase brand awareness to reach your targetted
              muslim audience, local and internationally.
            </p>
          </div>
        </div>
        <div className={styles.advantage}>
          <Image
            src={require("public/images/track-perfomance.svg")}
            width={600}
            alt="track-perfomance-alt"
          />
          <div className={styles.description}>
            <h2 className={styles.title}>Track your performance</h2>
            <p className={styles.content}>
              Use analytics to keep track of the number of products sold and to
              determine if a product is performing poorly so that you can
              address the issues and work toward success.
            </p>
          </div>
        </div>
      </SectionLayout>
      {/* <SectionLayout backgroundColor childrenClassName="overflow-hidden">
        <div className={styles.why_tribes}>
          <h1 className={styles.why_tribes_title}>Why Tribes?</h1>
          <div className={styles.why_tribes_container}>
            <div className={styles.why_tribes_scrollbox}>
              {whyTribes.map((card, index) =>s (
                <InforCard key={index} {...formatCardItemProps(card)} />
              ))}
            </div>
          </div>
        </div>
      </SectionLayout> */}
      <SectionLayout
        className={styles.top_search}
        containerClassName={styles.top_search_container}
      >
        <TopSearches />
      </SectionLayout>
    </div>
  );
};

export default ClaimPage;
