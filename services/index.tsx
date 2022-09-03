import axios from "axios";
let baseURL = process.env.NEXT_PUBLIC_API_URL;

const Api = axios.create({
  baseURL: baseURL,
});

Api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
  let userInfo = JSON.parse(localStorage.getItem("user") || '{}')
    if ( userInfo.token ) {
      const token = `Bearer ${userInfo.token}`;
    // @ts-ignore
      config.headers.common["Authorization"] = token;
    }
  }
  return config;
});

Api.interceptors.response.use(
  (res) => {
    return res;
  },
  function (err) {
    const status = err?.response?.status;
    if (status === 401) {
      localStorage.removeItem("user");
      // window.location.href = "/sign-in"; // TODO
    }
    return Promise.reject(err);
  },
);

export default Api;
