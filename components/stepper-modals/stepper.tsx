import { Ref, useEffect, useRef, useState } from "react";
import AccordionItem from "../accordian/accordianItem";
import styles from "./stepper.module.scss";
import Dropdown from "../dropdown/dropdown";
import Image from "next/image";
import TickMark from "../svg-icons/TickMark";
import { useRouter } from "next/router";

const Stepper = () => {
  const router = useRouter();
  const tabs: Ref<HTMLDivElement> = useRef(null);
  const tabStatus: Ref<HTMLDivElement> = useRef(null);

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

  console.log({ first: selectedItem, second: selectedItem2 });

  //Setting Initial Step ClassName onLoad
  useEffect(() => {
    const children = tabs?.current?.children;
    children?.[currentStep]?.classList.add(styles.hidden);

    const statusChildren = tabStatus?.current?.children;
    statusChildren?.[currentStep]?.classList.add(styles.stepActive);
  }, [tabs]);

  //Adding ClassName to the current tab and removing from the rest
  const handleClick = (index: number) => {
    if (index === 3) {
      router.push("/onboarding/registration-complete");
    }
    const children = tabs?.current?.children;
    children?.[currentStep]?.classList.remove(styles.hidden);
    children?.[index]?.classList.add(styles.hidden);

    const statusChildren = tabStatus?.current?.children;

    if (index < currentStep) {
      statusChildren?.[currentStep]?.classList.remove(styles.stepActive);
    } else {
      statusChildren?.[index]?.classList.add(styles.stepActive);
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
      question: "Ideation",
      answer:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora possimus consequatur dolor eius reprehenderit expedita iusto excepturi, doloribus architecto. Tenetur sapiente ad dignissimos nam beatae aut velit, numquam eius aliquid.",
    },
    {
      question: "Seed & development",
      answer:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora possimus consequatur dolor eius reprehenderit expedita iusto excepturi, doloribus architecto. Tenetur sapiente ad dignissimos nam beatae aut velit, numquam eius aliquid.",
    },
    {
      question: "Startup",
      answer:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora possimus consequatur dolor eius reprehenderit expedita iusto excepturi, doloribus architecto. Tenetur sapiente ad dignissimos nam beatae aut velit, numquam eius aliquid.",
    },
    {
      question: "Established & growing",
      answer:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora possimus consequatur dolor eius reprehenderit expedita iusto excepturi, doloribus architecto. Tenetur sapiente ad dignissimos nam beatae aut velit, numquam eius aliquid.",
    },
  ];

  const [help, setHelp] = useState<any>([
    { name: "Mentoring", selected: false },
    { name: "Business plan", selected: false },
    { name: "Pitch deck", selected: false },
    { name: "Funding", selected: false },
    { name: "Legal", selected: false },
    { name: " Digital marketing", selected: false },
    { name: "SEI IES", selected: false },
    { name: "Application development", selected: false },
    { name: " GDPR policy", selected: false },
    { name: " Marketing", selected: false },
    { name: " Sales & go to target", selected: false },
    { name: " HR & recruitment", selected: false },
    { name: " Accounting & finance", selected: false },
    { name: " Knowledge & learning", selected: false },
    { name: " Health & safety", selected: false },
  ]);

  const handleHelpClick = (id: string) => {
    const newHelp = [...help];
    const findHelp = newHelp.find((item: any) => item.name === id);

    if (findHelp) {
      findHelp.selected = !findHelp.selected;
    }
    setHelp(newHelp);
  };

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

  const [chips, setChips] = useState<any>([]);

  const handleAddChip = (chip: any) => {
    const newChips = [...chips];

    if (chip.which === 188) {
      //remove last letter 188 (,) from chip
      chip.target.value = chip.target.value.slice(0, -1);
      //add chip to array
      newChips.push(chip.target.value);

      setChips(newChips);
      chip.target.value = "";
    }
  };

  const handleRemoveChip = (index: any) => {
    const newChips = [...chips];
    newChips.splice(index, 1);
    setChips(newChips);
  };

  //VALIDATIONS
  //onChange to set validation to the current step
  useEffect(() => {
    console.log({ currentStep, isNext });
    if (accordiansValue.includes(true) && currentStep === 0) {
      setIsNext(true);
    } else if (selectedItem && selectedItem2 && currentStep === 1) {
      setIsNext(true);
    } else if (
      help.find((item: { selected: boolean }) => item.selected) &&
      currentStep === 2
    ) {
      setIsNext(true);
    } else {
      setIsNext(false);
    }
  }, [accordiansValue, selectedItem, selectedItem2, currentStep, help]);

  return (
    <div className={styles.card}>
      {/* currentStep: {currentStep} */}
      <div className={styles["card-header"]}>
        <div className={styles.steps} ref={tabStatus}>
          <div className={styles.stepBox}>
            <TickMark color={currentStep >= 1 ? "#00A8E8" : "#fff"} />

            <div className={styles.step}></div>
          </div>
          <div className={styles.stepBox}>
            <TickMark color={currentStep >= 2 ? "#00A8E8" : "#fff"} />

            <div className={styles.step}>
              <span></span>
            </div>
          </div>
          <div className={styles.stepBox}>
            <TickMark color={currentStep >= 3 ? "#00A8E8" : "#fff"} />

            <div className={styles.step}>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <div id="cardBody" className={styles["card-body"]}>
        <div className={styles.tabs} ref={tabs}>
          <div id="first" className={styles.tab}>
            <div className="stepperbox">
              <h3 className={styles.stepperheading}>
                Where are you in your current business venture?
              </h3>

              <div className={styles.accordians}>
                {faqs.map((faq, index) => (
                  <div style={{ margin: "20px 0" }} key={index}>
                    <AccordionItem
                      faq={faq}
                      getValue={(value) => handleAccordianValue(value, index)}
                      value={accordiansValue[index]}
                    />
                  </div>
                ))}
              </div>
              {/* {accordiansValue.map((value: any, index: any) => (
                <div key={index}>{value ? "true" : "false"}</div>
              ))} */}
            </div>
          </div>
          <div id="second" className={styles.tab}>
            <div className="stepperbox">
              <h3 className={styles.stepperheading}>
                What industry does your business cover?
              </h3>
              <div className="formbox">
                <div className={styles.dropdownboxs}>
                  <Dropdown
                    initialData={{ name: "Select primary", id: 1 }}
                    items={[
                      { name: "Development & IT", id: 2 },
                      { name: "Design & Creative", id: 3 },
                      { name: "Sales & Marketing", id: 4 },
                      { name: "Writing & Translation", id: 5 },
                      { name: "Admin & Customer Support", id: 6 },
                      { name: "Finance & Accounting", id: 7 },
                      { name: "HR & Training", id: 8 },
                      { name: "Legal", id: 9 },
                      { name: "E-Commerce", id: 10 },
                      { name: "Other (please specify)", id: 11 },
                    ]}
                    getSelectedItem={(item) => {
                      setSelectedItem(item);
                    }}
                  />
                </div>

                <div className={styles.dropdownboxs}>
                  <Dropdown
                    initialData={{ name: "Select secondary", id: 1 }}
                    items={[
                      { name: "Development & IT", id: 2 },
                      { name: "Design & Creative", id: 3 },
                      { name: "Sales & Marketing", id: 4 },
                      { name: "Writing & Translation", id: 5 },
                      { name: "Admin & Customer Support", id: 6 },
                      { name: "Finance & Accounting", id: 7 },
                      { name: "HR & Training", id: 8 },
                      { name: "Legal", id: 9 },
                      { name: "E-Commerce", id: 10 },
                      { name: "Other (please specify)", id: 11 },
                    ]}
                    getSelectedItem={(item) => {
                      setSelectedItem2(item);
                    }}
                  />
                </div>
                <div
                  className={`${styles.dropdownboxs} Other_options_input `}
                  style={{ display: showOtherInput ? "block" : "none" }}
                >
                  <div className="inputbox">
                    <label>Other (please specify) </label>
                    <input
                      type="text"
                      name="name"
                      className="inputform"
                      placeholder="Fashion"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="third" className={styles.tab}>
            <div className="stepperbox">
              <h3 className={styles.stepperheading}>
                What do you need help with?
              </h3>

              <div className={styles.choiceslist}>
                <ul>
                  {help.map((item: any, index: any) => (
                    <li
                      key={index}
                      onClick={() => handleHelpClick(item?.name)}
                      className={item?.selected ? styles.choiceslistActive : ""}
                    >
                      {item?.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`${styles.choiceslist} choiceslistbusinessmargin`}
              >
                <ul>
                  <li>Just see how Simply Start can help my business</li>
                </ul>
              </div>

              <div
                className={`${styles.dropdownboxs} Other_options_input choices `}
                style={{
                  display: help.find(
                    (item: { selected: boolean }) => item.selected
                  )
                    ? "none"
                    : "block",
                }}
              >
                <div className="inputbox">
                  <label>Other (please specify) </label>

                  <div className={styles.chips}>
                    <div className={styles.chipList}>
                      <ul>
                        {chips.map((item: any, index: any) => (
                          <li className={styles.chip} key={index}>
                            {item}{" "}
                            <span onClick={() => handleRemoveChip(index)}>
                              <Image
                                src="/svg/cross.svg"
                                width={15}
                                height={15}
                              />
                            </span>
                          </li>
                        ))}
                        <li>
                          <input
                            type="text"
                            name="name"
                            placeholder="Type here..."
                            onKeyUp={(e) => handleAddChip(e)}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default Stepper;
