import Checkbox from "components/Checkbox/Checkbox";
import styles from "./OnboardChecklist.module.scss";

const OnboardChecklist = () => {
  const checklist = [
    { label: "Add profile photo" },
    { label: "Add open time" },
    { label: "Add at least 1 photos of your business" },
    { label: "Add price range" },
    { label: "Add social page" },
  ];
  return (
    <div className={styles.onboard_checklist}>
      <div className={styles.onboard_checklist_header}>
        <div className={styles.onboard_checklist_header_title}>Onboarding Checklist</div>
        <div className={styles.onboard_checklist_header_progress}>60% to finish your profile</div>
      </div>
      <div className={styles.progress_bar} />
      <div className={styles.checkbox_container}>
        {checklist.map((item) => (
          <Checkbox
            key={item.label}
            className={styles.checkbox}
            label={item.label}
            value={item.label}
          />
        ))}
      </div>
    </div>
  );
};

export default OnboardChecklist;
