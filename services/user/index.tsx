import Api from "../index";
import { UploadRefPayload } from "../../types/upload";

const updateUser = async (userId: number, params: any) => {
  const url = `/api/users/${userId}`;
  return await Api.put(url, params);
};

const removeListingFavourite = async (params: any) => {
  const url = `/api/auth/remove-listing-favourite`;
  return await Api.post(url, params);
} 

const removeDealFavourite = async (params: any) => {
  const url = `/api/auth/remove-deal-favourite`;
  return await Api.post(url, params);
} 

const UserApi = {
  updateUser,
  removeListingFavourite,
  removeDealFavourite,
};

export default UserApi;
