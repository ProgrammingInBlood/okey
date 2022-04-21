import Head from "next/head";
import Image from "next/image";
import SignupSideBar from "../../../components/signup-sidebar";
import styles from "../../../styles/pages/verification.module.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GetServerSidePropsContext } from "next";

interface pageprops {
  email: string;
  name: string;
}
const Verification = ({ email, name }: pageprops) => {
  const router = useRouter();

  useEffect(() => {
    if (!email || !name) {
      router.push("/");
    }
  }, [email, name, router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Simply Start - Create Your Account </title>
        <meta
          name="description"
          content="Join our community of 19,000 entrepreneurs, investors & experts."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="wepperwrappersignup">
        <div className="simply-container-fluid">
          <section className="simply-box-signup-page">
            <div className="simply-row height100">
              <div
                className={`${styles.signupboxleft} simply-col-8  d-flex justify-content-end`}
              >
                <div className={`${styles.signupboxinnerbox} simply-col-8`}>
                  <div className="signup-box-inner">
                    <div className={styles.logosection}>
                      <Image
                        src="/svg/main-logo.svg"
                        width={180}
                        height={45}
                        className={styles.logoimg}
                      />
                      <h1 className={styles.heading}>Thanks!</h1>
                      <p className={styles.checkmailtext}>Check your email</p>
                      <p>
                        Hi {name}! Your verification code has been sent to the
                        following email address:
                      </p>
                      <p style={{ fontWeight: 500 }}>{email}</p>
                      <p>
                        Enter the code below to verify your email and start to
                        build your Simply Start profile
                      </p>
                    </div>
                    {/* Photo part start */}
                    {/* Photo part end */}

                    <div className={styles.formsignup}>
                      <div className={styles.otpbox}>
                        <input
                          type="password"
                          name="otp"
                          className={styles.otpinput}
                          placeholder=" X X X X"
                        />
                      </div>

                      <p className={styles.verification_email}>
                        {" "}
                        <a href="#">Resend verification email</a>{" "}
                      </p>

                      <button type="submit" className={styles.otpbutton}>
                        Confirm & continue
                      </button>
                    </div>

                    <div className={styles.alreadysignup}>
                      <p>Questions or didin&apos;t receive an email?</p>
                      <p>
                        <a href="#">Contact us</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.signuprightsection} bg-grey`}>
                <SignupSideBar headings="" image="/svg/thanku.svg" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Verification;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const { email, name } = query;

  if (!email || !name) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      email: email,
      name: name,
    },
  };
}
