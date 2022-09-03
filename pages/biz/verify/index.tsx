import {
  ChangeEvent,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { get, result } from "lodash";

import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Modal from "components/Modal/Modal";
import Select from "components/Select/Select";
import Upload from "components/Upload/Upload";
import { Tiers, UserTypes, VerifySteps } from "enums";
import { getListingUrl, removeZeroInPhoneNumber } from "utils";
import AuthApi from "../../../services/auth";
import UserApi from "../../../services/user";
import BizInvoinceApi from "../../../services/biz-invoice";
import ClaimListingApi from "../../../services/claim-listing";
import SelectInput from "components/SelectInput/SelectInput";
import { formattedAreaCodes, user } from "constant";
import bizListingApi from "services/biz-listing";
import EmailApi from "services/email";
import { UserInforContext } from "Context/UserInforContext";

import styles from "styles/BizUserVerify.module.scss";
interface BizUserVerifyProps {
  tier: string;
  id: string;
}

const BizUserVerify = (props: BizUserVerifyProps) => {
  const { tier, id } = props;

  const [verifyStep, setVerifyStep] = useState(VerifySteps.REQUEST_OTP);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [subscription, setSubscription] = useState("");
  const [claimedListing, setClaimedListing] = useState<{
    [key: string]: any;
  }>({});
  const [showResultModal, setShowResultModal] = useState(false);
  const [frontImageIdentity, setFrontImageIdentity] = useState<string>("");
  const [backImageIdentity, setBackImageIdentity] = useState<string>("");
  const [payPrice, setPayPrice] = useState<string>("");
  const [time, setTime] = useState<number>(30);
  const [type, setType] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const { user, updateUser } = useContext(UserInforContext);

  const idTypeOptions = [
    {
      label: "Driving License",
      value: "Driving License",
    },
    {
      label: "ID card",
      value: "ID card",
    },
  ];

  const router = useRouter();
  let baseURL = process.env.NEXT_PUBLIC_API_URL;
  // let baseURL =
  //   "https://2584-2001-ee0-500d-3a90-ec3f-d03b-63d9-f470.ap.ngrok.io/";

  useEffect(() => {
    const sessionId = router.query.sessionId;
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    setPayPrice(userInfo.pay_price);
    if (sessionId && userInfo.isVeriFy != "true") {
      setVerifyStep(VerifySteps.ADD_PAYMENT);
      handleFinishVerifying("stripe");
      const checkoutSessionId = sessionId;
      if (checkoutSessionId) {
        SS_GetProductPaymentDetails(checkoutSessionId);
      }
    }
  }, []);

  useEffect(() => {
    if (verifyStep === VerifySteps.CONFIRM_OTP) {
      let timer = setTimeout(() => {
        if (time > 0) {
          setTime(returnTime(time - 1));
        }
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  });

  const returnTime = (time) => {
    if (time === 0) {
      return "00";
    } else if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  };

  const handleSubmit = () => {
    const ssProduct = document.getElementById("SS_ProductCheckout");
    SS_ProductCheckout();
  };

  function SS_ProductCheckout() {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    const strapiStripe = document.querySelector(
      "#SS_ProductCheckout"
    ) as HTMLElement;
    const productId = strapiStripe?.dataset.id;

    const baseUrl = strapiStripe?.dataset.url || "";
    userInfo.strapiStripeUrl = baseUrl;
    localStorage.setItem("user", JSON.stringify(userInfo));
    const getProductApi = baseUrl + "strapi-stripe/getProduct/" + productId;
    const checkoutSessionUrl = baseUrl + "strapi-stripe/createCheckoutSession/";

    fetch(getProductApi, {
      method: "get",
      // mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        fetch(checkoutSessionUrl, {
          method: "post",
          body: JSON.stringify({
            stripePriceId: response.stripePriceId,
            stripePlanId: response.stripePlanId,
            isSubscription: response.isSubscription,
            productId: response.id,
            productName: response.title,
          }),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.id) {
              router.push(response.url);
            }
          });
      });
  }

  function SS_GetProductPaymentDetails(checkoutSessionId) {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    const baseUrl = userInfo.strapiStripeUrl;
    const retrieveCheckoutSessionUrl =
      baseUrl + "strapi-stripe/retrieveCheckoutSession/" + checkoutSessionId;
    fetch(retrieveCheckoutSessionUrl, {
      method: "get",
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.payment_status === "paid") {
          if (
            window.performance
              .getEntriesByType("navigation")
              .map((nav: any) => nav.type)
              .includes("reload")
          ) {
            console.info("website reloded");
          } else {
            // store payment in strapi
            const stripePaymentUrl = baseUrl + "strapi-stripe/stripePayment";
            fetch(stripePaymentUrl, {
              method: "post",
              body: JSON.stringify({
                txnDate: new Date(),
                transactionId: response.id,
                isTxnSuccessful: true,
                txnMessage: response,
                txnAmount: response.amount_total / 100,
                customerName: response.customer_details.name,
                customerEmail: response.customer_details.email,
                stripeProduct: response.metadata.productId,
              }),
              mode: "cors",
              headers: new Headers({
                "Content-Type": "application/json",
              }),
            }).then(async () => {
              let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
              await bizListingApi.updateBizListing(parseInt(userInfo.biz_id), {
                subscription: response?.subscription,
                customer_id: response.customer,
              });
            });
          }
        }
      });
  }

  const handleRequestOTP = async () => {
    //send OPT
    await AuthApi.otpPhoneGenerate(phoneNumber);
    bizListingApi
      .updateBizListing(parseInt(id), {
        number_verify: phoneNumber,
      })
      .then((res) => {
        setClaimedListing(get(res, "data.data.attributes"));
      });
    setVerifyStep(VerifySteps.CONFIRM_OTP);
  };

  const handleConfirmOTP = async () => {
    //submit otp to check
    if (tier === Tiers.FREE) {
      const result = await AuthApi.otpPhoneConfirm({ otp });
      let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
      if (result.data.success) {
        const result1 = ClaimListingApi.createClaimListing({
          paymentMethod: "free",
          transaction_id: "",
        });
        await bizListingApi.createListingRole({
          bizListingId: id,
          name: user.role,
        });
        setShowResultModal(true);
      } else {
        alert("Wrong OTP");
      }
    } else {
      const result = await AuthApi.otpPhoneConfirm({ otp });
      if (result.data.success) {
        await bizListingApi.createListingRole({
          bizListingId: id,
          name: user.role,
        });
        setVerifyStep(VerifySteps.CONFIRM_EMAIL);
      } else {
        alert("Wrong OTP");
      }
    }
  };

  const handleConfirmEmail = async () => {
    await bizListingApi
      .updateBizListing(parseInt(id), {
        email: email,
      })
      .then((res) => setClaimedListing(get(res, "data.data.attributes")));
    setVerifyStep(VerifySteps.ADD_ID_CARD);
  };

  const handleDirectToStorePage = async () => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    userInfo.isVeriFy = false;
    localStorage.setItem("user", JSON.stringify(userInfo));

    await bizListingApi.getOwnerBizListing().then((res) => {
      const updatedUserInfor = {
        owner_listings: res.data.data,
        avatar: get(claimedListing, "logo[0]"),
        // current_listing_slug: claimedListing.slug,
        user_type: UserTypes.BIZ_USER,
      };
      updateUser(updatedUserInfor);
    });

    if (userInfo.role || userInfo.type_handle) {
      setIsLoading(true);
      const data = await bizListingApi
        .getListingCustom({
          slug: userInfo.current_listing_slug,
        })
        .then((res) => {
          const dataListing = res.data.data[0];
          router.push(
            `/${getListingUrl(
              get(dataListing, "attributes.categories.data[0].attributes.name"),
              get(
                dataListing,
                "attributes.category_links.data[0].attributes.value"
              ),
              get(dataListing, "attributes.slug")
            )}/edit`
          );
        });
    } else {
      router.push(`/`);
    }
  };

  const handleAddIdCard = async () => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    if (frontImageIdentity != "" && backImageIdentity != "") {
      setVerifyStep(VerifySteps.ADD_PAYMENT);
      const userId = userInfo.id;
      bizListingApi.updateBizListing(parseInt(id), {
        provided: type.value,
      });
      if (userId) {
        const result = UserApi.updateUser(parseInt(userId), {
          front_papers_identity: frontImageIdentity,
        });
        const resultTwo = UserApi.updateUser(parseInt(userId), {
          back_papers_identity: backImageIdentity,
        });
      }
    } else {
      alert("Image is required");
    }
  };

  const handleFinishVerifying = async (paymentMethodValue: string) => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    let price = userInfo.pay_price;
    let transaction_id;
    if (router.query.sessionId) {
      transaction_id = router.query.sessionId;
    } else {
      transaction_id = "";
    }
    if (price != null) {
      const nowDay = moment();
      let expiration_date =
        price == "1200" ? nowDay.add(365, "day") : nowDay.add(90, "day");
      const subscribe_plan = price == "1200" ? "annual" : "quarterly";
      await bizListingApi.updateBizListing(parseInt(userInfo.biz_id), {
        expiration_date: expiration_date.format("YYYY-MM-DD") + "T:00:00.000Z",
        subscribe_plan: subscribe_plan,
      });
      const sendMail = EmailApi.paymentSuccess(userInfo.current_listing_slug);
      if (userInfo.type_handle === "Claim") {
        const result = await BizInvoinceApi.createBizInvoice({
          value: parseInt(price),
          paymentMethod: paymentMethodValue,
          transaction_id: transaction_id,
        });
        const result1 = await ClaimListingApi.createClaimListing({
          paymentMethod: paymentMethodValue,
          transaction_id: transaction_id,
        });
      } else {
        if (userInfo.role) {
          const result = await BizInvoinceApi.createBizInvoice({
            value: parseInt(price),
            paymentMethod: paymentMethodValue,
            transaction_id: transaction_id,
          });
          const result1 = await ClaimListingApi.createClaimListing({
            paymentMethod: paymentMethodValue,
            transaction_id: transaction_id,
          });
        } else {
          const result = await BizInvoinceApi.createBizRevisionInvoice({
            value: parseInt(price),
            paymentMethod: paymentMethodValue,
            transaction_id: transaction_id,
          });
          const result1 = await ClaimListingApi.createClaimListingRevision({
            paymentMethod: paymentMethodValue,
            transaction_id: transaction_id,
          });
        }
      }
    }
    userInfo.isVeriFy = true;
    localStorage.setItem("user", JSON.stringify(userInfo));
    setShowResultModal(true);
  };

  const handleUploadFrontImagesIdentity = useCallback((srcImages) => {
    setFrontImageIdentity(srcImages);
  }, []);

  const handleUploadBackImagesIdentity = useCallback((srcImages) => {
    setBackImageIdentity(srcImages);
  }, []);

  const requireOTP = async () => {
    const result = await AuthApi.forgetPasswordByPhone({
      phone_number: phoneNumber,
    });
    setTime(30);
  };

  const CenterIcon = ({ type }) => (
    <div className="flex gap-1 items-center flex-col">
      <Icon icon="plus" size={20} />
      <p>{type}</p>
    </div>
  );

  return (
    <div className={styles.biz_verify}>
      {verifyStep === VerifySteps.REQUEST_OTP && (
        <div className={styles.form}>
          <div className={styles.header}>Enter phone number</div>
          <SelectInput
            defaultValue={{
              select: {
                label: "Singapore",
                value: "+65",
              },
              input: "",
            }}
            width="100%"
            label="Phone number"
            placeholder="your phone number"
            selectPlaceholder="Area code"
            options={formattedAreaCodes}
            shouldControlShowValue
            onChange={(e) => setPhoneNumber(removeZeroInPhoneNumber(e))}
          />
          <Button
            text="Receive OTP"
            onClick={handleRequestOTP}
            disabled={phoneNumber.length >= 10 ? false : true}
          />
        </div>
      )}
      {verifyStep === VerifySteps.CONFIRM_OTP && (
        <div className={styles.form}>
          <div className={styles.header}>Confirm number</div>
          <p>
            An OTP has been sent to the number {phoneNumber} Please enter the
            OTP to complete the registration.
          </p>
          <Input
            placeholder="Enter OTP"
            width="100%"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setOtp(e.target.value)
            }
          />
          <div className="flex justify-between w-full">
            <div className={styles.time}>00:{time}</div>
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
            text="Confirm OTP"
            onClick={handleConfirmOTP}
            disabled={!otp}
          />
        </div>
      )}
      {verifyStep === VerifySteps.CONFIRM_EMAIL && (
        <div className={styles.form}>
          <div className={styles.header}>Email information</div>
          <p>Please confirm your email to receive billing & invoice</p>
          <Input
            placeholder="Enter Email"
            width="100%"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <Button text="Save" onClick={handleConfirmEmail} disabled={!email} />
        </div>
      )}
      {verifyStep === VerifySteps.ADD_ID_CARD && (
        <div className={styles.form}>
          <div className={styles.header}>
            Add ID Card / Driving License photo
          </div>
          <p>We need this to verify the information you’ve provided.</p>
          <div className={styles.field_group}>
            <label>ID Type</label>
            <Select
              value={type}
              options={idTypeOptions}
              className="mt-3"
              placeholder="Driving Licence"
              onChange={(e) => {
                setType(e);
              }}
            />
          </div>
          <div className={styles.field_group}>
            <label>Upload ID card or driver liciense photos</label>
            <div className="w-full flex justify-center gap-10">
              <Upload
                onChange={handleUploadFrontImagesIdentity}
                centerIcon={<CenterIcon type="Front" />}
              />
              <Upload
                onChange={handleUploadBackImagesIdentity}
                centerIcon={<CenterIcon type="Back" />}
              />
            </div>
          </div>
          <div className="flex justify-center gap-5 w-full">
            <Button
              width="30%"
              variant="no-outlined"
              text="Skip"
              onClick={() => setVerifyStep(VerifySteps.ADD_PAYMENT)}
            />
            <Button width="80%" text="Next" onClick={handleAddIdCard} />
          </div>
        </div>
      )}
      {verifyStep === VerifySteps.ADD_PAYMENT && (
        <div className={styles.form}>
          <div className={styles.header}>Payment</div>
          <p>Cancel anytime. Auto renewal.</p>
          <div className={styles.field_group}>
            <div className={styles.price_container}>
              <div className={styles.amount}>Amount</div>
              <div className={styles.price}>
                SGD {payPrice} <p>per quarter</p>
              </div>
            </div>
          </div>
          <div className={styles.field_group}>
            <label>Payment method</label>
            <div className={styles.payment_container}>
              {/* <div
                className={`${styles.payment} ${
                  paymentMethod === "xendit" ? styles.selected : ""
                }`}
                onClick={() => setPaymentMethod("xendit")}
              >
                <Image
                  src={require("public/images/xendit.svg")}
                  width="60px"
                  alt=""
                />
                Xendit
              </div> */}
              <div
                className={`${styles.payment} ${
                  paymentMethod === "stripe" ? styles.selected : ""
                }`}
                onClick={() => setPaymentMethod("stripe")}
              >
                <Image
                  src={require("public/images/stripe.svg")}
                  width="60px"
                  alt="stripe-image"
                />
                Stripe
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-5 w-full">
            <Button
              width="30%"
              variant="no-outlined"
              text="Change tier"
              onClick={() => verifyStep}
            />
            {paymentMethod === "stripe" ? (
              <Button
                width="80%"
                className="css style"
                type="button"
                id="SS_ProductCheckout"
                data-id={payPrice === "1200" ? 2 : 1}
                data-url={baseURL}
                text="Next"
                onClick={handleSubmit}
              />
            ) : (
              <Button
                width="80%"
                type="button"
                text="Next"
                onClick={() => handleFinishVerifying("xendit")}
              />
            )}
          </div>
        </div>
      )}
      <Modal
        transparent
        width={400}
        mobilePosition="center"
        visible={showResultModal}
      >
        <div className={styles.modal}>
          <Image
            src={require("public/images/success-submit.svg")}
            width={100}
            height={100}
            alt="result-alt"
          />
          <div className={styles.header}>First step success!</div>
          <div>
            <p>Your awesome brand is successfully registered.</p>
            <p> Let&rsquo;s fill in some info and get the ball rolling.</p>
          </div>
          <Button
            isLoading={isLoading}
            text="View store page"
            size="small"
            width="70%"
            onClick={handleDirectToStorePage}
          />
        </div>
      </Modal>
    </div>
  );
};

export async function getServerSideProps(context) {
  // Pass data to the page via props
  return {
    props: {
      tier: context.query.tier || Tiers.FREE,
      id: context.query.id || null,
    },
  };
}

export default BizUserVerify;
