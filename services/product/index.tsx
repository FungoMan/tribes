import Api from "../index";

const qs = require("qs");

const getProductsByBizListingId = async (bizListingId: any, sortBy: string) => {
  let dataSend: any = {
    filters: {
      biz_listing: {
        id: bizListingId,
      },
    },
  };
  if (sortBy !== "") {
    dataSend = { ...dataSend, sort: [sortBy] };
  }
  const query = qs.stringify(dataSend, {
    encodeValuesOnly: true,
  });

  const url = `/api/products?${query}`;
  return await Api.get(url);
};

const getProductsByBizListingSlug = async (slug: string, sortBy: string) => {
  let dataSend: any = {
    filters: {
      biz_listing: {
        value: slug,
      },
    },
  };
  if (sortBy !== "") {
    dataSend = { ...dataSend, sort: [sortBy] };
  }
  const query = qs.stringify(dataSend, {
    encodeValuesOnly: true,
  });

  const url = `/api/products?${query}`;
  return await Api.get(url);
};

const createProduct = async (params: any) => {
  const url = `/api/products`;
  return await Api.post(url, {
    data: params,
  });
};

const updateProduct = async (productId: string, params: any) => {
  const url = `/api/products/${productId}`;
  return await Api.put(url, {
    data: params,
  });
};

const deleteProduct = async (productId: any) => {
  const url = `/api/products/${productId}`;
  return await Api.delete(url);
};

const ProductApi = {
  getProductsByBizListingId,
  getProductsByBizListingSlug,
  createProduct,
  deleteProduct,
  updateProduct,
};

export default ProductApi;
