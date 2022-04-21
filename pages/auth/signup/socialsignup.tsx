import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Formik } from "formik";
import {
  emailValidation,
  SignupSchema,
} from "../../../validations/schemaValidations";
import SignupSideBar from "../../../components/signup-sidebar";
import styles from "../../../styles/pages/Createaccount.module.scss";
import { useState } from "react";

const Socialsignup = () => {
  const router = useRouter();
  const { email } = router.query;

//   if (!email) {
//     router.push("/");
//   }

  const [checkbox, setCheckbox] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Simply Start - Create Your Account </title>
        <meta
          name="description"
          content="Join our community of 19,000 entrepreneurs, investors & experts."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <p>{email}</p> */}
      <div className="wepperwrappersignup">
        <div className="simply-container-fluid">
          <section className="simply-box-signup-page">
            <div className="simply-row height100">
              <div
                className={`${styles.signupboxleft} simply-col-8  d-flex justify-content-end`}
              >
                <div className={`${styles.signupboxinnerbox} simply-col-8`}>
                  <div className="signup-box-inner">
                    
                    {/* Photo part start */}
<div className={styles.avtarbox}>
        <Image
          src="/svg/ad-photo-graphic.svg"
          width={104}
          height={104}
          className={styles.addphoto}
        />

</div>

                    {/* Photo part end */}

                    <div className={styles.formsignup}>
                      <Formik
                        initialValues={{
                          name: "",
                          email: email ? email : "",
                          password: "",
                          confirmPassword: "",
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                          router.push({
                            pathname: "/auth/signup/verification",
                            query: {
                              email: values.email,
                              name: values.name,
                            },
                          });
                          setSubmitting(false);
                        }}
                        validationSchema={SignupSchema}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          isValid,
                          dirty,

                          /* and other goodies */
                        }) => (
                          <form
                            style={{ width: "100%" }}
                            onSubmit={handleSubmit}
                          >
                            <div className={styles.inputbox}>
                              <label
                                htmlFor="Name"
                                style={
                                  errors.name && touched.name && errors.name
                                    ? { color: "red" }
                                    : {}
                                }
                              >
                                Name{" "}
                              </label>

                              <input
                                type="text"
                                name="name"
                                className={styles.inputform}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                style={
                                  errors.name && touched.name && errors.name
                                    ? { borderColor: "red" }
                                    : {}
                                }
                              />

                              <span className="validation-error">
                                {errors.name && touched.name && errors.name}
                              </span>
                            </div>

                            <div className={styles.inputbox}>
                              <label
                                htmlFor="Email"
                                style={
                                  errors.email && touched.email && errors.email
                                    ? { color: "red" }
                                    : {}
                                }
                              >
                                Email{" "}
                              </label>

                              <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className={styles.inputform}
                                style={
                                  errors.email && touched.email && errors.email
                                    ? { borderColor: "red" }
                                    : {}
                                }
                              />

                              <span className="validation-error">
                                {errors.email && touched.email && errors.email}
                              </span>
                            </div>

                            

                            

                            <div className={styles.termsCondition}>
                              <input
                                type="checkbox"
                                onChange={(e) => setCheckbox(e.target.checked)}
                              />
                              <span>
                                I agree to the{" "}
                                <a href="/terms-and-conditions">
                                  terms and conditions
                                </a>{" "}
                                and <a href="/privacy-policy">privacy policy</a>
                              </span>
                            </div>

                            <button
                              type="submit"
                              className={
                                isValid && checkbox && dirty
                                  ? styles.signbutton
                                  : `${styles.buttonDisabled} ${styles.signbutton}`
                              }
                              disabled={!(isValid && checkbox && dirty)}
                            >
                              Create account
                            </button>
                          </form>
                        )}
                      </Formik>
                    </div>

                    <div className={styles.alreadysignup}>
                      <p>
                        <a href="#">Back</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.signuprightsection} bg-grey`}>
                <SignupSideBar
                  headings="Join our community of 19,000 entrepreneurs, investors & experts."
                  image=""
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Socialsignup;
