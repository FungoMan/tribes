import Api from "../index";

const getTags = async () => {
  const url = `/api/tags`;
  return await Api.get(url);
}


export default {
  getTags
}
