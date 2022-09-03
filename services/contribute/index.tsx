import Api from "../index";

const qs = require("qs");

const createContribute = async (params: any) => {
  const url = `/api/contributeds`;
  return await Api.post(url, {
    data: params,
  });
};

const getUserContribute = async () => {
  let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const url = `/api/contributeds/get-user-contribute?userId=${userInfo.id}`;
  return await Api.get(url);
};

const ContributeApi = {
  createContribute,
  getUserContribute,
};

export default ContributeApi;
