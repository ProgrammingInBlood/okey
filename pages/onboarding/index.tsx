import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/pages/onboard/First.module.scss";
import Link from "next/link";
import { Formik } from "formik";
import { emailValidation } from "../../validations/schemaValidations";
import { useRouter } from "next/router";
import SignupSideBar from "../../components/signup-sidebar";
import SideBar from "../../components/onboard-sidebar/sidebar";
import { useState } from "react";

const OnboardingFirst = () => {
  const router = useRouter();

  const [type, setType] = useState("");

  const handleType = (name: any) => {
    setType(name);
  };

  interface componentType {
    UserType: string;
  }
  const TypeComponent = ({ UserType }: componentType) => {
    return (
      <div
        style={{
          display: type === UserType ? "block" : "none",
        }}
      >
        <Image src="/svg/tick.svg" width={15} height={15} />
      </div>
    );
  };

  const handleSubmit = () => {
    if (type === "expert") {
      router.push("/onboarding/expert");
    } else if (type === "entrepreneur") {
      router.push("/onboarding/entrepreneur");
    } else if (type === "investor") {
      router.push("/onboarding/investor");
    }
  };

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
            <div className="simply-col-7 mobile-p-15 d-flex align-items-center tab-align-none justify-content-center">
              <div className="simply-row justify-content-center">
                <div className="simply-col-9 ">
                  <div className={styles.onbordingstylebox}>
                    <h1 className={styles.mainheading}>I am...</h1>

                    <ul className={styles.mainbox1}>
                      <li>
                        <div
                          className={styles.boxi}
                          onClick={() => handleType("entrepreneur")}
                          style={{borderColor:type==='entrepreneur'?'#1D99F2':"#DADADA"}}
                        >
                          <span className={styles.contentType}>
                            <div className={styles.iconbox}>
                              <Image
                                src="/svg/Union.svg"
                                width={32}
                                height={32}
                              />
                            </div>
                            <p> An Entrepreneur</p>
                          </span>
                          <TypeComponent UserType="entrepreneur" />
                        </div>
                        <p>
                          I’m an entrepreneur seeking a community, investment or
                          help from various vetted experts.
                        </p>
                      </li>

                      <li>
                        <div
                          className={styles.boxi}
                          onClick={() => handleType("expert")}
                          style={{borderColor:type==='expert'?'#1D99F2':"#DADADA"}}
                        >
                          <span className={styles.contentType}>
                            <div className={styles.iconbox}>
                              <Image
                                src="/svg/Expert-icon.svg"
                                width={32}
                                height={32}
                              />
                            </div>
                            <p>An Expert</p>
                          </span>
                          <TypeComponent UserType="expert" />
                        </div>
                        <p>
                          I consider myself a mentor, board advisor or expert in
                          one or more business related field.
                        </p>
                      </li>

                      <li>
                        <div
                          className={styles.boxi}
                          onClick={() => handleType("investor")}
                          style={{borderColor:type==='investor'?'#1D99F2':"#DADADA"}}
                        >
                          <span className={styles.contentType}>
                            <div className={styles.iconbox}>
                              <Image
                                src="/svg/Investor-icon.svg"
                                width={32}
                                height={32}
                              />
                            </div>
                            <p>An Investor</p>
                          </span>
                          <TypeComponent UserType="investor" />
                        </div>
                        <p>
                          I’m an investor looking to invest in startups and
                          entrepreneurs through the Simply Start platform.
                        </p>
                      </li>
                    </ul>

                    

                    <div className={`${styles.onbordfooter} simply-row `}>
                    <div className={`${styles.brline} mt-3 mb-3 sm-d-none`}></div>
                      <div className="simply-col-12 d-flex bottomsection justify-content-end">
                        <button className="blueborderbtn smbtn">Back</button>{" "}
                        <button
                          className={`bluebgbtn ${
                            type ? "smactivebtn" : "smbtn"
                          }`}
                          disabled={!type}
                          onClick={handleSubmit}
                        >
                          Next
                        </button>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="simply-col-5 d-flex mobile-align-none  justify-content-center bg-grey sm-d-none">
              <div className={styles.onrightbox}>
                <SideBar
                  image="/svg/avtarnew.svg"
                  name="Melissa Hardy"
                  type="Business Coach"
                  description="“I’ve helped 20 businesses get investor-ready on Simply Start”"
                  details={[
                    {
                      title: 324,
                      description:
                        "Investors & business coaches ready to help you grow",
                    },
                    { title: "$25m", description: "investment available" },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnboardingFirst;
