import { get } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import bizListingApi from "services/biz-listing";
import bizListingRevision from "services/biz-listing-revision";

const useGetRevision = (listingSlug?: string) => {
  const [loading, setLoading] = useState(true);
  const [revisionId, setRevisionId] = useState<number | undefined>(undefined);
  const [isRevision, setIsRevision] = useState(false);
  const [revisionListing, setRevisionListing] = useState<any>({});
  const router = useRouter();

  const getRevisionId = async (currentAttributes) => {
    const formatBizListingData = {
      name: revisionListing.name,
      slug: revisionListing.slug,
      is_accepted: false,
      ...currentAttributes,
    };
    const response = await bizListingRevision.createCustom(
      formatBizListingData
    );
    return get(response, "data.data.id");
  };

  useEffect(() => {
    const checkIsRevision = async () => {
      const data = await bizListingApi.getInfoOwnerBizListingBySlug(
        listingSlug
      );
      const listingData = get(data, "data.data[0]");
      const currentRevisionId = get(data, "data.data[0].id");
      const currentIsRevision = get(data, "data.is_revision");

      if (currentIsRevision) {
        setIsRevision(true);
        setRevisionId(currentRevisionId);
      } else {
        setIsRevision(false);
        setRevisionId(undefined);
      }
      setRevisionListing(listingData);
      setLoading(false);
    };

    loading && checkIsRevision();
  }, [loading, listingSlug]);

  return {
    loading,
    setLoading,
    revisionListing,
    isRevision,
    revisionId,
    getRevisionId,
  };
};

export default useGetRevision;
