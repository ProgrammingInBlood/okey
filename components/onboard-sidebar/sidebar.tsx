import Image from "next/image";
import { Key, ReactChild, ReactFragment, ReactPortal } from "react";
import styles from "./sidebar.module.scss";

interface pageprops {
  image: string;
  name: string;
  type: string;
  description: string;
  details: any;
}

const SideBar = ({ image, name, type, description, details }: pageprops) => {
  return (
    <div className={styles.signupright}>
      <div className={styles.onboardrightimg}>
        <div className="useravtarimg">
          <Image
            src={image}
            width={86}
            height={86}
            className={styles.avatarimg}
          />
        </div>
      </div>
      <div className={styles.text_box}>
        <p className="text_blue">
          <b>{name}</b>
          <br />
          {type}
        </p>
        <p>{description}</p>
      </div>

      <div className="brline mt-3 mb-3"></div>

      <div className={styles.details}>
        {details?.map(
          (
            detail: { title: string; description: string },
            index: Key | null | undefined
          ) => {
            return (
              <div className={styles.detailsItem} key={index}>
                <span className={styles.big_text}>{detail?.title}</span>
                <p>{detail?.description}</p>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default SideBar;
