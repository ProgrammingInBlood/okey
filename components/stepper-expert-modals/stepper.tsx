import React, { Ref, useEffect, useRef, useState } from "react";
import AccordionItem from "../accordian-expert-bording/accordianItem";
import styles from "./stepperexpert.module.scss";
import Dropdown from "../dropdown-with-search-box/dropdown";
import IndustryDropdown from "../industry-dropdown/dropdown";
import Image from "next/image";
import TickMark from "../svg-icons/TickMark";
import { useRouter } from "next/router";
import { Formik, Field, Form, FieldArray, FormikValues } from "formik";
import {
  areaOfExpertiseValidation,
  checkDimensions,
  yourCompanyValidation,
} from "../../validations/expertboarding";
import FirstScreen from "./screens/first";
import SecondScreen from "./screens/second";
import ThirdScreen from "./screens/third";
import FourthScreen from "./screens/fourth";
import FifthScreen from "./screens/fifth";

const FIRST_STEP = 2; //previously it was 3
const SECOND_STEP = 8;
const THIRD_STEP = 13;
const FOURTH_STEP = 18;
const FIFTH_STEP = 23;

interface pageprops {
  getCurrentStep: (arg: number) => void;
}

const StepperExpert = ({ getCurrentStep }: pageprops) => {
  const router = useRouter();
  const tabs: Ref<HTMLDivElement> = useRef(null);
  const tabStatus: Ref<HTMLDivElement> = useRef(null);
  const logoAttachment: Ref<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const [selectedItem, setSelectedItem] = useState<any>({});
  const [selectedItem2, setSelectedItem2] = useState<any>({});
  const [showOtherInput, setShowOtherInput] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isNext, setIsNext] = useState<boolean>(false);
  const [accordiansValue, setAccordiansValue] = useState<any>([
    false,
    false,
    false,
    false,
  ]);

  const [registeredOrganisation, setRegisteredOrganisation] =
    useState<string>("");

  //YOUR COMPANY DETAILS STEP
  const [expertiseItems, setExpertiseItems] = useState<any>([
    { name: "Development & IT", id: 2, selected: false },
    { name: "Design & Creative", id: 3, selected: false },
    { name: "Sales & Marketing", id: 4, selected: false },
    { name: "Writing & Translation", id: 5, selected: false },
    { name: "Admin & Customer Support", id: 6, selected: false },
    { name: "Finance & Accounting", id: 7, selected: false },
    { name: "HR & Training", id: 8, selected: false },
    { name: "Legal", id: 9, selected: false },
    { name: "E-Commerce", id: 10, selected: false },
    { name: "Other (please specify)", id: 11, selected: false },
  ]);

  useEffect(() => {
    getCurrentStep(currentStep);
  }, [currentStep]);

  //Setting Initial Step ClassName onLoad
  useEffect(() => {
    const children = tabs?.current?.children;
    children?.[currentStep]?.classList.add(styles.hidden);

    const statusChildren = tabStatus?.current?.children;
    statusChildren?.[currentStep]?.classList.add(styles.stepActive);
  }, [tabs]);

  //Adding ClassName to the current tab and removing from the rest
  const handleClick = (index: number) => {
    console.log({ currentStep, registeredOrganisation });
    if (
      currentStep === 1 &&
      (registeredOrganisation == "Individual" || registeredOrganisation == "")
    ) {
      index = index + 1;
    }
    if (
      currentStep === 3 &&
      (registeredOrganisation == "Individual" ||
        registeredOrganisation == "") &&
      index < currentStep
    ) {
      index = index - 1;
    }

    const children = tabs?.current?.children;
    children?.[currentStep]?.classList.remove(styles.hidden);
    children?.[index]?.classList.add(styles.hidden);

    const statusChildren = tabStatus?.current?.children;

    let status = 0;
    let oldStatus = 0;

    if (FIRST_STEP >= index) {
      status = 0;
    } else if (SECOND_STEP >= index) {
      status = 1;
    } else if (THIRD_STEP >= index) {
      status = 2;
    } else if (FOURTH_STEP >= index) {
      status = 3;
    } else if (FIFTH_STEP >= index) {
      status = 4;
    }

    if (FIRST_STEP >= currentStep) {
      oldStatus = 0;
    } else if (SECOND_STEP >= currentStep) {
      oldStatus = 1;
    } else if (THIRD_STEP >= currentStep) {
      oldStatus = 2;
    } else if (FOURTH_STEP >= currentStep) {
      oldStatus = 3;
    } else if (FIFTH_STEP >= currentStep) {
      oldStatus = 4;
    }

    if (status < oldStatus) {
      statusChildren?.[oldStatus]?.classList.remove(styles.stepActive);
    } else {
      statusChildren?.[status]?.classList.add(styles.stepActive);
    }

    setCurrentStep(index);
  };

  const handleAccordianValue = (value: any, index: any) => {
    const newAccordiansValue = [...accordiansValue];
    if (value) {
      for (let i = 0; i < newAccordiansValue.length; i++) {
        if (i !== index) {
          newAccordiansValue[i] = false;
        }
      }
      newAccordiansValue[index] = value;

      setAccordiansValue(newAccordiansValue);
    } else {
      newAccordiansValue[index] = value;
      setAccordiansValue(newAccordiansValue);
    }
  };

  const faqs = [
    {
      question: "Mentor",
      answer:
        "I am a business mentor with multiple case studies to show my abilities in mentoring.",
    },
    {
      question: "Board advisor",
      answer:
        "I have demonstrable experience advising startups of best practices and driving growth.",
    },
    {
      question: "Business coach",
      answer:
        "I have coached at least 3 businesses in the last 10 years and can demonstrate growth.",
    },
    {
      question: "Life coach",
      answer:
        "I coach individuals on general welfare and life events that may arise building a startup.",
    },
  ];

  useEffect(() => {
    if (
      selectedItem.name === "Other (please specify)" ||
      selectedItem2.name === "Other (please specify)"
    ) {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
    }
  }, [selectedItem.name, selectedItem2.name]);

  //VALIDATIONS
  //onChange to set validation to the current step
  useEffect(() => {
    if (accordiansValue.includes(true) && currentStep === 0) {
      setIsNext(true);
    } else if (registeredOrganisation && currentStep === 1) {
      setIsNext(true);
    } else if (currentStep === 2) {
      setIsNext(true);
    } else {
      setIsNext(false);
    }
  }, [
    accordiansValue,
    selectedItem,
    selectedItem2,
    currentStep,
    registeredOrganisation,
  ]);

  const handleRegisteredOrg = (value: any) => {
    if (value) {
      setRegisteredOrganisation(value);
    }
  };

  return (
    <div className={styles.card}>
      {/* currentStep: {currentStep} */}
      <div className={styles["card-header"]}>
        <div className={styles.steps} ref={tabStatus}>
          <div className={styles.stepBox}>
            <TickMark color={currentStep >= FIRST_STEP ? "#00A8E8" : "#fff"} />

            <div className={styles.step}></div>
          </div>
          <div className={styles.stepBox}>
            <TickMark color={currentStep >= SECOND_STEP ? "#00A8E8" : "#fff"} />

            <div className={styles.step}>
              <span></span>
            </div>
          </div>
          <div className={styles.stepBox}>
            <TickMark color={currentStep >= THIRD_STEP ? "#00A8E8" : "#fff"} />

            <div className={styles.step}>
              <span></span>
            </div>
          </div>
          <div className={styles.stepBox}>
            <TickMark color={currentStep >= FOURTH_STEP ? "#00A8E8" : "#fff"} />

            <div className={styles.step}>
              <span></span>
            </div>
          </div>
          <div className={styles.stepBox}>
            <TickMark color={currentStep >= FIFTH_STEP ? "#00A8E8" : "#fff"} />

            <div className={styles.step}>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <div id="cardBody" className={styles["card-body"]}>
        <div className={styles.tabs} ref={tabs}>
          {/* FIRST SCREEN START*/}
          <FirstScreen
            faqs={faqs}
            handleState={(value) => console.log(value)}
            isNext={(value) => setIsNext(value)}
          />
          {/* FIRST SCREEN END*/}
          {/* SECOND SCREEN START*/}
          <SecondScreen
            handleState={(value) => console.log(value)}
            isNext={(value) => setIsNext(value)}
          />
          {/* SECOND SCREEN END*/}
          {/* THIRD SCREEN START*/}
          <ThirdScreen
            handleState={(value) => console.log(value)}
            isNext={(value) => setIsNext(value)}
          />
          {/* THIRD SCREEN END */}

          {/* FOURTH SCREEN START */}

          <FourthScreen
            handleState={(value) => console.log(value)}
            isNext={(value) => setIsNext(value)}
          />
          {/* FOURTH SCREEN END */}

          {/* FIFTH SCREEN START */}
          <FifthScreen
            handleState={(value) => console.log(value)}
            isNext={(value) => setIsNext(value)}
          />

          {/* FIFTH SCREEN END */}

          {/* SIXTH SCREEN START */}

          <div id="six" className={styles.tab}>
            <div className="stepperbox">
              <h3 className={styles.stepperheading}>
                Based on your experience, how many sessions do you believe you
                could manage on a weekly basis?
              </h3>
              <div className={styles.boxcli}>
                <ul className={styles.boxcliulstyle}>
                  <li>1 - 5</li>
                  <li>5 - 10</li>
                  <li>10 - 20</li>
                  <li>20+</li>
                </ul>
              </div>
            </div>
          </div>

          {/* SIXTH SCREEN END */}

          {/* SEVENTH SCREEN START */}
          <div id="seven" className={styles.tab}>
            <div className="stepperbox">
              <h3 className={styles.stepperheading}>
                How much do you charge for your time?
              </h3>

              <div className="steperform">
                <Formik
                  initialValues={{
                    companyName: "",
                    companyWebsite: "",
                    numberOFEmployees: "",
                    linkedIn: "",
                    attachment: null,
                    preview: "",
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    router.push(
                      {
                        pathname: "/auth/signup/create",
                        query: {
                          email: values.companyName,
                        },
                      },
                      "/auth/signup/create"
                    );
                    setSubmitting(false);
                  }}
                  validationSchema={yourCompanyValidation}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting,
                    isValid,
                    dirty,
                    /* and other goodies */
                  }) => {
                    if (currentStep === 2) {
                      setIsNext(isValid && dirty);
                    }

                    return (
                      <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
                        <div className={styles.inputBox}>
                          <label className={styles.label}>
                            Your hourly rate
                          </label>
                          <input
                            className={styles.input}
                            name="companyName"
                            type="text"
                            placeholder="£"
                            value={values.companyName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <span className="validation-error">
                            {errors.companyName &&
                              touched.companyName &&
                              errors.companyName}
                          </span>
                        </div>
                        <div className={styles.inputBox}>
                          <label className={styles.label}>
                            Your daily rate (8 hours per day)
                          </label>
                          <input
                            className={styles.input}
                            type="text"
                            name="companyWebsite"
                            placeholder="£"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.companyWebsite}
                          />
                          <span className="validation-error">
                            {errors.companyWebsite &&
                              touched.companyWebsite &&
                              errors.companyWebsite}
                          </span>
                        </div>
                        <div className={styles.inputBox}>
                          <label className={styles.label}>
                            Your monthly rate
                          </label>
                          <input
                            className={styles.input}
                            type="text"
                            name="numberOFEmployees"
                            placeholder="£"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.numberOFEmployees}
                          />
                          <span className="validation-error">
                            {errors.numberOFEmployees &&
                              touched.numberOFEmployees &&
                              errors.numberOFEmployees}
                          </span>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>

          {/* SEVENTH SCREEN END */}

          {/* EIGHTH SCREEN START */}

          <div id="eight" className={styles.tab}>
            <div className={` ${styles.thankusteeper} `}>
              <div className="simply-col-12">
                <div className="simply-row">
                  <div className="simply-col-6 d-flex justify-content-center  align-items-center">
                    <div className={styles.boxgy1}>
                      <Image
                        src="/svg/live-collaboration-rafiki.svg"
                        width={422}
                        height={422}
                      />
                    </div>
                  </div>

                  <div className="simply-col-6">
                    <div className={styles.thankutextbox}>
                      <h1>Thanks!</h1>
                      <h4>Now lets build your profile screens...</h4>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Amet,
                        <br /> cursus neque elit fermentum in. Cursus viverra
                        fames risus.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EIGHTH SCREEN END */}

          {/* NINTH SCREEN START */}

          <div id="nine" className={styles.tab}>
            <div
              className={` ${styles.profilestepper}  d-flex justify-content-center`}
            >
              <div className="simply-col-11">
                <div className="simply-row">
                  <div className="simply-col-6 d-flex justify-content-center  align-items-center">
                    <div className={styles.boxgy1}>
                      <div className={styles.profilepaddingbox}>
                        <div className={styles.profilebox}>
                          <div className={styles.coverbg}>
                            <div className={styles.coveredit}>
                              <Image
                                src="/svg/edit-icon.svg"
                                width={16}
                                height={16}
                              />
                            </div>
                          </div>
                          <div className={styles.profilecontent}>
                            <div className={styles.userimagebox}>
                              <div className={styles.userimage}>
                                <Image
                                  src="/svg/unsplash_uyaTT9u6AvI.svg"
                                  width={72}
                                  height={72}
                                />
                              </div>
                              <div className={styles.onlinestat}></div>
                            </div>
                            <div className={styles.profcontentbox}>
                              <h3>
                                Davis Rhiel Madsen <span>Mentor</span>{" "}
                              </h3>
                              <p className={styles.subtext}>
                                Start-up Adviser & Executive Coach
                              </p>
                              <p className={styles.location}>
                                London, United Kingdom (GMT)
                              </p>
                              <div className={styles.line}></div>

                              <p className={styles.profilehightlight}>
                                <div>
                                  <Image
                                    src="/svg/heightlight.svg"
                                    width={12.5}
                                    height={12}
                                  />
                                </div>
                                Developed 2 pitch decks that rasied $1.5m
                              </p>

                              <div className={styles.line}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="simply-col-6">
                    <div className={styles.profilecontentbox}>
                      <h4>Lets set up your profile</h4>
                      <h5>Cover photo</h5>
                      <p>
                        The cover photo can be used to show off your
                        personality, or even the logos of your past clients.
                      </p>
                      <h5>Headline</h5>
                      <p>
                        The headline is a short description of what you do. For{" "}
                        <br /> example,{" "}
                        <span className={styles.darkblack}>
                          “Start-up Advisor & Executive coach”
                        </span>
                        .
                      </p>
                      <h5 className="d-flex align-items-center">
                        <Image
                          src="/svg/Highlight-icon.svg"
                          width={24}
                          height={24}
                        />
                        &nbsp; Highlight
                      </h5>
                      <p>
                        Your highlight is a concise sentence about what you
                        consider to be your greatest achievement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NINTH SCREEN END */}

          {/* TENTH SCREEN START */}

          <div id="ten" className={styles.tab}>
            <div
              className={` ${styles.profilestepper}  d-flex justify-content-center`}
            >
              <div className="simply-col-11">
                <div className="simply-row">
                  <div className="simply-col-6 d-flex justify-content-center  align-items-center">
                    <div className={styles.boxgy1}>
                      <div className={styles.profilepaddingbox}>
                        <p className={styles.acovephotop}>
                          Click on the edit icon to add a cover photo
                        </p>
                        <div className={styles.profilebox}>
                          <div className={styles.coverbg}>
                            <div className={styles.coveredit}>
                              <Image
                                src="/svg/edit-icon.svg"
                                width={16}
                                height={16}
                              />
                            </div>
                          </div>
                          <div className={styles.profilecontent}>
                            <div className={styles.userimagebox}>
                              <div className={styles.userimage}>
                                <Image
                                  src="/svg/unsplash_uyaTT9u6AvI.svg"
                                  width={72}
                                  height={72}
                                />
                              </div>
                              <div className={styles.onlinestat}></div>
                            </div>
                            <div className={styles.profcontentbox}>
                              <h3>
                                Davis Rhiel Madsen <span>Mentor</span>{" "}
                              </h3>
                              <p className={styles.subtext}>
                                Start-up Adviser & Executive Coach
                              </p>
                              <p className={styles.location}>
                                London, United Kingdom (GMT)
                              </p>
                              <div className={styles.line}></div>

                              <p className={styles.profilehightlight}>
                                <div>
                                  <Image
                                    src="/svg/heightlight.svg"
                                    width={12.5}
                                    height={12}
                                  />
                                </div>
                                Developed 2 pitch decks that rasied $1.5m
                              </p>

                              <div className={styles.line}></div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.setingbox}>
                          <ul className={styles.ul}>
                            <li className={styles.li}>
                              <div className="icon">
                                <Image
                                  src="/svg/reposition.svg"
                                  width={40}
                                  height={40}
                                />
                              </div>
                              <p>Reposition</p>
                            </li>
                            <li className={styles.li}>
                              <div className="icon">
                                <Image
                                  src="/svg/zoom.svg"
                                  width={40}
                                  height={40}
                                />
                              </div>
                              <p>Zoom</p>
                            </li>
                            <li className={styles.li}>
                              <div className="icon">
                                <Image
                                  src="/svg/adjust.svg"
                                  width={40}
                                  height={40}
                                />
                              </div>
                              <p>Adjust</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="simply-col-6">
                    <div className={styles.profilecontentbox2}>
                      <span className={styles.moreeyesstyle}>
                        {" "}
                        Attract more eyes
                      </span>
                      <h4>Add a cover photo</h4>

                      <p>
                        Your cover photo must be have a dimension of 750 x 200
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TENTH SCREEN END */}

          {/* ELEVENTH SCREEN START */}

          <div id="eleven" className={styles.tab}>
            <div
              className={` ${styles.profilestepper}  d-flex justify-content-center`}
            >
              <div className="simply-col-11">
                <div className="simply-row">
                  <div className="simply-col-6 d-flex justify-content-center  align-items-center">
                    <div className={styles.boxgy1}>
                      <div className={styles.profilepaddingbox}>
                        <div className={styles.profilebox}>
                          <div className={styles.coverbg}>
                            <div className={styles.coveredit}>
                              <Image
                                src="/svg/edit-icon.svg"
                                width={16}
                                height={16}
                              />
                            </div>
                          </div>
                          <div className={styles.profilecontent}>
                            <div className={styles.userimagebox}>
                              <div className={styles.userimage}>
                                <Image
                                  src="/svg/unsplash_uyaTT9u6AvI.svg"
                                  width={72}
                                  height={72}
                                />
                              </div>
                              <div className={styles.onlinestat}></div>
                            </div>
                            <div className={styles.profcontentbox}>
                              <h3>
                                Davis Rhiel Madsen <span>Mentor</span>{" "}
                              </h3>
                              <p className={`${styles.subtext} addtext`}>
                                Start-up Adviser & Executive Coach
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={styles.profilebtn}>
                          <p>
                            <a href="" className="savebtn">
                              Save
                            </a>
                          </p>
                          <p>
                            <a href="" className="atext">
                              Cancel
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="simply-col-6">
                    <div className={styles.profilecontentbox2}>
                      <span className={styles.moreeyesstyle}>
                        {" "}
                        Tell people what you do
                      </span>
                      <h4>Add a headline</h4>

                      <p>
                        Your headline should be a very concise description of
                        what you do. For example “Startup Advisor & Mentor”.
                      </p>

                      <div className="inputbox">
                        <input type="text" name="name" className="inputform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ELEVENTH SCREEN END */}

          {/* TWELVE SCREEN START */}
          <div id="twelve" className={styles.tab}>
            <div
              className={` ${styles.profilestepper}  d-flex justify-content-center`}
            >
              <div className="simply-col-11">
                <div className="simply-row">
                  <div className="simply-col-6 d-flex justify-content-center  align-items-center">
                    <div className={styles.boxgy1}>
                      <div className={styles.profilepaddingbox}>
                        <div className={styles.profilebox}>
                          <div className={styles.coverbg}>
                            <div className={styles.coveredit}>
                              <Image
                                src="/svg/edit-icon.svg"
                                width={16}
                                height={16}
                              />
                            </div>
                          </div>
                          <div className={styles.profilecontent}>
                            <div className={styles.userimagebox}>
                              <div className={styles.userimage}>
                                <Image
                                  src="/svg/unsplash_uyaTT9u6AvI.svg"
                                  width={72}
                                  height={72}
                                />
                              </div>
                              <div className={styles.onlinestat}></div>
                            </div>
                            <div className={styles.profcontentbox}>
                              <h3>
                                Davis Rhiel Madsen <span>Mentor</span>{" "}
                              </h3>
                              <p className={styles.subtext2}>
                                Start-up Adviser & Executive Coach
                              </p>
                              <div className={styles.border}>
                                <p className={`${styles.subtext3} addtext2`}>
                                  <span></span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.profilebtn}>
                          <p>
                            <a href="" className="savebtn">
                              Save
                            </a>
                          </p>
                          <p>
                            <a href="" className="atext">
                              Cancel
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="simply-col-6">
                    <div className={styles.profilecontentbox2}>
                      <span className={styles.moreeyesstyle}>
                        {" "}
                        Get more matches
                      </span>
                      <h4>Add a highlight to your profile</h4>

                      <p>
                        Your highlight is a concise sentence about what you
                        consider to be your greatest achievement.
                      </p>

                      <div className="inputbox">
                        <input type="text" name="name" className="inputform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TWELVE SCREEN END */}

          {/* THIRTEEN SCREEN START */}
          <div id="thirteen" className={styles.tab}>
            <div className={` ${styles.thankusteeper} `}>
              <div className="simply-col-12">
                <div className="simply-row">
                  <div className="simply-col-6 d-flex justify-content-center  align-items-center">
                    <div className={styles.boxgy1}>
                      <Image
                        src="/svg/About-us-page-rafiki-1.svg"
                        width={422}
                        height={422}
                      />
                    </div>
                  </div>

                  <div className="simply-col-6">
                    <div className={` ${styles.thankutextbox} expertthanku`}>
                      <h1>Thanks, nearly there!</h1>
                      <h4>Informing us of your experience helps us...</h4>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Amet, <br />
                        cursus neque elit fermentum in. Cursus viverra fames
                        risus. fames risus.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* THIRTEEN SCREEN END */}

          {/* FOURTEEN SCREEN START */}
          <div id="fourtheen" className={styles.tab}>
            <h3 className={styles.stepperheading}>Your work experience</h3>

            <div className={styles.dropdownboxs}>
              <Dropdown
                initialData={{ name: "Add expertise", id: 1 }}
                items={expertiseItems}
                getSelectedItem={(item) => {
                  setExpertiseItems(item);
                }}
              />
            </div>

            {expertiseItems.map((item: any, index: number) =>
              item?.selected ? (
                <div className={styles.expertisebox} key={index}>
                  <div
                    className={styles.close}
                    // onClick={() => handleExpertiseItemClose(item)}
                  >
                    <Image src="/svg/close.svg" width={11} height={11} />{" "}
                  </div>

                  <div className="inputbox">
                    <label htmlFor="Application" className={styles.labelnew}>
                      {item.name}
                    </label>
                    <textarea
                      name=""
                      id=""
                      className="inputform"
                      placeholder="Give an example"
                      value={item.text}
                      onChange={(e) => {
                        setExpertiseItems((prev: any) =>
                          prev.map((item: any, indexs: number) => {
                            if (index === indexs) {
                              return { ...item, text: e.target.value };
                            }
                            return item;
                          })
                        );
                      }}
                    ></textarea>
                  </div>
                </div>
              ) : null
            )}
          </div>
          {/* FOURTEEN SCREEN END */}
        </div>
      </div>

      <div className={`${styles.onbordfooter} simply-row `}>
        <div className="simply-col-12">
          <div className="brline mt-3 mb-3 sm-d-none"></div>
        </div>
        <div
          className={`${styles.bottomsection} simply-col-12  d-flex  align-items-center justify-content-between `}
        >
          <ul>
            <li>
              <span
                onClick={() => {
                  handleClick(currentStep + 1);
                }}
                className={styles.skip}
              >
                Skip
              </span>
            </li>
          </ul>

          <ul>
            <li>
              <button
                className="blueborderbtn smbtn "
                id="prevBtn"
                onClick={() => handleClick(currentStep - 1)}
                disabled={currentStep === 0}
              >
                Prev
              </button>
            </li>
            <li>
              <button
                className={`bluebgbtn smbtn ${isNext ? "smactivebtn" : ""}`}
                id="nextBtn"
                onClick={() => handleClick(currentStep + 1)}
                disabled={!isNext}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StepperExpert;
