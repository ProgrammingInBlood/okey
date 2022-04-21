import { ErrorMessage, FieldArray, Form, Formik, FormikValues } from "formik";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { areaOfExpertiseValidation } from "../../../validations/expertboarding";
import Dropdown from "../../dropdown-with-search-box/dropdown";

import styles from "../stepperexpert.module.scss";

interface Props {
  isNext: (value: boolean) => void;
  handleState: (value: any) => void;
}

function FourthScreen({ isNext, handleState }: Props) {
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

  const [selectedExpertise, setSelectedExpertise] = useState<any>([]);

  useEffect(() => {
    const selectedExpertiseFilter = expertiseItems.filter(
      (item: any) => item.selected
    );
    console.log({ selectedExpertiseFilter });
    setSelectedExpertise(selectedExpertiseFilter);
    handleState(selectedExpertiseFilter);
  }, [expertiseItems]);

  const handleExpertiseItemClose = (item: any) => {
    let tempItems = expertiseItems;

    const findItem = tempItems.find((i: any) => i.id === item.id);
    if (findItem) {
      findItem.selected = !findItem.selected;
      // findItem.text = undefined;
      setExpertiseItems([...tempItems]);
    }
  };

  return (
    <div id="four" className={styles.tab}>
      <h3 className={styles.stepperheading}>What is your area of expertise?</h3>
      <p>
        You must have demonstrable experience in the Expertise that you add to
        your profile. 10 maximum.
      </p>

      <div className={styles.dropdownboxs}>
        <Dropdown
          initialData={{ name: "Add expertise", id: 1 }}
          items={expertiseItems}
          getSelectedItem={(item) => {
            setExpertiseItems(item);
          }}
        />
      </div>

      <Formik
        initialValues={{
          name: selectedExpertise,
        }}
        validationSchema={areaOfExpertiseValidation}
        onSubmit={(values: FormikValues) => console.log(values)}
        enableReinitialize={true}
      >
        {({
          handleSubmit,
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          isValid,
          dirty,
        }: any) => {
          const allData = values.name.filter(
            (item: any) => item.selected === true
          );

          const checkTextNotEmpty = allData.filter((item: any) => {
            console.log(item.text);

            return (
              item.text == "" ||
              !(item?.text?.length >= 2 && item?.text?.length < 255)
            );
          });

          console.log({ allData, checkTextNotEmpty });

          if (checkTextNotEmpty.length > 0 || allData.length <= 0) {
            isNext(false);
          } else {
            isNext(true);
          }

          return (
            <Form>
              <FieldArray
                name="name"
                render={(helpers) => (
                  <div>
                    {values.name && values.name.length > 0
                      ? values.name.map((person: any, index: number) =>
                          person.selected ? (
                            <React.Fragment key={index}>
                              <div className={styles.expertisebox} key={index}>
                                <div
                                  className={styles.close}
                                  onClick={() =>
                                    handleExpertiseItemClose(person)
                                  }
                                >
                                  <Image
                                    src="/svg/close.svg"
                                    width={11}
                                    height={11}
                                  />{" "}
                                </div>
                                <div className="inputbox">
                                  <label
                                    htmlFor="Application"
                                    className={styles.labelnew}
                                  >
                                    {person.name}
                                  </label>
                                  <textarea
                                    name={`name.${index}.text`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="inputform"
                                    placeholder="Give an example"
                                    value={person.text}
                                  ></textarea>
                                </div>
                              </div>

                              <ErrorMessage name={`name.${index}.text`}>
                                {(msg) => (
                                  <div className="validation-error">{msg}</div>
                                )}
                              </ErrorMessage>
                            </React.Fragment>
                          ) : null
                        )
                      : null}
                  </div>
                )}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default FourthScreen;
