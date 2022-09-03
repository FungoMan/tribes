import classNames from "classnames"
import Button from "components/Button/Button"
import Input from "components/Input/Input"
import Modal, { ModalHeader } from "components/Modal/Modal"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import user from "services/user"

import styles from "styles/Auth.module.scss"

import AuthApi from "../../../services/auth"

const OtpPage = (context) => {
  const { method, otpReceiver } = context
  const router = useRouter()
  const [valueOTP, setValueOTP] = useState<any>("")
  const [time, setTime] = useState<number>(30)
  const returnTime = (time) => {
    if (time === 0) {
      return "00"
    } else if (time < 10) {
      return "0" + time
    } else {
      return time
    }
  }

  useEffect(() => {
    let timer = setTimeout(() => {
      if (time > 0) {
        setTime(returnTime(time - 1))
      }
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  })

  const verifyOtp = async () => {
    let result: any = null
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}")
    try {
      result = await AuthApi.otpEmailConfirmForgetPassword({
        otp: valueOTP,
        userId: userInfo.id,
      })
    } catch (err) {
      // TODO: notify error (missing template)
      console.log(err)
      return false
    }
    let { success } = result.data
    if (success) {
      await router.push("/forgot-password/reset")
    } else {
      setValueOTP("")
      // TODO: notify error (missing template)
      alert("Wrong OTP")
    }
  }

  const requireOTP = async () => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}")
    let phoneNumer = userInfo.phone_number
    if (phoneNumer) {
      const result = await AuthApi.forgetPasswordByPhone({
        phone_number: phoneNumer,
      })
      setTime(30)
    }
  }

  return (
    <div className={styles.auth}>
      <div className={styles.form_container}>
        <ModalHeader alignTitle="center">Forgot password</ModalHeader>
        <div className={styles.body}>
          <div className={styles.instruction}>
            <div>
              An OTP have send to the {method} <strong>{otpReceiver}</strong>
            </div>
            <div>Please check and enter your OTP</div>
          </div>
          <Input
            size="large"
            placeholder="Enter OTP"
            onChange={(e: any) => setValueOTP(e.target.value)}
          />
          <div className="flex justify-between">
            <div>00:{time}</div>
            <div>
              <Button
                text="Resend"
                disabled={time != 0 ? true : false}
                variant="secondary-no-outlined"
                onClick={() => requireOTP()}
              />
            </div>
          </div>
          <Button text="Next" onClick={() => verifyOtp()} />
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  // Pass data to the page via props
  return {
    props: { method: context.query.method || "", otpReceiver: context.query.otpReceiver || "" },
  }
}

export default OtpPage
