import category from "services/category";
import user from "services/user";
import Api from "../index";

const qs = require('qs');

const getFollowByUserId = async () => {
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
	const url = `/api/user-listing-follows?${query}`;
	return await Api.get(url);
}

const createFollowing = async (bizlistingId) => {
	let userInfo = JSON.parse(localStorage.getItem("user") || '{}')  
	const url = `/api/user-listing-follows`;
	return await Api.post(url, {
		data: {
			user: userInfo.id,
			biz_listing: bizlistingId
		}
	});
}

export default {
    createFollowing,
	getFollowByUserId
}
