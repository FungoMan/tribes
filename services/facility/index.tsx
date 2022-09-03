import Api from "../index";

const getFacility = async () => {
  const url = `/api/facilities`;
  return await Api.get(url);
}

export default {
    getFacility
}
