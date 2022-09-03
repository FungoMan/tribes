import { useRouter } from "next/router";
import Link from "next/link";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import classNames from "classnames";

import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import { ModalHeader } from "components/Modal/Modal";
import { removeZeroInPhoneNumber, validateEmail } from "utils";

import styles from "styles/Auth.module.scss";
import AuthApi from "../services/auth";
import { formattedAreaCodes } from "constant";
import SelectInput from "components/SelectInput/SelectInput";
import bizListingApi from "services/biz-listing";
import { UserInforContext } from "Context/UserInforContext";
import Head from "next/head";

export enum LoginMethod {
  PHONE_NUMBER = "phone-number",
  EMAIL = "email",
}

const PasswordEye = (props: { onClick: MouseEventHandler<HTMLDivElement> }) => {
  const { onClick } = props;
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <Icon icon="eye" size={20} color="#A4A8B7" />
    </div>
  );
};

const tabList = [
  { label: "Phone number", value: LoginMethod.PHONE_NUMBER },
  { label: "Email", value: LoginMethod.EMAIL },
];

const LoginPage = (context) => {
  const { prevPagePathname } = context;

  const [isLoading, setIsLoading] = useState(false);
  const [method, setMethod] = useState(LoginMethod.EMAIL);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginError, setIsLoginError] = useState<boolean>(false);
  const [areaCode, setAreaCode] = useState("");

  const router = useRouter();
  const { user, updateUser } = useContext(UserInforContext);

  const [metaTitle, setMetaTitle] = useState(
    "Login Now To Start Exploring | Tribes by HHWT"
  );
  const [metaDescription, setMetaDescription] = useState(
    "Welcome to Tribes! Sign in now"
  );

  useEffect(() => {
    const loginButton = document.getElementById("login-button");
    function clickLoginButton(event) {
      if (event.key === "Enter") {
        loginButton?.click();
      }
    }
    // Execute a function when the user presses a key on the keyboard
    window?.addEventListener("keypress", clickLoginButton);
    //clean up
    return () => window?.removeEventListener("keypress", clickLoginButton);
  }, []);

  const getOwnerListing = async (userId) => {
    const dataOwnerListing = await bizListingApi.getOwnerBizListing(userId);
    updateUser({
      owner_listings: dataOwnerListing.data.data,
    });
  };

  const handleLogin = async () => {
    let userInfoLogin = JSON.parse(localStorage.getItem("user") || "{}");
    setIsLoading(true);
    // Email
    if (method === LoginMethod.EMAIL) {
      let result: any = null;
      try {
        result = await AuthApi.loginByEmail({
          email: email,
          password: password,
        });
      } catch (err: any) {
        // TODO: notify error (missing template)
        setIsLoading(false);
        setIsLoginError(true);
        return false;
      }

      if (result.data) {
        let {
          jwt,
          user: { id },
        } = result.data;
        userInfoLogin.token = jwt;
        localStorage.setItem("user", JSON.stringify(userInfoLogin));
        await AuthApi.getMe();
        await getOwnerListing(id);
      }
    } else {
      let result: any = null;
      try {
        result = await AuthApi.loginByPhone({
          phone_number: phoneNumber,
          password: password,
        });
      } catch (err: any) {
        // TODO: notify error (missing template)
        setIsLoading(false);
        setIsLoginError(true);
        return false;
      }

      if (result.data) {
        let {
          jwt,
          user: { id },
        } = result.data;
        userInfoLogin.token = jwt;
        localStorage.setItem("user", JSON.stringify(userInfoLogin));
        await AuthApi.getMe();
        await getOwnerListing(id);
      }
    }

    const finalPreviousPage = [
      "/forgot-password/reset",
      "/signup",
      "/signup/otp",
      "/login",
    ].includes(prevPagePathname)
      ? "/"
      : prevPagePathname;

    window.location.href = finalPreviousPage || "/";
  };

  const routeFacebookLogin =
    process.env.NEXT_PUBLIC_API_URL + "api/connect/facebook";
  const routeGoogleLogin =
    process.env.NEXT_PUBLIC_API_URL + "api/connect/google";

  return (
    <div className={styles.auth}>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Head>
      <div className={styles.form_container}>
        <ModalHeader alignTitle="center">Log in</ModalHeader>

        <div className={styles.tabs}>
          {tabList.map((tab) => {
            const tabClassNames = classNames(styles.tab, {
              [styles.selected]: method === tab.value,
            });
            return (
              <div
                key={tab.value}
                onClick={() => {
                  setMethod(tab.value);
                  setIsLoginError(false);
                }}
                className={tabClassNames}
              >
                {tab.label}
              </div>
            );
          })}
        </div>
        <div className={styles.body}>
          {method === LoginMethod.PHONE_NUMBER ? (
            <SelectInput
              defaultValue={{
                select: {
                  label: "Singapore",
                  value: "+65",
                },
                input: "",
              }}
              selectWidth="max-content"
              isClearable
              label="Phone number"
              placeholder="Phone number"
              selectPlaceholder="Area code"
              options={formattedAreaCodes}
              shouldControlShowValue
              onChange={(e: any) => {
                setAreaCode(e.select);
                setPhoneNumber(removeZeroInPhoneNumber(e));
              }}
            />
          ) : (
            <Input
              label="Email"
              placeholder="Your email"
              onChange={(e: any) => setEmail(e.target.value)}
            />
          )}
          <Input
            size="large"
            placeholder="Password"
            type={showPassword ? "default" : "password"}
            suffix={
              <PasswordEye onClick={() => setShowPassword(!showPassword)} />
            }
            onChange={(e: any) => setPassword(e.target.value)}
            error={
              isLoginError
                ? `Ops! We cannot find the account with that ${method} or invalid password.`
                : ""
            }
          />
          <div className={styles.actions}>
            <div className="w-[150px]">
              <Checkbox label="Remember me" />
            </div>
            <Link href="/forgot-password" passHref>
              Forgot password?
            </Link>
          </div>
          <div className={styles.break}>
            <span>Or Log In with</span>
          </div>
          <div className={styles.socials}>
            <a rel="noopener noreferrer" href={routeGoogleLogin}>
              <Icon icon="google-logo" size={20} className={styles.icon} />
            </a>
            <a rel="noopener noreferrer" href={routeFacebookLogin}>
              <Icon icon="facebook-color" size={20} className={styles.icon} />
            </a>
          </div>
          <Button
            id="login-button"
            text="Log in"
            disabled={
              !(
                ((!!email && validateEmail(email)) ||
                  (!!phoneNumber && !!areaCode)) &&
                !!password
              )
            }
            onClick={handleLogin}
            isLoading={isLoading}
          />
          <div className={styles.sign_up}>
            No account yet?
            <span>
              <Link href="/signup"> Sign up now</Link>
            </span>
            <p className="mt-[3px]">
              By proceeding, you agree to our Terms & Conditions
            </p>
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
  const prevPage = context.req.headers.referer;
  const host = context.req.headers.host;
  const index = prevPage?.indexOf(host) + host.length;
  const prevPagePathname = prevPage?.slice(index);

  // Pass data to the page via props
  return {
    props: {
      prevPagePathname: prevPagePathname || "/",
    },
  };
}

export default LoginPage;
