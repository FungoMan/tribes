import Api from "../index";

const qs = require("qs");

const getBizListingRevision = async () => {
  const query = qs.stringify(
    {
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
    },
    {
      encodeValuesOnly: true, // prettify url
    }
  );
  const url = `/api/biz-listing-revisions?${query}`;
  return await Api.get(url);
};

const getBizListingsRevisionByCategoryId = async (categoryId: number) => {
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

  const url = `/api/biz-listing-revisions?${query}`;
  return await Api.get(url);
};

const getBizListingRevisionByUserId = async (userId: number) => {
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

  const url = `/api/biz-listing-revisions?${query}`;
  return await Api.get(url);
};

const getBizListingRevisionById = async (bizListingId: any) => {
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

  const url = `/api/biz-listing-revisions/${bizListingId}?${query}`;
  return await Api.get(url);
};

const getOwnerListingRevisionRoleByUserId = async (userId: any) => {
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

const getBizListingRevisionBySlug = async (bizListingSlug: any) => {
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

  const url = `/api/biz-listing-revisions?${query}`;
  return await Api.get(url);
};

const getOwnerBizListingRevisionBySlug = async (bizListingSlug: any) => {
  let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
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

  const url = `/api/biz-listing-revisions?${query}`;
  return await Api.get(url);
};

const createListingRoleRevison = async (params: any) => {
  const url = `/api/listing-roles`;
  let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  return await Api.post(url, {
    data: {
      user: userInfo.id,
      biz_listing_revision: params.bizListingId,
      name: params.name,
    },
  });
};

const getOwnerBizListingRevision = async (bizListingSlug: any) => {
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
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `/api/biz-listing-revisions?${query}`;
  return await Api.get(url);
};

const updateBizListingRevision = async (bizListingId: number, params: any) => {
  const url = `/api/biz-listing-revisions/${bizListingId}`;
  return await Api.put(url, {
    data: params,
  });
};

const createBizListingRevision = async (params: any) => {
  const url = `/api/biz-listing-revisions/`;
  return await Api.post(url, {
    data: params,
  });
};

const getBizListingRevisionReviews = async (bizListingSlug: any) => {
  const query = qs.stringify(
    {
      filters: {
        slug: bizListingSlug,
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
  const url = `/api/biz-listing-revisions?${query}`;
  return await Api.get(url);
};

const getBizListingRevisionCountries = async () => {
  const url = `/api/biz-listing-revisions/countries`;
  return await Api.get(url);
};

const getBizListingRevisionByCountry = async (country: string) => {
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
  const url = `/api/biz-listing-revisions?${query}`;
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

  const url = `/api/biz-listing-revisions?${query}`;
  return await Api.get(url);
};

const createCustom = async (data: any) => {
  const url = `/api/biz-listings-revisions/create-custom`;
  return await Api.post(url, data);
};

export default {
  createCustom,
  getBizListingRevision,
  getOwnerListingRevisionRoleByUserId,
  getBizListingRevisionByUserId,
  getBizListingsRevisionByCategoryId,
  getBizListingRevisionById,
  getBizListingRevisionBySlug,
  getOwnerBizListingRevisionBySlug,
  getOwnerBizListingRevision,
  updateBizListingRevision,
  createBizListingRevision,
  getBizListingRevisionReviews,
  getBizListingRevisionCountries,
  getBizListingRevisionByCountry,
  checkListingHaveOwner,
  createListingRoleRevison,
};
