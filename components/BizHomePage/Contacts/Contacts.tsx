import Heading from "components/Heading/Heading";
import Icon from "components/Icon/Icon";
import Image from "next/image";
import styles from "./Contacts.module.scss";

interface ContactProps {
  email?: string;
  websiteUrl?: string;
  twitterUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
}

const Contacts = (props: ContactProps) => {
  const { email, websiteUrl, twitterUrl, facebookUrl, instagramUrl } = props;

  return (
    <div className="">
      <Heading text="Links" />
      <div className={styles.social_link_container}>
        {email && (
          <div className={styles.social_link}>
            <div className={styles.social_link_title}>
              <Icon icon="email-color" /> Email
            </div>
            <div
              className="flex items-center"
              onClick={() => window.open(`mailto:${websiteUrl}`)}
            >
              <a>{email}</a>
            </div>
          </div>
        )}
        {websiteUrl && (
          <div className={styles.social_link}>
            <div className={styles.social_link_title}>
              <Icon icon="web-color" /> Website
            </div>
            <div
              className="flex items-center"
              onClick={() => window.open(`${websiteUrl}`)}
            >
              <a>{websiteUrl}</a>
            </div>
          </div>
        )}
        <div className={styles.social_link}>
          {(twitterUrl || facebookUrl || instagramUrl) && (
            <div className={styles.social_link_title}>
              <Icon icon="socials-color" /> Socials
            </div>
          )}
          <div className="flex gap-5">
            {twitterUrl && (
              <div onClick={() => window.open(`${twitterUrl}`)}>
                <Icon icon="twitter-logo" size={20} className={styles.icon} />
              </div>
            )}
            {facebookUrl && (
              <div onClick={() => window.open(`${facebookUrl}`)}>
                <Icon icon="facebook-color" size={20} className={styles.icon} />
              </div>
            )}
            {instagramUrl && (
              <div
                onClick={() => window.open(`${instagramUrl}`)}
                className={styles.icon}
              >
                <Image
                  src={require("/public/icons/instagram-color.svg")}
                  alt="instagram"
                  width={30}
                  height={30}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
