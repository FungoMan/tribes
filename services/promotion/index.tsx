import Api from "../index";

const qs = require("qs");

const getPromotionBySlug = async (slug: any) => {
  const query = qs.stringify(
    {
      filters: {
        slug: slug,
      },
      populate: {
        "0": "main_banner",
        "1": "banners",
        "2": "deals",
        "3": "hot_deals",
        "4": "more_deals",
        "5": "microsite_biz_listings.biz_listings",
        "6": "microsite_biz_listings.biz_listings.reviews",
        "7": "microsite_biz_listings.biz_listings.tags",
        "8": "microsite_biz_listings.biz_listings.user_listing_follows",
        "9": "microsite_biz_listings.biz_listings.categories",
        "10": "microsite_biz_listings.biz_listings.category_links",
        "11": "microsite_articles.articles.thumbnail",
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `/api/microsites?${query}`;
  return await Api.get(url);
};

export default {
  getPromotionBySlug,
};
