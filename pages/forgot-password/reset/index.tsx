import Button from "components/Button/Button";
import Input from "components/Input/Input";
import Modal, { ModalHeader } from "components/Modal/Modal";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { useState } from "react";

import { useForm } from "react-hook-form";

import styles from "styles/Auth.module.scss";

import AuthApi from "../../../services/auth";

interface ResetPasswordProps {
  data: { [key: string]: any };
  onPreview: (data: { [key: string]: any }) => void;
}

const ResetPasswordPage = (props: ResetPasswordProps) => {
  const { data, onPreview } = props;
  const [status, setStatus] = useState<string>("in-progress");
  const router = useRouter();

  const { register, handleSubmit, setValue, getValues } = useForm({});
  const Success = () => {
    return (
      <div className={styles.form_container}>
        <ModalHeader alignTitle="center">Password changed</ModalHeader>
        <div className={styles.body}>
          <div className={styles.instruction}>
            Your password has been successfully changed
          </div>
          <Image
            src={"/icons/change-ps-success.svg"}
            alt="result-alt"
            width={120}
            height={120}
          />
          <Button text="Login" onClick={() => router.push("/login")} />
        </div>
      </div>
    );
  };

  const Failed = () => {
    return (
      <div className={styles.form_container}>
        <ModalHeader alignTitle="center">Changing failed</ModalHeader>
        <div className={styles.body}>
          <div className={styles.instruction}>Changing password failed</div>
          <Button
            text="Try agin"
            onClick={() => router.push("/forgot-password")}
          />
        </div>
      </div>
    );
  };

  const onSubmit = async (data) => {
    if (data.newPasswordValue === data.confirmPasswordValue) {
      let result: any = null;
      let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
      try {
        result = await AuthApi.resetPassword({
          password: data.newPasswordValue,
          passwordConfirm: data.confirmPasswordValue,
          userId: userInfo.id,
        });
        if (result.data.ok) {
          setStatus("success");
        } else {
          alert(result.error.message);
          setStatus("failed");
        }
      } catch (err: any) {
        // TODO: notify error (missing template)
        console.log(err);
        setStatus("failed");
        return false;
      }
    }
  };

  const InProgress = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form_container}>
          <ModalHeader alignTitle="center">Reset password</ModalHeader>
          <div className={styles.body}>
            <Input
              size="large"
              placeholder="New password"
              register={register("newPasswordValue")}
            />
            <Input
              size="large"
              placeholder="Confirm password"
              register={register("confirmPasswordValue")}
            />
            <Button
              type="submit"
              text="Next"
              // onClick={() => setStatus("success")}
            />
          </div>
        </div>
      </form>
    );
  };

  const renderStauts = () => {
    switch (status) {
      case "success":
        return <Success />;
      case "failed":
        return <Failed />;
      default:
        return <InProgress />;
    }
  };

  return <div className={styles.auth}>{renderStauts()}</div>;
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
export default ResetPasswordPage;
