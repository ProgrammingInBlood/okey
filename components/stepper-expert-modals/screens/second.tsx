import { useEffect, useState } from "react";
import TickMark from "../../svg-icons/TickMark";
import styles from "../stepperexpert.module.scss";

interface Props {
  isNext: (value: boolean) => void;
  handleState: (value: any) => void;
}

function SecondScreen({ isNext, handleState }: Props) {
  const [registeredOrganisation, setRegisteredOrganisation] =
    useState<string>("");

  useEffect(() => {
    if (registeredOrganisation) {
      isNext(true);
    } else {
      isNext(false);
    }
  }, [registeredOrganisation]);

  useEffect(() => {
    handleState({ registeredOrganisation });
  }, [registeredOrganisation, handleState]);

  return (
    <div id="second" className={styles.tab}>
      <div className="stepperbox">
        <h3 className={styles.stepperheading}>
          Are you an individual or a registered organisation?
        </h3>
        <div className={styles.boxcli}>
          <ul className={styles.boxcliulstyle}>
            <li
              onClick={() => setRegisteredOrganisation("Individual")}
              className={styles.registeredOrganisation}
            >
              <span>
                <TickMark
                  color={
                    registeredOrganisation === "Individual"
                      ? "#1d99f2"
                      : "white"
                  }
                />
              </span>
              <p>Individual</p>
            </li>
            <li
              className={styles.registeredOrganisation}
              onClick={() =>
                setRegisteredOrganisation("registeredOrganisation")
              }
            >
              <span>
                <TickMark
                  color={
                    registeredOrganisation === "registeredOrganisation"
                      ? "#1d99f2"
                      : "white"
                  }
                />
              </span>
              <p>Registered organisation</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SecondScreen;
