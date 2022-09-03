import Api from "../index";

const qs = require('qs');

const createDeal = async (params: any) => {
  const url = `/api/deals`;
  return await Api.post(url, {
    data: params
  });
}

const updateDeal = async (dealId: string ,params: any) => {
  const url = `/api/deals/${dealId}`;
  return await Api.put(url, {
    data: params
  })
}

const deleteDeal = async (dealId: any) => {
  const url = `/api/deals/${dealId}`;
  return await Api.delete(url);
}

const getDealsByBizListingId = async (bizListingId: any, sortBy: string) => {
  let dataSend: any = {
    "filters": {
      "biz_listing": {
        "id": bizListingId
      }
    }
  }
  if (sortBy !== '') {
    dataSend = {...dataSend, "sort": [sortBy]}
  }
  const query = qs.stringify(dataSend, {
    encodeValuesOnly: true
  });

  const url = `/api/deals?${query}`;
  return await Api.get(url);
}

export default {
  createDeal,
  updateDeal,
  deleteDeal,
  getDealsByBizListingId
}
