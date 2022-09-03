import Api from "../index";

const qs = require("qs");

const getBannerCustom = async (data: any) => {
  let filter: any = {};
  let pagination: any = {};
  // if (data?.country) {
  //   filter.country = data.country;
  // }
  if (data?.pinnedHomepage) {
    filter = {
      ...filter,
      pinned_home: true,
    };
  }
  if (data?.categories) {
    filter = {
      ...filter,
      category: {
        slug: data.categories,
      },
    };
  }
  if (data?.categoryLinks) {
    filter = {
      ...filter,
      category_links: {
        value: data.categoryLinks,
      },
    };
  }

  if (data?.limit) {
    pagination.pageSize = data.limit;
  }
  if (data?.page) {
    pagination.page = data.page;
  }

  const params = {
    filters: {
      ...filter,
    },
    pagination: {
      ...pagination,
    },
    populate: "*",
  };
  const query = qs.stringify(params, {
    encodeValuesOnly: true, // prettify url
  });
  const url = `/api/banners?${query}`;
  return await Api.get(url);
};

const getBanner = async () => {
  const url = `/api/banners/get-banner-custom`;
  return await Api.get(url);
};

const getBannerByCategory = async (category) => {
  const url = `/api/banners/get-banner-by-category?category=${category}`;
  return await Api.get(url);
};

export default {
  getBannerCustom,
  getBanner,
  getBannerByCategory,
};
