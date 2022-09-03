import category from "services/category";
import user from "services/user";
import Api from "../index";

const qs = require("qs");

const createDealFavourite = async (dealId) => {
  let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const url = `/api/user-deal-favourites`;
  return await Api.post(url, {
    data: {
      user: userInfo.id,
      deal: dealId,
    },
  });
};

const checkIsFavourite = async (dealId) => {
  let userInfo = JSON.parse(localStorage.getItem("user") || "{}");

  let dataSend: any = {
    filters: {
      user: {
        id: userInfo.id,
      },
      deal: {
        id: dealId,
      },
    },
  };

  const query = qs.stringify(dataSend, {
    encodeValuesOnly: true,
  });

  const url = `/api/user-deal-favourites?${query}`;
  return await Api.get(url);
};

export default {
  createDealFavourite,
  checkIsFavourite,
};
