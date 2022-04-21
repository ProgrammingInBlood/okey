import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ExpertIndustries } from "../../../static-example";
import IndustryDropdown from "../../industry-dropdown/dropdown";
import styles from "../stepperexpert.module.scss";

interface Props {
  isNext: (value: boolean) => void;
  handleState: (value: any) => void;
}

function FifthScreen({ isNext, handleState }: Props) {
  const [industries, setIndustries] = useState<any>([]);

  useEffect(() => {
    if (industries.length > 0) {
      isNext(true);
    } else {
      isNext(false);
    }
  }, [industries]);

  return (
    <div id="five" className={styles.tab}>
      <h3 className={styles.stepperheading}>
        What industry does your business cover?
      </h3>

      <div className={styles.dropdownboxs}>
        <IndustryDropdown
          initialData={{ name: "Select up to 5 industries", id: 1 }}
          items={ExpertIndustries}
          getSelectedItem={(item) => {
            setIndustries(item);
          }}
        />
      </div>

      <div className={styles.industriesbox}>
        <div className={styles.industriesboxheading}>
          <h4>Select up to 5 industries</h4>
        </div>
        <div className={styles.editeind}>
          <Image src="/svg/indedit.svg" width={16} height={16} />
        </div>
        <div className={styles.indertogel}>
          {industries.map((industry: any, index: number) =>
            industry?.selected ? (
              <React.Fragment key={index}>
                <span>{industry.name}</span>

                {industry?.child?.length > 0
                  ? industry.child.map((child: any, index: number) =>
                      child?.selected ? (
                        <span key={index}>{child.name}</span>
                      ) : null
                    )
                  : null}
              </React.Fragment>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default FifthScreen;
