import Api from "../index";

const qs = require('qs');

const createClaimListing = async (params: any) => {
  const url = `/api/claim-listings`;
  let userInfo = JSON.parse(localStorage.getItem("user") || '{}')
  return await Api.post(url, {
    data: {
        user: userInfo.id,
        payment_method: params.paymentMethod,
        transaction_id: params.transaction_id,
        biz_listings: userInfo.biz_id,
      }
  });
}

const createClaimListingRevision = async (params: any) => {
  const url = `/api/claim-listings`;
  let userInfo = JSON.parse(localStorage.getItem("user") || '{}')
  return await Api.post(url, {
    data: {
        user: userInfo.id,
        payment_method: params.paymentMethod,
        transaction_id: params.transaction_id,
        biz_listing_revision: userInfo.biz_id,
      }
  });
}

const getClaimListingByUserId = async (userId: any) => {
  const query = qs.stringify({
    "filters": {
      "user": {
        "id": {
          "$eq": userId
        }
      }    
    },
    "populate": "*"
  }, {
    encodeValuesOnly: true, 
  });

  const url = `/api/claim-listings?${query}`;
  return await Api.get(url);
}
  

export default {
  createClaimListing,
  getClaimListingByUserId,
  createClaimListingRevision
}
  