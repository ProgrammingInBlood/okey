import React, { useEffect, useState } from "react";
import AccordionItem from "../../accordian-expert-bording/accordianItem";
import styles from "../stepperexpert.module.scss";

interface Props {
  isNext: (value: boolean) => void;
  faqs: any;
  handleState: (value: any) => void;
}

function FirstScreen({ faqs, isNext }: Props) {
  const [accordiansValue, setAccordiansValue] = useState<any>([
    false,
    false,
    false,
    false,
  ]);

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

  useEffect(() => {
    if (accordiansValue.includes(true)) {
      isNext(true);
    } else {
      isNext(false);
    }
  }, [accordiansValue]);

  return (
    <div id="first" className={styles.tab}>
      <div className="stepperbox">
        <h3 className={styles.stepperheading}>
          What kind of expert would you consider yourself to be?
        </h3>

        <div className={styles.accordians}>
          {faqs.map((faq: any, index: number) => (
            <div style={{ margin: "20px 0" }} key={index}>
              <AccordionItem
                faq={faq}
                getValue={(value) => handleAccordianValue(value, index)}
                value={accordiansValue[index]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default FirstScreen;
