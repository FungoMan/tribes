import Button from "components/Button/Button"
import Input from "components/Input/Input"
import styles from "./TabContent.module.scss"
import { useState, useEffect } from "react"
import AuthApi from "services/auth"
import { useForm } from "react-hook-form";

const ChangePassword = () => {

  const { register, handleSubmit, setValue, getValues } = useForm({});
  const error = {
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  }
  const [isError, setIsError] = useState<any>({})
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const onSubmit = async (data) => {
    if (data.newPassword.length < 6) {
      setIsError({
        oldPassword: '',
        newPasswordError: 'Password must contains at least 6 charaters',
        confirmPassword: ''
      })
      setIsSuccess(false)
      return
    }
    if (data.newPassword !== data.cofirmPassword) {
      setIsSuccess(false)
      setIsError({
        oldPassword: '',
        newPasswordError: '',
        confirmPassword: 'Your password and confirmation password do not match.'
      })
      return
    }
    const sendData = await AuthApi.resetPasswordByOldPassword({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword
    })
    if (sendData.data.error) {
      setIsError({
        oldPassword: 'Your current password is not correct',
        newPasswordError: '',
        confirmPassword: ''
      })
      setIsSuccess(false)
      return
    }
    setIsSuccess(true)
    setIsError('')
  };

  return (
    <div className={styles.tab_content_container}>
      <h2 className={styles.title}>Change password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form_group}>
          <Input 
            success={isSuccess ? 'Change password success' : ''}
            placeholder="Old password" type="password" size="large"
            register={register("oldPassword")}
            error={isError.oldPassword}
          />
        </div>
        <div className={styles.form_group}>
          <Input 
            placeholder="New password" type="password" size="large"
            register={register("newPassword")}
            error={isError.newPasswordError}
          />
        </div>
        <div className={styles.form_group}>
          <Input 
            placeholder="Confirm new password" type="password" size="large"
            register={register("cofirmPassword")}
            error={isError.confirmPassword}
          />
        </div>
        <Button type="submit" text="Save" size="large" className="w-full lg:max-w-max ml-auto text-sm"/>
      </form>
    </div>
  )
}

export default ChangePassword