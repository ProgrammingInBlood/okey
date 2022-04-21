import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Formik } from "formik";
import {
  resetPasswordSchema,
  SignupSchema,
} from "../../../validations/schemaValidations";
import SignupSideBar from "../../../components/signup-sidebar";
import styles from "../../../styles/pages/Createaccount.module.scss";
import React, { useEffect, useRef, useState } from "react";
import { GetServerSidePropsContext } from "next";

interface pageprops {
  email: string;
}
const NewPassword = ({ email }: pageprops) => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false); //To show password or not
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); //To show confirm password or not

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

      <div className="wepperwrappersignup">
        <div className="simply-container-fluid">
          <section className="simply-box-signup-page">
            <div className="simply-row height100">
              <div
                className={`${styles.signupboxleft} simply-col-8  d-flex justify-content-end`}
              >
                <div className={`${styles.signupboxinnerbox} simply-col-8`}>
                  <div className="signup-box-inner">
                    <div className={styles.logosection}>
                      <Image
                        src="/svg/main-logo.svg"
                        width={180}
                        height={45}
                        className={styles.logoimg}
                      />
                      <h1 className={styles.heading}>New password</h1>
                      <p className={styles.headingsub}>
                        Please enter your new password
                      </p>
                    </div>

                    <div className={styles.formsignup}>
                      <Formik
                        initialValues={{
                          password: "",
                          confirmPassword: "",
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                          router.push("/auth/login");
                          setSubmitting(false);
                        }}
                        validationSchema={resetPasswordSchema}
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
                                htmlFor="Password"
                                style={
                                  errors.password &&
                                  touched.password &&
                                  errors.password
                                    ? { color: "red" }
                                    : {}
                                }
                              >
                                Password{" "}
                              </label>

                              <div className={styles.boxpasswordeye}>
                                <input
                                  type={showPassword ? "text" : "password"}
                                  name="password"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.password}
                                  className={styles.inputform}
                                  style={
                                    errors.password &&
                                    touched.password &&
                                    errors.password
                                      ? { borderColor: "red" }
                                      : {}
                                  }
                                />
                                <div
                                  className={styles.boxpasswordeyeicon}
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  <Image
                                    src="/svg/eye.svg"
                                    width={20}
                                    height={20}
                                    className={styles.eyepassword}
                                  />
                                </div>
                              </div>

                              <span className="validation-error">
                                {errors.password &&
                                  touched.password &&
                                  errors.password}
                              </span>
                            </div>

                            <div className={styles.inputbox}>
                              <label
                                htmlFor="Email"
                                style={
                                  errors.confirmPassword &&
                                  touched.confirmPassword &&
                                  errors.confirmPassword
                                    ? { color: "red" }
                                    : {}
                                }
                              >
                                Confirm Password{" "}
                              </label>
                              <div className={styles.boxpasswordeye}>
                                <input
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  name="confirmPassword"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.confirmPassword}
                                  className={styles.inputform}
                                  style={
                                    errors.confirmPassword &&
                                    touched.confirmPassword &&
                                    errors.confirmPassword
                                      ? { borderColor: "red" }
                                      : {}
                                  }
                                />
                                <div
                                  className={styles.boxpasswordeyeicon}
                                  onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                  }
                                >
                                  <Image
                                    src="/svg/eye.svg"
                                    width={20}
                                    height={20}
                                    className={styles.eyepassword}
                                  />
                                </div>
                              </div>

                              <span className="validation-error">
                                {errors.confirmPassword &&
                                  touched.confirmPassword &&
                                  errors.confirmPassword}
                              </span>
                            </div>

                            <button
                              type="submit"
                              className={
                                isValid && dirty
                                  ? styles.signbutton
                                  : `${styles.buttonDisabled} ${styles.signbutton}`
                              }
                              disabled={!(isValid && dirty)}
                            >
                              Confirm
                            </button>
                          </form>
                        )}
                      </Formik>
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

export default NewPassword;

// server side props
// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const { query } = context;
//   const { email } = query;

//   if (!email) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {
//       email: email,
//     },
//   };
// }
