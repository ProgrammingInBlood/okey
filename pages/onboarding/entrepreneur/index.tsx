import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/pages/onboard/Investor.module.scss";
import Link from "next/link";
import { Formik } from "formik";
import { emailValidation } from "../../../validations/schemaValidations";
import { useRouter } from "next/router";
import SignupSideBar from "../../../components/signup-sidebar";
import SideBar from "../../../components/onboard-sidebar/sidebar";
import { useState } from "react";
import Stepper from "../../../components/stepper-modals/stepper";

const Entrepreneur = () => {
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
            <div className="simply-col-7   mobile-p-15">
              <div className="simply-row justify-content-center">
                <div className="simply-col-10 stepperstyleboxouter">
                  <div className={styles.stepperstylebox}>
                    {/* <h1 className={styles.mainheading}>Investor</h1>

                    
                    

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
                    </div> */}
                    <Stepper />
                  </div>
                </div>
              </div>
            </div>
            <div className="simply-col-5 d-flex mobile-align-none  justify-content-center bg-grey sm-d-none">
              <div className={styles.onrightbox}>
                <SideBar
                  image="/svg/avtarnew.svg"
                  name="Melissa Hardy"
                  type="Investor"
                  description="“I’ve invested $3 million in 4 startups on Simply Start”"
                  details={[
                    {
                      title: 324,
                      description:
                        "Investors & experts waiting to help you grow your business",
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

export default Entrepreneur;
