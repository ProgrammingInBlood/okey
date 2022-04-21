import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/pages/Login.module.scss";
import Link from "next/link";
import { Formik } from "formik";
import {
  emailValidation,
  loginSchema,
} from "../../../validations/schemaValidations";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import SignupSideBar from "../../../components/signup-sidebar";

const Login = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false); //To show password or not
  const [checkbox, setCheckbox] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Simply Start - Login </title>
        <meta
          name="description"
          content="The professional playground for entrepreneurs, investors and experts."
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
                      <h1 className={styles.heading}>Login</h1>
                      <p className={styles.headingsub}>Login in with</p>
                    </div>

                    <div className={styles.socialmedialogin}>
                      <ul>
                        <li>
                          <a href="#" className={styles.sociallink}>
                            <>
                              <Image
                                src="/svg/google-plus.svg"
                                width={24}
                                height={24}
                              />
                            </>
                          </a>
                        </li>
                        <li>
                          <a href="#" className={styles.sociallink}>
                            <>
                              <Image
                                src="/svg/facebook.svg"
                                width={19}
                                height={19}
                              />
                            </>
                          </a>
                        </li>
                        <li className="bg-black">
                          <a href="#" className={styles.sociallink}>
                            <>
                              <Image
                                src="/svg/apple.svg"
                                width={17}
                                height={20}
                              />
                            </>
                          </a>
                        </li>
                        <li>
                          <a href="#" className={styles.sociallink}>
                            <>
                              <Image src="/svg/in.svg" width={20} height={20} />
                            </>
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="orplusline">OR</div>

                    <div className={styles.formsignup}>
                      <Formik
                        initialValues={{ email: "", password: "" }}
                        onSubmit={(values, { setSubmitting }) => {
                          router.push("/");
                          setSubmitting(false);
                        }}
                        validationSchema={loginSchema}
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
                            onSubmit={handleSubmit}
                            style={{ width: "100%" }}
                          >
                            <label
                              htmlFor="Field name"
                              style={
                                errors.email && touched.email && errors.email
                                  ? { color: "red" }
                                  : {}
                              }
                            >
                              Field name{" "}
                            </label>
                            <input
                              style={
                                errors.email && touched.email && errors.email
                                  ? { borderColor: "red" }
                                  : {}
                              }
                              type="email"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              className={styles.inputform}
                              placeholder="user@simplystart.com"
                            />
                            <span className="validation-error">
                              {errors.email && touched.email && errors.email}
                            </span>
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
                            <div className={styles.termsCondition}>
                              <div>
                                <input
                                  type="checkbox"
                                  onChange={(e) =>
                                    setCheckbox(e.target.checked)
                                  }
                                />
                                <span>Remember me </span>
                              </div>

                              <div className={styles.forget}>
                                <Link href="/auth/login/forgot-password">
                                  Forgot password?
                                </Link>
                              </div>
                            </div>

                            <button
                              type="submit"
                              className={
                                isValid && dirty
                                  ? styles.signbutton
                                  : `${styles.buttonDisabled} ${styles.signbutton}`
                              }
                            >
                              Login
                            </button>
                          </form>
                        )}
                      </Formik>
                    </div>

                    <div className={styles.alreadysignup}>
                      <p>Don&apos;t have an account?</p>
                      <p>
                        <Link href="/auth/signup">Sign up for free</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.signuprightsection} bg-grey`}>
                <SignupSideBar
                  headings="The professional playground  for entrepreneurs, investors  and experts."
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

export default Login;
