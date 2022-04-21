import { Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { Ref, useRef } from "react";
import {
  checkDimensions,
  yourCompanyValidation,
} from "../../../validations/expertboarding";
import styles from "../stepperexpert.module.scss";

interface Props {
  isNext: (value: boolean) => void;
  handleState: (value: any) => void;
}

function ThirdScreen({ isNext, handleState }: Props) {
  const router = useRouter();
  const logoAttachment: Ref<HTMLDivElement> = useRef<HTMLDivElement>(null);

  return (
    <div id="third" className={styles.tab}>
      <div className="stepperbox">
        <h3 className={styles.stepperheading}>Your company details</h3>

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
              handleState(values);
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
              isNext(isValid && dirty);

              return (
                <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
                  <div className={styles.inputBox}>
                    <label className={styles.label}>Company name</label>
                    <input
                      className={styles.input}
                      name="companyName"
                      type="text"
                      placeholder="Registered company name"
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
                    <label className={styles.label}>Website URL</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="companyWebsite"
                      placeholder="Website URL"
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
                    <label className={styles.label}>Number of employees</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="numberOFEmployees"
                      placeholder="Number of employees"
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
                  <div className={styles.inputBox}>
                    <label className={styles.label}>LinkedIn Profile</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="linkedIn"
                      placeholder="LinkedIn Profile"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.linkedIn}
                    />
                    <span className="validation-error">
                      {errors.linkedIn && touched.linkedIn && errors.linkedIn}
                    </span>
                  </div>
                  <div className={styles.inputBox}>
                    <label className={styles.label}>Company Logo</label>
                    <input
                      ref={logoAttachment as any}
                      type="file"
                      style={{ display: "none" }}
                      onChange={async (e: any) => {
                        let file = e.target.files[0];
                        if (file) {
                          Object.defineProperty(file, "dimensions", {
                            value: await checkDimensions(file),
                          });

                          //create image
                          const reader = new FileReader();
                          reader.readAsDataURL(file);
                          reader.onload = (e) => {
                            setFieldValue("preview", reader.result);
                          };
                        }
                        setFieldValue("attachment", file);
                        e.target.value = null;
                      }}
                    />
                    {!values?.preview ? (
                      <div
                        className={styles.uploadImage}
                        onClick={() => logoAttachment.current?.click()}
                      >
                        <Image src={"/svg/upload.svg"} width={50} height={50} />
                        <p>Choose an image to uplaod</p>
                      </div>
                    ) : (
                      <div className={styles.PreviewImage}>
                        <Image src={values.preview} width={100} height={100} />
                        <div className={styles.controls}>
                          <div
                            className={styles.control}
                            onClick={() => logoAttachment.current?.click()}
                          >
                            <Image
                              src={"/svg/edit.svg"}
                              width={20}
                              height={20}
                            />
                            <p>Edit Logo</p>
                          </div>
                          <div
                            className={styles.control}
                            onClick={() => {
                              setFieldValue("preview", "");
                              setFieldValue("attachment", null);
                              //set
                            }}
                          >
                            <Image
                              src={"/svg/remove.svg"}
                              width={20}
                              height={20}
                            />
                            <p>Remove Logo</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <span className="validation-error">
                      {errors.attachment}
                    </span>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ThirdScreen;
