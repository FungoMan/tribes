import moment from "moment";
import { Router, useRouter } from "next/router";
import { get, isArray } from "lodash";
import { useContext, useEffect, useState } from "react";

import BusinessInformation from "components/BizInformationPage/TabContentComponents/BusinessInformation";
import ManageDeals from "components/BizInformationPage/TabContentComponents/ManageDeals";
import ProductListing from "components/BizInformationPage/TabContentComponents/ProductListing";
import BizListing from "services/biz-listing";
import SectionLayout from "components/SectionLayout/SectionLayout";
import { ClaimStep, InformationList, InformationSlugList } from "enums";
import BusinessDetail from "components/BizInformationPage/TabContentComponents/BusinessDetail";
import TierTable from "components/TierTable/TierTable";
import Verification from "components/BizInformationPage/TabContentComponents/Verification";
import PhotosVideos from "components/BizInformationPage/TabContentComponents/PhotosVideos";
import BizListingApi from "../../../../services/biz-listing";
import { defaultAddlistingForm } from "constant";
import { UserInforContext } from "Context/UserInforContext";
import { isPaidUser } from "utils";
import ConfirmModal from "components/ConfirmModal";
import EmailApi from "services/email";
import ResultModal from "components/ReviewsPage/ResultModal/ResultModal";
import BizAccountManagementPanel from "components/BizAccountManagementPanel/BizAccountManagementPanel";

import styles from "styles/BizInformation.module.scss";

const BizInformation = (props) => {
  const { listingSlug, information } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [isPaid, setIsPaid] = useState(true);
  const [listing, setListing] = useState(defaultAddlistingForm);
  const [isPayYearly, setIsPayYearly] = useState(false);
  const [isRevision, setIsRevision] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [submitResult, setSubmitResult] = useState(false);

  const resultType = [
    {
      title: "Success!",
      message: "You have downgraded your plan successfully!",
      textButton: "Close",
    },
    {
      title: "Fail!",
      message: "You have upgraded your plan successfully!",
      textButton: "Try again",
    },
  ];

  const router = useRouter();
  const { user, updateUser } = useContext(UserInforContext);

  const Content = () => {
    return (
      <p className="text-sm mb-5">
        Basic plan will continue until{" "}
        <strong>{moment(listing.expiration_date).format("DD-MM-YYYY")}</strong>.
        After that, you will no longer have access to Basic Tier feature.Basic
        Tier information on your listing will be hidden.
      </p>
    );
  };

  useEffect(() => {
    const getListingData = async () => {
      const data = await BizListingApi.getInfoOwnerBizListingBySlug(
        listingSlug
      );

      //TODO: Check listing is owned by user before returning biz listing data on BE
      const listing = get(data, "data.data[0]") || {};
      updateUser({
        now_biz_listing: listing,
      });
      if (listing?.expiration_date) {
        setIsPaid(isPaidUser(listing.expiration_date));
      } else {
        setIsPaid(false);
      }
      // setIsPaid(isPaidListing);
      setListing(listing);
      setLoading(false);
      setIsRevision(get(data, "data.is_revision"));
      const isOwned = get(data, "data.is_owner");

      if (isOwned === false) {
        router.push("/");
      }
    };
    getListingData();
  }, []);

  const onSubmit = async (data) => {
    listing.id &&
      (await BizListing.updateBizListing(listing.id, {
        ...listing,
        ...data,
      }).then(() => setLoading(true)));
  };

  const handleHref = (e) => {
    if (e === "free") {
      setIsVisible(true);
    } else {
      updateUser({
        type_handle: "Claim",
      });
      router.push({
        pathname: `/claim/${get(user, "now_biz_listing.listing_id")}`,
        query: {
          firstStep: ClaimStep.CHOOSE_TIER,
        },
      });
    }
  };

  const handleDowngrade = () => {
    const data = EmailApi.downgrade(get(listing, "slug"));
    if (get(data, "data.data.success")) {
      setSubmitResult(true);
    } else {
      setSubmitResult(true);
    }
    setShowResultModal(true);
    setIsVisible(false);
  };

  const tabContent = () => {
    switch (information) {
      case InformationSlugList.BUSINESS_INFORMATION:
        return (
          <BusinessInformation
            isRevision={isRevision}
            listing={listing}
            loading={loading}
            onSubmit={onSubmit}
          />
        );
      case InformationSlugList.BUSINESS_DETAIL:
        return (
          <BusinessDetail
            listing={listing}
            loading={loading}
            onSubmit={onSubmit}
          />
        );
      case InformationSlugList.PRODUCT_LISTING:
        return <ProductListing isPaid={isPaid} />;
      case InformationSlugList.PHOTOS_VIDEOS:
        return <PhotosVideos />;
      case InformationSlugList.MANAGE_DEALS:
        return <ManageDeals bizListingId={listing.id} />;
      case InformationSlugList.ANALYTICS:
        return (
          <SectionLayout
            title="Analytics"
            className="px-[30px]"
            containerClassName="w-full"
          >
            <div />
          </SectionLayout>
        );
      case InformationSlugList.CHANGE_ACCOUNT_TIER:
        return (
          <div className="pt-10 px-3">
            <TierTable
              expirationDate={moment(listing?.expiration_date).format(
                "YYYY/MM/DD"
              )}
              isChangeTier
              isPaid={isPaid}
              isPayYearly={isPayYearly}
              onSetIsPayYearly={(e) => setIsPayYearly(e)}
              onDirectToVerification={handleHref}
            />
          </div>
        );
      case InformationSlugList.VERIFICATION:
        return <Verification listing={listing} isPaid={isPaid} />;
      default:
        return <div />;
    }
  };

  return (
    <SectionLayout backgroundColor>
      <div className={styles.biz_information}>
        <div className={styles.left_col}>
          <div className={styles.left_col_bottom}>
            <BizAccountManagementPanel />
          </div>
        </div>
        <div className={styles.right_col}>{tabContent()}</div>
      </div>
      <ConfirmModal
        title="Are you sure?"
        visible={isVisible}
        onSubmit={handleDowngrade}
        onClose={() => setIsVisible(false)}
        content={<Content />}
      />
      <ResultModal
        resultType={resultType}
        visible={showResultModal}
        isSuccess={submitResult}
        onClose={() => setShowResultModal(false)}
      />
    </SectionLayout>
  );
};
export const getServerSideProps = async (context) => {
  const { listingSlug, information } = context.query;
  return { props: { listingSlug: listingSlug, information: information } };
};

export default BizInformation;
