import Api from "../";
import {
  AuthEmailPayload,
  VerifyOTPPayload,
  AuthForgetPassword,
  VerifyOTPPayloadForgetPassword,
  ResetPassword,
  AuthPhonePayload,
  AuthForgetPasswordByPhone,
} from "../../types/auth";
import { UserTypes } from "../../enums";

const signUpByEmail = async (params: AuthEmailPayload) => {
  localStorage.removeItem("user");
  const url = `/api/auth/local/register`;
  return await Api.post(url, {
    username: params.email,
    email: params.email,
    password: params.password,
  });
};

const resetPasswordByOldPassword = async (params: any) => {
  let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const url = `/api/auth/confirm-to-reset-password`;
  return await Api.post(url, {
    id: userInfo.id,
    oldPassword: params.oldPassword,
    newPassword: params.newPassword,
  });
};

const signUpByPhone = async (params: AuthPhonePayload) => {
  localStorage.removeItem("user");
  const url = `/api/auth/local/register`;
  return await Api.post(url, {
    username: params.phone_number,
    email: params.email,
    password: params.password,
    phone_number: params.phone_number,
  });
};

const otpEmailGenerate = async () => {
  const url = `/api/otp-email-generate`;
  return await Api.get(url);
};

const otpEmailConfirm = async (params: VerifyOTPPayload) => {
  const url = `/api/otp-email-confirm`;
  return await Api.post(url, {
    otp: params.otp,
  });
};

const otpPhoneGenerate = async (phoneNumber: string) => {
  const url = `/api/otp-phone-generate?phone=${phoneNumber}`;
  return await Api.get(url);
};

const otpPhoneConfirm = async (params: VerifyOTPPayload) => {
  const url = `/api/otp-phone-confirm`;
  return await Api.post(url, {
    otp: params.otp,
  });
};

const loginByEmail = async (params: AuthEmailPayload) => {
  localStorage.removeItem("user");
  const url = `/api/auth/local`;
  return await Api.post(url, {
    identifier: params.email,
    password: params.password,
  });
};

const loginByPhone = async (params: AuthPhonePayload) => {
  localStorage.removeItem("user");
  const url = `/api/auth/local`;
  return await Api.post(url, {
    identifier: params.phone_number,
    password: params.password,
  });
};

const getMe = async () => {
  const url = `/api/users/me`;
  const me = await Api.get(url);
  let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  if (!me.data) {
    localStorage.removeItem("user");
    window.location.href = "/";
  }
  // if (!me.data.avatar) {
  //   me.data.avatar = "https://picsum.photos/200";
  // } else {
  //   me.data.avatar = me.data.avatar;
  // }
  if (localStorage.getItem("user")) {
    if (!userInfo.user_type) {
      me.data.user_type = UserTypes.NORMAL_USER;
    } else {
      me.data.user_type = userInfo.user_type;
    }
  }
  me.data.user_avatar = me.data.avatar || undefined;
  me.data.avatar = userInfo.avatar;
  me.data.token = userInfo.token;
  me.data.owner_listings = userInfo.owner_listings || [];
  me.data.biz_listings = userInfo.biz_listings || [];
  me.data.biz_invoice = userInfo.biz_invoice || [];
  me.data.claim_listings = userInfo.claim_listings || [];
  me.data.listing_roles = userInfo.listing_roles || [];
  me.data.biz_slug = userInfo.biz_slug || "";
  me.data.biz_id = userInfo.biz_id || "";
  me.data.type_handle = userInfo.type_handle || "";
  me.data.pay_price = userInfo.pay_price || "";
  me.data.role = userInfo.role || "";
  me.data.now_biz_listing = userInfo.now_biz_listing || {};
  me.data.location = userInfo.location || "";
  me.data.current_listing_slug = userInfo.current_listing_slug || "";
  localStorage.setItem("user", JSON.stringify(me.data));
};

const getUserInformation = () => {
  return Api.get(`/api/users/me`);
};

const forgetPasswordByEmail = async (params: AuthForgetPassword) => {
  const url = `/api/auth/forgot-password`;
  return await Api.post(url, {
    email: params.email,
  });
};

const forgetPasswordByPhone = async (params: AuthForgetPasswordByPhone) => {
  const url = `/api/auth/forgot-password-by-phone`;
  return await Api.post(url, {
    phone_number: params.phone_number,
  });
};

const otpEmailConfirmForgetPassword = async (
  params: VerifyOTPPayloadForgetPassword
) => {
  const url = `/api/otp-email-forgetpassword`;
  return await Api.post(url, {
    otp: params.otp,
    userId: params.userId,
  });
};

const resetPassword = async (params: ResetPassword) => {
  const url = `/api/auth/reset-password`;
  return await Api.post(url, {
    password: params.password,
    passwordConfirmation: params.passwordConfirm,
    userId: params.userId,
  });
};

const loginFacebookCallback = async (accessToken: any) => {
  localStorage.removeItem("user");
  let userInfo = {
    token: null,
  };
  const url = `/api/auth/facebook/callback?access_token=${accessToken}`;
  let user = await Api.get(url);
  if (user.data) {
    let {
      jwt,
      user: { confirmed },
    } = user.data;
    userInfo.token = jwt;
    localStorage.setItem("user", JSON.stringify(userInfo));
    await getMe();
    if (!confirmed) {
      window.location.href = "/signup/setup-profile";
    } else {
      window.location.href = "/";
    }
  }
};

const loginGoogleCallback = async (accessToken: any) => {
  localStorage.removeItem("user");
  let userInfo = {
    token: null,
  };
  const url = `/api/auth/google/callback?access_token=${accessToken}`;
  let user = await Api.get(url);
  if (user.data) {
    let {
      jwt,
      user: { confirmed },
    } = user.data;
    userInfo.token = jwt;
    localStorage.setItem("user", JSON.stringify(userInfo));
    await getMe();
    if (!confirmed) {
      window.location.href = "/signup/setup-profile";
    } else {
      window.location.href = "/";
    }
  }
};

const AuthApi = {
  getUserInformation,
  resetPasswordByOldPassword,
  signUpByEmail,
  otpEmailGenerate,
  otpEmailConfirm,
  otpPhoneGenerate,
  otpPhoneConfirm,
  loginByEmail,
  getMe,
  otpEmailConfirmForgetPassword,
  forgetPasswordByEmail,
  forgetPasswordByPhone,
  resetPassword,
  signUpByPhone,
  loginByPhone,
  loginFacebookCallback,
  loginGoogleCallback,
};

export default AuthApi;
