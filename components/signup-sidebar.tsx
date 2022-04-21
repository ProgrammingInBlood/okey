import Image from "next/image"
import styles from './signupSidebar.module.scss'

interface pageprops {
    headings:string;
    image: string;
}

const SignupSideBar = ({headings,image}:pageprops) => {
    return(
        <div className={styles.signupright}>
        <div className={styles.text_box}>
          <h3 className={styles.h3_heading}>
        {headings}
          </h3>
          <Image
            src={ image ? image :"/svg/create-right-image.svg"}
            width={340}
            height={340}
          />
        </div>
      </div>
    )
}

export default SignupSideBar;