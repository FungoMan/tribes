import { productTypes } from "components/AddListingPages/PageThree/constant";
import { categories } from "constant";
import { Categories, CategoryText } from "enums";
import category from "services/category";
import categoryLink from "services/category-link";
import productType from "services/product-type";
import Api from "../index";

const qs = require("qs");

const getBizListing = async (search?: string, country?: string) => {
  const params = {
    filters: {
      name: { $contains: search || "" },
      country: country,
    },
    populate: {
      user_listing_follows: {
        fields: ["id"],
      },
      reviews: {
        fields: ["id"],
      },
      categories: {
        data: ["id", "attributes"],
      },
      listing_roles: {
        data: ["id", "attributes"],
      },
      claim_listings: {
        data: ["id", "attributes"],
      },
    },
  };
  const query = qs.stringify(params, {
    encodeValuesOnly: true, // prettify url
  });
  const url = `/api/biz-listings?${query}`;
  return await Api.get(url);
};

const getListingBySlug = async (
  search?: string,
  country?: string,
  limit?: number
) => {
  const params = {
    filters: {
      slug: { $contains: search || "" },
      country: country,
    },
    pagination: {
      limit: limit,
    },
    populate: {
      user_listing_follows: {
        fields: ["id"],
      },
      reviews: {
        fields: ["id"],
      },
      categories: {
        data: ["id", "attributes"],
      },
      category_links: {
        data: ["id", "attributes"],
      },
      listing_roles: {
        data: ["id", "attributes"],
      },
      claim_listings: {
        data: ["id", "attributes"],
      },
    },
  };
  const query = qs.stringify(params, {
    encodeValuesOnly: true, // prettify url
  });
  const url = `/api/biz-listings?${query}`;
  return await Api.get(url);
};

const getBizListingsByCategoryId = async (
  categoryId: Categories,
  page?: number
) => {
  const pageNumber = page || 1;
  const query = qs.stringify(
    {
      filters: {
        categories: {
          id: {
            $eq: categoryId,
          },
        },
      },
      populate: {
        user_listing_follows: {
          fields: ["id"],
        },
        reviews: {
          fields: ["id"],
        },
        listing_roles: {
          data: ["id", "attributes"],
        },
        claim_listings: {
          data: ["id", "attributes"],
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify url
    }
  );
  const url = `/api/biz-listings?${query}&pagination[page]=${pageNumber}&pagination[pageSize]=28`;
  // const url = `/api/biz-listings?${query}`;
  return await Api.get(url);
};

const getBizListingsByCategoryIdWithPagination = async (
  categoryId: Categories,
  page: number
) => {
  const query = qs.stringify(
    {
      filters: {
        categories: {
          id: {
            $eq: categoryId,
          },
        },
      },
      populate: {
        user_listing_follows: {
          fields: ["id"],
        },
        reviews: {
          fields: ["id"],
        },
        listing_roles: {
          data: ["id", "attributes"],
        },
        claim_listings: {
          data: ["id", "attributes"],
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify url
    }
  );

  const url = `/api/biz-listings?${query}&pagination[page]=${page}&pagination[pageSize]=28`;
  return await Api.get(url);
};

const getBizListingByUserId = async (userId: number) => {
  const query = qs.stringify(
    {
      filters: {
        user: {
          id: {
            $eq: userId,
          },
        },
      },
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `/api/biz-listings?${query}`;
  return await Api.get(url);
};

const getBizListingById = async (bizListingId: any) => {
  const query = qs.stringify(
    {
      populate: {
        user_listing_follows: {
          fields: ["id"],
        },
        reviews: {
          fields: ["id"],
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify url
    }
  );

  const url = `/api/biz-listings/${bizListingId}?${query}`;
  return await Api.get(url);
};

const createListingRole = async (params: any) => {
  const url = `/api/listing-roles`;
  let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  return await Api.post(url, {
    data: {
      user: userInfo.id,
      biz_listing: params.bizListingId,
      name: params.name,
    },
  });
};

const getOwnerListingRoleByUserId = async (userId: any) => {
  const query = qs.stringify(
    {
      filters: {
        name: "Owner",
        user: {
          id: {
            $eq: userId,
          },
        },
      },
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `/api/listing-roles?${query}`;
  return await Api.get(url);
};

const getBizListingBySlug = async (bizListingSlug: any) => {
  console.log("dwwd");
  const query = qs.stringify(
    {
      filters: {
        slug: bizListingSlug,
      },
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `/api/biz-listings?${query}`;
  return await Api.get(url);
};

const getInfoBizListingBySlug = async (bizListingSlug: any) => {
  const url = `/api/biz-listings/bizlisting-information/?slug=${bizListingSlug}`;
  return await Api.get(url);
};

const getOwnerBizListingBySlug = async (bizListingSlug: any) => {
  let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const query = qs.stringify(
    {
      filters: {
        slug: bizListingSlug,
        $or: [
          {
            claim_listings: {
              user: {
                id: {
                  $eq: userInfo.id,
                },
              },
            },
          },
          {
            listing_roles: {
              name: "Owner",
              user: {
                id: {
                  $eq: userInfo.id,
                },
              },
            },
          },
        ],
      },
      populate: ["categories", "category_links"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `/api/biz-listings?${query}`;
  return await Api.get(url);
};

const getInfoOwnerBizListingBySlug = async (bizListingSlug: any) => {
  let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const url = `/api/biz-listings/owner-bizlisting-information/?slug=${bizListingSlug}&userId=${userInfo.id}&email=${userInfo.email}`;
  return await Api.get(url);
};

const getOwnerBizListing = async (bizListingSlug?: any) => {
  let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const query = qs.stringify(
    {
      filters: {
        $or: [
          {
            claim_listings: {
              user: {
                id: {
                  $eq: userInfo.id,
                },
              },
            },
          },
          {
            listing_roles: {
              name: {
                $ne: null,
              },
              user: {
                id: {
                  $eq: userInfo.id,
                },
              },
            },
          },
        ],
      },
      populate: ["categories", "category_links"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `/api/biz-listings?${query}`;
  return await Api.get(url);
};

const updateBizListing = async (bizListingId: number, params: any) => {
  const url = `/api/biz-listings/${bizListingId}`;
  return await Api.put(url, {
    data: params,
  });
};

const createBizListing = async (params: any) => {
  const url = `/api/biz-listings/`;
  return await Api.post(url, {
    data: params,
  });
};

const getBizListingReviews = async (bizListingSlug: any) => {
  const query = qs.stringify(
    {
      filters: {
        slug: bizListingSlug,
      },
      populate: {
        reviews: {
          populate: ["user"],
        },
        categories: "*",
        category_links: "*",
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const url = `/api/biz-listings?${query}`;
  return await Api.get(url);
};

const getBizListingCountries = async () => {
  const url = `/api/biz-listings/countries`;
  return await Api.get(url);
};

const getBizListingByCountry = async (country: string) => {
  const query = qs.stringify(
    {
      filters: {
        country: country,
      },
      populate: {
        reviews: {
          populate: ["user"],
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const url = `/api/biz-listings?${query}`;
  return await Api.get(url);
};

const checkListingHaveOwner = async (bizListingSlug: any) => {
  let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const query = qs.stringify(
    {
      filters: {
        slug: bizListingSlug,
        listing_roles: {
          name: "Owner",
        },
      },
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `/api/biz-listings?${query}`;
  return await Api.get(url);
};

const getBizListingForYou = async (params: any) => {
  let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const getParams = {
    userId: userInfo.id,
    limit: params.limit,
    country: params?.country,
  };
  if (userInfo.id) {
    const url = `/api/biz-listings/bizlisting-for-you/`;
    return await Api.get(url, { params: getParams });
  }
};

const getAllBizlitingPinnedByCategory = async (country?: string) => {
  const url = `/api/biz-listings/get-listing-pinned?country=${country || ""}`;
  return await Api.get(url);
};

const getAllBizListingsHaveExclusiveDeal = async () => {
  const url = `/api/biz-listings/exclusive-deal/`;
  return await Api.get(url);
};

const getExclusiveDealByCategory = async (category) => {
  const url = `/api/biz-listings/exclusive-deal-by-category/?category=${category}`;
  return await Api.get(url);
};

const getBizlistingByCategoryLink = async (params?: any) => {
  const getParams = {
    category: params?.category,
    categoryLinks: params?.categoryLinks,
    page: params?.page || 1,
    country: params?.location,

    sort: params?.sort,
    productTypes: params?.productTypes,
    productBrands: params?.productBrands,
    minPrice: params?.minPrice,
    maxPrice: params?.maxPrice,
    minRating: params?.minRating,
    maxRating: params?.maxRating,
  };
  const url = `/api/biz-listings/bizlisting-by-categorylink`;
  return await Api.get(url, { params: getParams });
};

const getListingFavouriteByCategory = async (category) => {
  let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const url = `/api/biz-listings/listing-favourite-by-category?category=${category}&userId=${userInfo.id}`;
  return await Api.get(url);
};

const getBizListingsHaveDealsByCategoryId = async (categoryId: Categories) => {
  const query = qs.stringify(
    {
      filters: {
        categories: {
          id: {
            $eq: categoryId,
          },
        },
        deals: {
          is_exclusive: true,
          is_revision: {
            $not: true,
          },
        },
      },
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `/api/biz-listings?${query}`;
  return await Api.get(url);
};

const getAllBizlitingByCategorySlug = async (
  country?: string,
  categoryId?: string | number,
  page?: string | number
) => {
  const url = `/api/biz-listings/bizlisting-by-categoryslug?country=${country}&category=${categoryId}&page=${page}`;
  return await Api.get(url);
};

const getFavouriteDeals = async () => {
  let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = userInfo.id;
  const query = qs.stringify(
    {
      filters: {
        user: {
          id: userId,
        },
      },
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `/api/user-deal-favourites?${query}`;
  return await Api.get(url);
};

const getListingCustom = async (data: any) => {
  let filter: any = {};
  let pagination: any = {};
  if (data?.slug) {
    filter.slug = data.slug;
  }
  if (data?.country) {
    filter.country = data.country;
  }
  if (data?.categories) {
    filter = {
      ...filter,
      categories: {
        slug: data.categories,
      },
    };
  }
  if (data?.idCategory) {
    filter = {
      ...filter,
      categories: {
        id: data.idCategory,
      },
    };
  }
  if (data?.categoryLinks && data?.categoryLinks !== "all") {
    filter = {
      ...filter,
      category_links: {
        value: {
          $in: categoryLink,
        },
      },
    };
  }
  if (data?.productTypes) {
    filter = {
      ...filter,
      product_types: {
        value: {
          $in: data.productTypes,
        },
      },
    };
  }
  if (data?.productBrands) {
    filter = {
      ...filter,
      product_brands: {
        value: {
          $in: data.productBrands,
        },
      },
    };
  }
  if (data?.hasDeals) {
    filter = {
      ...filter,
      deals: {
        is_revision: {
          $not: true,
        },
      },
    };
  }
  if (data?.isExclusive) {
    filter = {
      ...filter,
      deals: {
        is_exclusive: true,
        is_revision: {
          $not: true,
        },
      },
    };
  }
  if (data?.search) {
    filter = {
      ...filter,
      slug: { $contains: data.search || "" },
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
    populate: {
      user_listing_follows: {
        id: true,
      },
      user_listing_favourites: {
        id: true,
      },
      category_links: {
        data: ["id", "attributes"],
      },
      categories: {
        name: true,
      },
      tags: {
        id: true,
      },
      reviews: {
        id: true,
      },
    },
  };
  const query = qs.stringify(params, {
    encodeValuesOnly: true, // prettify url
  });
  const url = `/api/biz-listings?${query}`;
  return await Api.get(url);
};

const getListingYouMightLikes = async (params?: any) => {
  console.log("params", params);
  const query = qs.stringify(params, {
    encodeValuesOnly: true, // prettify url
  });
  const url = `/api/biz-listings/you-likes?${query}`;
  return await Api.get(url);
};

const bizListingApi = {
  getListingCustom,
  getFavouriteDeals,
  getListingBySlug,
  getAllBizlitingByCategorySlug,
  getBizListingsByCategoryIdWithPagination,
  getBizlistingByCategoryLink,
  getBizListing,
  getOwnerListingRoleByUserId,
  getInfoOwnerBizListingBySlug,
  getBizListingByUserId,
  getBizListingsByCategoryId,
  getBizListingById,
  createListingRole,
  getBizListingBySlug,
  getInfoBizListingBySlug,
  getOwnerBizListingBySlug,
  getOwnerBizListing,
  updateBizListing,
  createBizListing,
  getBizListingReviews,
  getBizListingCountries,
  getBizListingByCountry,
  checkListingHaveOwner,
  getBizListingForYou,
  getAllBizlitingPinnedByCategory,
  getAllBizListingsHaveExclusiveDeal,
  getBizListingsHaveDealsByCategoryId,
  getExclusiveDealByCategory,
  getListingFavouriteByCategory,
  getListingYouMightLikes,
};

export default bizListingApi;
