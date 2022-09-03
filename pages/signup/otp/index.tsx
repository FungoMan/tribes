import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Modal, { ModalHeader } from "components/Modal/Modal";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";

import styles from "styles/Auth.module.scss";
import { useEffect, useState } from "react";
import AuthApi from "../../../services/auth";
import Heading from "components/Heading/Heading";
import Head from "next/head";

const OtpPage = (context) => {
  const { method, otpReceiver } = context;
  const router = useRouter();
  const [valueOtp, setValueOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState<number>(30);

  const [metaTitle, setMetaTitle] = useState(
    "Sign Up Today To Be Part of the Community | Tribes by HHWT"
  );
  const [metaDescription, setMetaDescription] = useState(
    "Register. Don't have a Tribes account yet? Join now to gain access to exclusive deals from Muslim Friendly brands around the world!"
  );

  const returnTime = (time) => {
    if (time === 0) {
      return "00";
    } else if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      if (time > 0) {
        setTime(returnTime(time - 1));
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  });

  const verifyOtp = async () => {
    setIsLoading(true);
    let result: any = null;
    if (method === "email") {
      try {
        result = await AuthApi.otpEmailConfirm({
          otp: valueOtp,
        });
      } catch (err) {
        // TODO: notify error (missing template)
        console.log(err);
        setIsLoading(false);
        return false;
      }
      let { success } = result.data;
      if (success) {
        await router.push("/signup/setup-profile");
      } else {
        setValueOtp("");
        setIsLoading(false);
        // TODO: notify error (missing template)
        alert("Wrong OTP");
      }
    } else {
      try {
        result = await AuthApi.otpPhoneConfirm({
          otp: valueOtp,
        });
      } catch (err) {
        // TODO: notify error (missing template)
        console.log(err);
        setIsLoading(false);
        return false;
      }
      let { success } = result.data;
      if (success) {
        await router.push("/signup/setup-profile");
      } else {
        setValueOtp("");
        setIsLoading(false);
        // TODO: notify error (missing template)
        alert("Wrong OTP");
      }
    }
  };

  const requireOTP = async () => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    let phoneNumer = userInfo.phone_number;
    if (phoneNumer) {
      await AuthApi.otpPhoneGenerate(phoneNumer);
      setTime(30);
    } else {
      await AuthApi.otpEmailGenerate();
      setTime(30);
    }
  };

  return (
    <div className={styles.auth}>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Head>
      <div className={styles.form_container}>
        <ModalHeader alignTitle="center">Sign up</ModalHeader>
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
            value={valueOtp}
            onChange={(e: any) => setValueOtp(e.target.value)}
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
          <Button
            disabled={!valueOtp}
            text="Sign up"
            onClick={() => verifyOtp()}
            isLoading={isLoading}
          />
          <div className={styles.sign_up}>
            Already have account?
            <span>
              <Link href="/login"> Log in now</Link>
            </span>
          </div>
        </div>
        <div className={styles.footer} onClick={() => router.push("/claim")}>
          <Icon icon="business" size={20} />
          <div>Grow your business with Tribes now! </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  // Pass data to the page via props
  return {
    props: {
      method: context.query.method || "",
      otpReceiver: context.query.otpReceiver || "",
    },
  };
}

export default OtpPage;
