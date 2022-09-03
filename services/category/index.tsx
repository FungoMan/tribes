import Api from "../index";
const qs = require('qs');

const getCategories = async () => {
  const url = `/api/categories?sort=order`;
  return await Api.get(url);
}

const getItemCategory = async () => {
  const query = qs.stringify({
    "populate": [
      'category_links',
    ]
  }, {
    encodeValuesOnly: true
  }); 
  const url = `/api/categories?${query}&sort=order`;
  return await Api.get(url);
}

export default {
  getCategories,
  getItemCategory
}
