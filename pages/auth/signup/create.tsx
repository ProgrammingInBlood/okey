import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Formik } from "formik";
import { SignupSchema } from "../../../validations/schemaValidations";
import SignupSideBar from "../../../components/signup-sidebar";
import styles from "../../../styles/pages/Createaccount.module.scss";
import React, { useEffect, useRef, useState } from "react";
import { GetServerSidePropsContext } from "next";

interface pageprops {
  email: string;
}
const CreateAccount = ({ email }: pageprops) => {
  const router = useRouter();
  const avatarRef = useRef<HTMLInputElement>(null); //Getting ref of avatar input

  const [checkbox, setCheckbox] = useState(false);
  const [avatar, setAvatar] = useState({});
  const [image, setImage] = useState("/svg/ad-photo-graphic.svg"); //Default image

  const [showPassword, setShowPassword] = useState(false); //To show password or not
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); //To show confirm password or not

  //SETTNG ON-CLICK ON AVATAR
  const handleAvatarClick = () => {
    avatarRef.current?.click();
  };

  //SAVING AVATAR IMAGE TO STATE
  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatar(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

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
                    <div className={styles.logosection}>
                      <Image
                        src="/svg/main-logo.svg"
                        width={180}
                        height={45}
                        className={styles.logoimg}
                      />
                      <h1 className={styles.heading}>Create your account</h1>
                    </div>
                    {/* Photo part start */}
                    <div className={styles.avtarbox}>
                      <div className={styles.addphoto}>
                        <Image
                          src={image}
                          width={104}
                          height={104}
                          onClick={handleAvatarClick}
                        />
                      </div>
                      <input
                        type="file"
                        ref={avatarRef}
                        style={{ display: "none" }}
                        onChange={(e) => handleAvatar(e)}
                      />
                      <p
                        onClick={handleAvatarClick}
                        className={styles.addphototext}
                      >
                        Add photo
                      </p>
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
                          router.push(
                            {
                              pathname: "/auth/signup/verification",
                              query: {
                                email: values.email,
                                name: values.name,
                              },
                            },
                            "/auth/signup/verification"
                          );
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

export default CreateAccount;

// server side props
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const { email } = query;

  if (!email) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      email: email,
    },
  };
}
