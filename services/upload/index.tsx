import Api from "../index";
import {UploadRefPayload} from "../../types/upload";

const uploadRef = async (params: any) => {
  const url = `/api/upload`;
  return await Api.post(url, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export default {
  uploadRef
}
