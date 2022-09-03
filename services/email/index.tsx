import { user } from "constant";
import Api from "../index";

const paymentSuccess = async (slug: any) => {
  let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const getParams: any = {
    firstName: userInfo.first_name,
    listingSlug: slug,
  };

  const url = `/api/payment-success`;
  return await Api.get(url, { params: getParams });
};

const downgrade = async (slug: any) => {
  let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const getParams: any = {
    firstName: userInfo.first_name,
    listingSlug: slug,
  };

  const url = `/api/downgrade`;
  return await Api.get(url, { params: getParams });
};

export default {
  paymentSuccess,
  downgrade,
};
