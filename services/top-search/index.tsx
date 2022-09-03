import Api from "../index";

const qs = require('qs');

const getTopSearches = async () => {
	const url = `/api/top-searches?pagination[page]=1&pagination[pageSize]=100`;
	return await Api.get(url);
}

export default {
    getTopSearches,
}
