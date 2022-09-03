import classNames from "classnames";
import styles from "./Question.module.scss";

const Question = (props) => {
  const {
    show = true,
    childrenClassName,
    optional,
    question,
    instruction,
    children,
  } = props;
  if (!show) {
    return null;
  }

  const childrenClassNames = classNames(styles.children, childrenClassName);
  return (
    <div>
      <div className={styles.question_container}>
        <h3>
          <span className={styles.question}>{question}</span>
          {optional && (
            <span className={styles.optional}>&nbsp;(optional)</span>
          )}
        </h3>
        <div className={styles.instruction}>{instruction}</div>
      </div>
      <div className={childrenClassNames}>{children}</div>
    </div>
  );
};

export default Question;
