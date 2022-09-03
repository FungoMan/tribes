import Icon from "components/Icon/Icon";
import Rating, { RatingComponentProps } from "react-rating";
import styles from "./Rate.module.scss";

interface RateComponentProps extends RatingComponentProps {
  className?: string;
}

const Rate = (props: RateComponentProps) => {
  const {
    className = "",
    start,
    stop,
    initialRating,
    step,
    fractions,
    readonly = true,
    placeholderRating,
    quiet,
    direction,
    emptySymbol,
    fullSymbol,
    placeholderSymbol,
    onChange,
    onClick,
    onHover,
  } = props;

  const _emptySymbol = <Icon icon="star" color="#e60112" />;
  const _fullSymbol = <Icon icon="red-star" color="#e60112" />;

  return (
    <div className={`${styles.rating_container} ${className}`}>
      {
        // @ts-ignore
        <Rating
          initialRating={initialRating}
          readonly={readonly}
          start={start}
          stop={stop}
          step={step}
          fractions={fractions}
          placeholderRating={placeholderRating}
          quiet={quiet}
          direction={direction}
          emptySymbol={emptySymbol || _emptySymbol}
          fullSymbol={fullSymbol || _fullSymbol}
          placeholderSymbol={placeholderSymbol || _emptySymbol}
          onChange={onChange}
          onClick={onClick}
          onHover={onHover}
        />
      }
    </div>
  );
};

export default Rate;
