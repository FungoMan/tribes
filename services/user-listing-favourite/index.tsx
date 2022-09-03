import category from "services/category";
import user from "services/user";
import Api from "../index";

const qs = require('qs');

const getFavouriteByUserId = async () => {
	let userInfo = JSON.parse(localStorage.getItem("user") || "{}")
	const params = {
		filters: {
		  user: {
			id: userInfo.id
		  }
		},
		populate: ['biz_listing']
	  };
	  const query = qs.stringify(params, {
		encodeValuesOnly: true, // prettify url
	  });
	const url = `/api/user-listing-favourites?${query}`;
	return await Api.get(url);
}

const createFavourite = async (bizlistingId) => {
	let userInfo = JSON.parse(localStorage.getItem("user") || '{}')  
	const url = `/api/user-listing-favourites`;
	return await Api.post(url, {
		data: {
			user: userInfo.id,
			biz_listing: bizlistingId
		}
	});
}

export default {
	getFavouriteByUserId,
    createFavourite,
}
