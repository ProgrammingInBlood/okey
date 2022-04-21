import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/pages/onboard/expert.module.scss";
import Link from "next/link";
import { Formik } from "formik";
import { emailValidation } from "../../../validations/schemaValidations";
import { useRouter } from "next/router";
import SignupSideBar from "../../../components/signup-sidebar";
import SideBar from "../../../components/onboard-sidebar/sidebar";
import { useState } from "react";
import Stepper from "../../../components/stepper-modals/stepper";
import StepperExpert from "../../../components/stepper-expert-modals/stepper";

const ExpertBoarding = () => {
  const router = useRouter();

  const [type, setType] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const handleType = (name: any) => {
    setType(name);
  };

  console.log({ currentStep });

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

      <section className={styles.expertbody}>
        <div className="simply-container-fluid">
          <div
            className={` ${styles.height100} simply-row  height100 hidesidebar`}
          >
            <div
              className={` ${styles.expertboardingmainbx}    mobile-p-15 ${
                currentStep >= 7 ? " simply-col-12" : "simply-col-7"
              }`}
            >
              <div className="simply-row justify-content-center">
                <div
                  className={` ${styles.stepperstyleboxouter} simply-col-10`}
                >
                  <div className={styles.stepperstylebox}>
                    <StepperExpert
                      getCurrentStep={(value) => setCurrentStep(value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`simply-col-5   d-flex mobile-align-none  justify-content-center bg-grey sm-d-none ${
                currentStep >= 7 ? "add-d-none" : ""
              }`}
            >
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
};

export default ExpertBoarding;
