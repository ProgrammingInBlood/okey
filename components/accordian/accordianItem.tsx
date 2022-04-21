import Image from "next/image";
import { useEffect, useState } from "react";
import { useRef } from "react";
import styles from "./accordianItem.module.scss";

interface pageProps {
  faq: {
    question: string;
    answer: string;
  };
  value: boolean;
  getValue: (value: boolean) => void;
}

const AccordionItem = ({ faq, getValue, value }: pageProps) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const contentEl = useRef<HTMLDivElement>(null);

  const { question, answer } = faq;

  const handleToggle = () => {
    setClicked((prev) => !prev);
  };

  useEffect(() => {
    getValue(clicked);
  }, [clicked]);

  useEffect(() => {
    if (value) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  }, [value]);

  return (
    <li className={`${styles.accordion_item} ${clicked ? styles.active : ""}`}>
      <button className={styles.button} onClick={handleToggle}>
        <span className="arrow">
          <svg
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.00016 11.17L1.83016 6.99997L0.410156 8.40997L6.00016 14L18.0002 1.99997L16.5902 0.589966L6.00016 11.17Z"
              fill={clicked ? "#1D99F2" : "#fff"}
            />
          </svg>
        </span>

        {question}
      </button>

      <div
        ref={contentEl}
        className={styles.answer_wrapper}
        style={
          clicked
            ? { height: contentEl?.current?.scrollHeight }
            : { height: "0px" }
        }
      >
        <div className={styles.answer}>{answer}</div>
      </div>
    </li>
  );
};

export default AccordionItem;
