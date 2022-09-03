import { UrlObject } from "url";
import Link from "next/link";
import Icon from "components/Icon/Icon";
import styles from "./CompleteProfileCard.module.scss";
import { useContext, useEffect, useState } from "react";
import { UserInforContext } from "Context/UserInforContext";
import { calcProgressuser } from "utils";

interface ProgressCompleteProps {
  stepCurrent?: number;
  stepCompleted?: number;
}

const ProgressComplete = (props: ProgressCompleteProps) => {
  const { stepCurrent = 0, stepCompleted = 5 } = props;

  const formatValueProgress = (): string => {
    return (stepCurrent * 100) / stepCompleted + "%";
  };

  return (
    <div className={styles.progress}>
      <div
        className={styles.progress_completed}
        style={{ width: formatValueProgress() }}
      ></div>
    </div>
  );
};

export interface CompleteProfileCardProps extends ProgressCompleteProps {
  className?: string;
  icon?: string;
  onClick?: () => void;
}

const CompleteProfileCard = (props: CompleteProfileCardProps) => {
  const { className = "", onClick, icon } = props;

  const stepCompleted = 9;

  const { user } = useContext(UserInforContext);

  const stepCurrent = calcProgressuser(user);

  return (
    <div className={`${className} ${styles.card}`}>
      <ProgressComplete
        stepCurrent={stepCurrent}
        stepCompleted={stepCompleted}
      />
      <div className="flex items-center">
        {icon && <Icon icon={icon} className="mr-4" />}
        <div className={styles.note_cta}>
          {stepCurrent !== stepCompleted ? (
            <div>
              <span>
                {!icon && "👏"} {`${stepCurrent}/${stepCompleted} `} steps to
                complete your profile!
              </span>
              {onClick && (
                <span>
                  <a onClick={onClick}>Complete it.</a>
                </span>
              )}
            </div>
          ) : (
            "Congratulations. Your profile has been completed."
          )}
        </div>
      </div>
    </div>
  );
};

export default CompleteProfileCard;
