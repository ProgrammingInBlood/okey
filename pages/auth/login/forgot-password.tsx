import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/pages/Signup.module.scss";
import Link from "next/link";
import { Formik } from "formik";
import { emailValidation } from "../../../validations/schemaValidations";
import { useRouter } from "next/router";
import SignupSideBar from "../../../components/signup-sidebar";

const Forget = () => {
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
                      <h1 className={styles.heading}>Forget Password</h1>
                      <p className={styles.headingsub}>
                        Enter your email address and we will send you a 6-digit{" "}
                        <br /> code for verification
                      </p>
                    </div>

                    <div className={styles.formsignup}>
                      <Formik
                        initialValues={{ email: "" }}
                        onSubmit={(values, { setSubmitting }) => {
                          router.push(
                            {
                              pathname: "/auth/login/new-password",
                              query: {
                                email: values.email,
                              },
                            },
                            "/auth/login/new-password"
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
                              Continue
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

export default Forget;
