import Api from "../index";

const qs = require("qs");

const getProductBrandByProductTypeId = async (productTypeIds: []) => {
  const query = qs.stringify(
    {
      filters: {
        product_types: {
          id: {
            $in: productTypeIds,
          },
        },
      },
      pagination: {
        limit: 500,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `/api/product-brands?${query}`;
  return await Api.get(url);
};

const getProductBrandByProductTypeSlug = async (productTypeSlugs?: string[]) => {
  const params = {
    filters: {
      product_types: {
        value: { $in: productTypeSlugs },
      },
    },
    pagination: {
      limit: 500,
    },
  };

  const query = qs.stringify(params, {
    encodeValuesOnly: true,
  });

  const url = `/api/product-brands?${query}`;
  return await Api.get(url);
};

const ProductBrandApi = {
  getProductBrandByProductTypeId,
  getProductBrandByProductTypeSlug,
};

export default ProductBrandApi;
