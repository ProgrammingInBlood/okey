import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/pages/Signup.module.scss";
import Link from "next/link";
import { Formik } from "formik";
import { emailValidation } from "../../../validations/schemaValidations";
import { useRouter } from "next/router";
import SignupSideBar from "../../../components/signup-sidebar";

const Signup = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>Simply Start - Signup </title>
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
                      <h1 className={styles.heading}>Sign up</h1>
                      <p className={styles.headingsub}>
                        How would you like to proceed?
                      </p>
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
                        initialValues={{ email: "" }}
                        onSubmit={(values, { setSubmitting }) => {
                          router.push(
                            {
                              pathname: "/auth/signup/create",
                              query: {
                                email: values.email,
                              },
                            },
                            "/auth/signup/create"
                          );
                          setSubmitting(false);
                        }}
                        validationSchema={emailValidation}
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

                            <button
                              type="submit"
                              className={
                                isValid && dirty
                                  ? styles.signbutton
                                  : `${styles.buttonDisabled} ${styles.signbutton}`
                              }
                            >
                              Sign up with email
                            </button>
                          </form>
                        )}
                      </Formik>
                    </div>

                    <div className={styles.alreadysignup}>
                      <p>Already have an account?</p>
                      <p>
                        <Link href="/auth/login">Login here</Link>
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

export default Signup;
