import Badge from "components/Badge/Badge";
import styles from "./PreviewValue.module.scss";

const PreviewValue = ({
  valueKey,
  value,
}: {
  valueKey: string;
  value: any;
}) => {
  let result = <div></div>;
  if (valueKey === "openHours") {
    return (
      <div>
        {Array.isArray(value) &&
          value.map((day) => {
            const openHours = day.twentyFourHours
              ? "All day"
              : day.openHours?.length === 0
              ? "Closed"
              : day.openHours?.map((hour) => (
                  <div key={hour.id}>
                    {hour.from} - {hour.to}
                  </div>
                ));
            return (
              <div key={day.name} className={styles.open_hours_container}>
                <div className={styles.day_name}>{day.name}</div>
                <div className={styles.open_hour}>{openHours}</div>
              </div>
            );
          })}
      </div>
    );
  }
  if (valueKey === "tags") {
    return (
      <div className={styles.preview}>
        {Array.isArray(value) &&
          value.map((item) => (
            <Badge variant="no-outlined" key={item.value}>
              {item.label}
            </Badge>
          ))}
      </div>
    );
  }
  if (typeof value === "string") {
    return <div className={styles.preview_value}>{value}</div>;
  }
  return result;
};

export default PreviewValue;
