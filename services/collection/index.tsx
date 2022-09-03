import Api from "../index";

const qs = require("qs");

const getCollectionCustom = async (data: any) => {
  let filter: any = {};
  let pagination: any = {};
  if (data?.categories) {
    filter = {
      ...filter,
      category: {
        slug: data.categories,
      },
    };
  }
  if (data?.pinnedHomepage) {
    {
      filter.pinned_homepage = true;
    }
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
    populate: {
      thumbnail: {
        url: true,
      },
    },
  };
  const query = qs.stringify(params, {
    encodeValuesOnly: true, // prettify url
  });
  const url = `/api/collections/?${query}`;
  return await Api.get(url);
};

const getCollection = async (params: any) => {
  let query: any = {};
  const { category, pinnedHomepage } = params;
  if (category) {
    query.category = category;
  }
  if (pinnedHomepage) {
    {
      query.pinned_homepage = pinnedHomepage;
    }
  }
  query = qs.stringify(query);
  const url = `/api/collections/get-collection-custom?${query}`;
  return await Api.get(url);
};

const getAllCollection = async () => {
  const query = qs.stringify(
    {
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );
  const url = `/api/collections?${query}`;
  return await Api.get(url);
};

const getAllCollectionByCollectionSlug = async (
  collectionSlug: string,
  category?: string
) => {
  const query = qs.stringify(
    {
      filters: {
        slug: collectionSlug,
        // category: {
        //   slug: category,
        // },
      },
      populate: [
        "category",
        "biz_listings.categories",
        "biz_listings.category_links",
        "biz_listings.user_listing_follows",
        "biz_listings.tags",
        "biz_listings.reviews",
        "banner",
        "thumbnail",
      ],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const url = `/api/collections?${query}`;
  return await Api.get(url);
};

const CollectionApi = {
  getCollectionCustom,
  getCollection,
  getAllCollection,
  getAllCollectionByCollectionSlug,
};

export default CollectionApi;
