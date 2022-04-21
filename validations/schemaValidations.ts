import * as Yup from 'Yup';


export const emailValidation  = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Required'),
 });

 export const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be less than 50 characters")
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be less than 20 characters")
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Password doesn't match")
        .required('Required'),

  });

  export const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });


  export const socialSignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be less than 50 characters")
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  export const resetPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be less than 20 characters")
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Password doesn't match")
        .required('Required'),
  });