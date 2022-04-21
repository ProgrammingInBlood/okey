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

const RegistrationComplete = () => {
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
                    <h1 className={styles.mainheading}>Registration complete!</h1>

                

                    

                    <button
                              type="submit"
                              className=""
                            >
                              Login
                            </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="simply-col-5 d-flex mobile-align-none align-items-center justify-content-center bg-grey sm-d-none">
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

export default RegistrationComplete;
