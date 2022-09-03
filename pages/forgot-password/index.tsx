import { MouseEventHandler, useState } from "react";
import classNames from "classnames";

import Button from "components/Button/Button";
import Input from "components/Input/Input";
import Modal, { ModalHeader } from "components/Modal/Modal";
import { removeZeroInPhoneNumber, validateEmail } from "utils";

import AuthApi from "../../services/auth";

import styles from "styles/Auth.module.scss";
import { useRouter } from "next/router";
import SelectInput from "components/SelectInput/SelectInput";
import { formattedAreaCodes, phoneAreaCodes } from "constant";

export enum LoginMethod {
  PHONE_NUMBER = "phone",
  EMAIL = "email",
}

const tabList = [
  { label: "Phone number", value: LoginMethod.PHONE_NUMBER },
  { label: "Email", value: LoginMethod.EMAIL },
];

const ForgotPasswordPage = () => {
  const [method, setMethod] = useState(LoginMethod.EMAIL);
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: any) => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    event.preventDefault();
    const otpReceiver =
      method === LoginMethod.EMAIL
        ? event.target.email.value
        : event.target.phone.value;
    const formData = {
      method: method,
      [method]: otpReceiver,
    };
    let check = false;
    if (method === LoginMethod.EMAIL) {
      try {
        console.log("forget password");
        console.log("Email: ", formData.email);
        const result = await AuthApi.forgetPasswordByEmail({
          email: formData.email,
        });
        console.log("result: ", result);
        if (result.data.ok) {
          check = true;
          userInfo = { ...userInfo, id: result.data.id };
          localStorage.setItem("user", JSON.stringify(userInfo));
        }
      } catch (error: any) {
        console.log(error.response.data.error);
      }
    } else {
      try {
        console.log("forget password");
        console.log("Phone: ", phoneNumber);
        const result = await AuthApi.forgetPasswordByPhone({
          phone_number: phoneNumber,
        });
        console.log("result: ", result);
        if (result.data.ok) {
          check = true;
          userInfo = {
            ...userInfo,
            id: result.data.id,
            phone_number: phoneNumber,
          };
          localStorage.setItem("user", JSON.stringify(userInfo));
        }
      } catch (error: any) {
        console.log(error.response.data.error);
      }
    }

    if (check === true) {
      router.push({
        pathname: "/forgot-password/otp",
        //help otp page detect method and otp receiver
        query: {
          method: method,
          otpReceiver: otpReceiver,
        },
      });
    }
  };

  return (
    <div className={styles.auth}>
      <div className={styles.form_container}>
        <ModalHeader alignTitle="center">Forgot password</ModalHeader>
        <div className={styles.tabs}>
          {tabList.map((tab) => {
            const tabClassNames = classNames(styles.tab, {
              [styles.selected]: method === tab.value,
            });
            return (
              <div
                key={tab.value}
                onClick={() => setMethod(tab.value)}
                className={tabClassNames}
              >
                {tab.label}
              </div>
            );
          })}
        </div>
        <form className={styles.body} onSubmit={handleSubmit}>
          {method === LoginMethod.PHONE_NUMBER ? (
            <SelectInput
              defaultValue={{
                select: {
                  label: "Singapore",
                  value: "+65",
                },
                input: "",
              }}
              label="Phone number"
              placeholder="Phone number"
              selectPlaceholder="Area code"
              options={formattedAreaCodes}
              shouldControlShowValue
              name="phone"
              onChange={(e) => setPhoneNumber(removeZeroInPhoneNumber(e))}
            />
          ) : (
            <Input
              label="Email"
              placeholder="Your email"
              name="email"
              onChange={(e: any) => setEmail(e.target.value)}
            />
          )}
          <Button
            text="Next"
            type="submit"
            disabled={!((!!email && validateEmail(email)) || !!phoneNumber)}
          />
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
