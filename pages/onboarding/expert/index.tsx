import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/pages/onboard/expert.module.scss";
import SideBar from "../../../components/onboard-sidebar/sidebar";
import { useRouter } from "next/router";

function Expert() {
  const router = useRouter();
  return (
    <div className={styles.warreper}>
      <Head>
        <title>Simply Start - Signup </title>
        <meta
          name="description"
          content="The professional playground for entrepreneurs, investors and experts."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={styles.onboardingstyle}>
        <div className="simply-container-fluid">
          <div className="simply-row  height100">
            <div className="simply-col-7   mobile-p-15">
              <div className="simply-row justify-content-center">
                <div
                  className={`${styles.stepperstyleboxouter1} simply-col-10  stepperstyleboxouter`}
                >
                  <div className={styles.exertmainbox}>
                    <h1>
                      Apply to become a Simply Start certified business expert
                    </h1>

                    <ul className={styles.iconwithtextlist}>
                      <li>
                        <div className={styles.iconbox}>
                          <Image
                            src="/svg/growth-icon.svg"
                            width={32}
                            height={32}
                          />
                        </div>
                        <div className={styles.textbox}>
                          Grow your professional brand with direct access to
                          global Entrepreneurs
                        </div>
                      </li>
                      <li>
                        <div className={styles.iconbox}>
                          <Image
                            src="/svg/growth-icon.svg"
                            width={32}
                            height={32}
                          />
                        </div>
                        <div className={styles.textbox}>
                          Expand your network and collaborate with industry
                          peers
                        </div>
                      </li>
                    </ul>

                    <div className={styles.boxwithbgtext}>
                      <h2>Are you qualified?</h2>
                      <ul className={styles.iconwithtextlistcheck}>
                        <li>
                          <div className={styles.iconbox}>
                            <Image
                              src="/svg/check.svg"
                              width={17}
                              height={13}
                            />
                          </div>
                          <div className={styles.textbox}>
                            <p>
                              Have been a Marketing Director in more than one
                              company with P&L responsibility and a demonstrable
                              track record of success.
                            </p>
                          </div>
                        </li>

                        <li>
                          <div className={styles.iconbox}>
                            <Image
                              src="/svg/check.svg"
                              width={17}
                              height={13}
                            />
                          </div>
                          <div className={styles.textbox}>
                            <p>
                              Have experience across several business sectors.
                            </p>
                          </div>
                        </li>

                        <li>
                          <div className={styles.iconbox}>
                            <Image
                              src="/svg/check.svg"
                              width={17}
                              height={13}
                            />
                          </div>
                          <div className={styles.textbox}>
                            <p>
                              Have experience and enjoy working with small and
                              mid-size businesses and the constraints on budget
                              and resources this brings.
                            </p>
                          </div>
                        </li>

                        <li>
                          <div className={styles.iconbox}>
                            <Image
                              src="/svg/check.svg"
                              width={17}
                              height={13}
                            />
                          </div>
                          <div className={styles.textbox}>
                            <p>Be committed to pursuing a portfolio career.</p>
                          </div>
                        </li>

                        <li>
                          <div className={styles.iconbox}>
                            <Image
                              src="/svg/check.svg"
                              width={17}
                              height={13}
                            />
                          </div>
                          <div className={styles.textbox}>
                            <p>
                              Be prepared to get actively involved with The
                              Marketing Centre - this is not a passive
                              consultancy roster.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="btnstyle">
                      <button 
                        className={styles.getstarted}
                        onClick={() =>
                          router.push("/onboarding/expert/expert-bording")
                        }
                      >
                        Get started
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="simply-col-5 d-flex mobile-align-none   justify-content-center bg-grey sm-d-none">
              <div className={styles.onrightbox}>
                <SideBar
                  image="/svg/avtarnew.svg"
                  name="Melissa Hardy"
                  type="Entrepreneur"
                  description="“Simply Start experts helped me grow my business 25% year on year”"
                  details={[
                    {
                      title: 4251,
                      description:
                        "Entrepreneurs waiting for your expertise to help you grow their businesses",
                    },
                    {
                      title: "$12000",
                      description: "You could be earning through Simply Start ",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Expert;
