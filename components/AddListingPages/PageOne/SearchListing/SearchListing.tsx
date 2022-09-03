import AuthPopup from "components/AuthPopup/AuthPopup";
import Badge from "components/Badge/Badge";
import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import ListingCard from "components/ListingCard/ListingCard";
import ListingSearch from "components/ListingSearch/ListingSearch";
import Modal from "components/Modal/Modal";
import Select from "components/Select/Select";
// import { listingSearchResult } from "constant"
import { ClaimStep, YesNo } from "enums";
import { get } from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState, useContext } from "react";
import BizListingApi from "services/biz-listing";
import { UserInforContext } from "Context/UserInforContext";

import styles from "./SearchListing.module.scss";

export type listingTypes = { [key: string]: string } | YesNo.NO | undefined;

const RightColumn = (props: {
  onShowUpcomingFeature: () => void;
  listing: any;
  isRelationship?: boolean;

}) => {
  const { listing, isRelationship, onShowUpcomingFeature } = props;
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const { user } = useContext(UserInforContext);

  let userInfo = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const listingRolesArray =
      get(listing, "attributes.listing_roles.data") || [];
    const isBeingClaimed =
      get(listing, "attributes.claim_listings.data.length") > 0;
    const doesHasOwners = listingRolesArray.some(
      (item) => get(item, "attributes.name") === "Owner"
    );
    if (isBeingClaimed || doesHasOwners) setIsDisabled(true);
  }, []);

  const handleClick = () => {
    user?.token
      ? isRelationship
        ? router.push({
            pathname: `/claim/${listing.id}`,
            query: { firstStep: ClaimStep.CLAIM_FREE_LISTING },
          })
        : onShowUpcomingFeature()
      : setShowAuthPopup(true);
  };

  return (
    <>
      <Button
        disabled={isDisabled}
        text={isRelationship ? "Claim free listing" : "Improve this listing"}
        size="small"
        variant={isRelationship ? "primary" : "outlined"}
        onClick={handleClick}
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

const SearchListing = ({
  relationship,
  listing,
  bizListing,
  setListing,
  isClaimListing,
}: {
  setListing: (e: listingTypes) => void;
  listing: any;
  bizListing: any;
  relationship?: string;
  isClaimListing?: boolean;
}) => {
  if (listing) {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    userInfo = {
      ...userInfo,
      biz_id: get(listing, "id"),
      biz_slug: get(listing, "attributes.slug"),
      type_handle: "Claim",
    };
    localStorage.setItem("user", JSON.stringify(userInfo));
  }

  const [showUpcomingFeature, setShowUpcomingFeature] = useState(false);
  switch (listing) {
    case undefined:
      return (
        <ListingSearch
          isClaimListing={isClaimListing}
          listingOptions={bizListing}
          onChange={setListing}
        />
      );
    case YesNo.NO:
      return (
        <div className="flex gap-2">
          <Badge onClick={() => setListing(undefined)} text="Yes" />
          <Badge value="no" selected text="No" />
        </div>
      );
    default:
      return (
        <React.Fragment>
          <ListingCard
            listing={listing}
            onClose={() => setListing(undefined)}
            rightColumn={
              <RightColumn
                onShowUpcomingFeature={() => setShowUpcomingFeature(true)}
                listing={listing}
                isRelationship={relationship === YesNo.YES}
              />
            }
          />
          <Modal
            visible={showUpcomingFeature}
            width={350}
            mobilePosition="center"
          >
            <div className="p-5 flex flex-col items-center">
              <Image
                src={require("public/images/upcoming-feature.svg")}
                width={100}
                height={100}
                alt="upcoming_feature"
                objectFit="cover"
              />
              <div>
                <strong>Upcoming feature</strong>
              </div>
              <p className="text-center">
                We are still working on it to give you the best experience
                possible.
              </p>
              <Button
                className="mt-5"
                text="Continue"
                size="small"
                width={270}
                onClick={() => setShowUpcomingFeature(false)}
              />
            </div>
          </Modal>
        </React.Fragment>
      );
  }
};

export default SearchListing;
