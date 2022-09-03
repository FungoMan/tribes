import Api from "../index";

const createReport = async (params: any) => {
  const url = `/api/reports`;
  return await Api.post(url, {
    data: params,
  });
};

const reportApi = {
  createReport,
};

export default reportApi;
