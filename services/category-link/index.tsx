import Api from "../index";
const qs = require("qs");

const getCategoryLinksByCategoryId = async (categoryId: number) => {
  const query = qs.stringify(
    {
      filters: {
        category: {
          id: categoryId,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `/api/category-links?${query}`;
  return await Api.get(url);
};

const getCategoryLinksByCategorySlug = async (category) => {
  const query = qs.stringify(
    {
      filters: {
        category: {
          slug: category,
        },
      },
      populate: ["logo"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const url = `/api/category-links?${query}`;
  return await Api.get(url);
};

const getCategoryLinks = async () => {
  const query = qs.stringify(
    {
      populate: ["logo"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const url = `/api/category-links?${query}`;
  return await Api.get(url);
};

export default {
  getCategoryLinksByCategoryId,
  getCategoryLinks,
  getCategoryLinksByCategorySlug,
};
