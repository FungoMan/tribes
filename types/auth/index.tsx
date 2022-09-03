export interface VerifyOTPPayload {
  otp: string
}

export interface VerifyOTPPayloadForgetPassword {
  otp: string
  userId: string | null
}

export interface AuthForgetPassword {
  email: string
}

export interface AuthForgetPasswordByPhone {
  phone_number: string
}

export interface ResetPassword {
  password: string
  passwordConfirm: string
  userId: string | null
}

export interface AuthEmailPayload {
  email: string,
  password: string
}

export interface AuthPhonePayload {
  email?: string,
  password: string,
  phone_number: string,
}

export interface VerifyOTPPayload {
  otp: string
}
