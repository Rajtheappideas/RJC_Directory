import * as yup from "yup";

const ValidationSchema = (isPasswordRequired) => {
  const signupSchema = yup.object({
    name: yup
      .string()
      .required("name is required")
      .max(60, "max character limit reached")
      .typeError("only characters allowed")
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        "only contain latin letters"
      ),
    country: yup.string().required("country is required"),
    city: yup.string().required("city is required"),
    state: yup.string().required("state is required"),
    phone: yup.string().required("phone is required"),
    dob: yup.string().required("dob is required"),
    anniversary: yup.string(),
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        // /^(?=.*[0-9])(?=.*[!@#$%^&*])"[a-zA-Z0-9!@#$%^&*]{8,16}"$/,
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
        "Minimum 8 characters, at least one special character (!@#$%^&*), at least one digit"
      ),
    confirmPassword: yup
      .string()
      .required("confirm Password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    fcmToken: yup.string(),
    checkbox: yup.boolean().oneOf([true], "check the checkbox."),
  });

  const signInSchema = yup.object({
    phone: yup.string().required("phone is required"),
    password: isPasswordRequired
      ? yup.string().required("Password is required")
      : yup.string(),
  });

  const forgotPasswordSchema = yup.object({
    phone: yup.string().required("phone is required"),
  });

  const ResetPasswordSchema = yup.object({
    password: yup
      .string()
      .required("password is required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
        "Minimum 8 characters, at least one special character, at least one digit"
      ),
    confirmPassword: yup
      .string()
      .required("confirm password is required")
      .oneOf([yup.ref("password"), null], "password not match"),
  });

  const profileSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .trim()
      .max(60, "max character limit reached")
      .min(2, "minimum two character required")
      .typeError("only characters allowed")
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        "only contain latin letters"
      ),
    dob: yup.string().required("Date of birth is required"),
    photo: yup.string(),
    anniversary: yup.string(),
    country: yup.string().required("country is required"),
    state: yup.string().required("state is required"),
    city: yup.string().required("city is required"),
    phone: yup.string().required("phone is required"),
  });

  const AddressSchema = yup.object({
    address1: yup
      .string()
      .max(200, "maximum character limit reached")
      .required("address is required"),
    address2: yup.string().max(200, "maximum character limit reached"),
    address3: yup.string().max(200, "maximum character limit reached"),
    zipCode: yup
      .string()
      .matches(/^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/, "enter valid code")
      .required("zipcode is required"),
    country: yup.string().required("country is required"),
    city: yup.string().required("city is required"),
  });

  const changePasswordSchema = yup.object({
    password: yup.string().required("password is required").trim(),
    newPassword: yup
      .string()
      .required("new password is required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
        "Minimum 8 characters, at least one special character, at least one digit"
      ),
    confirmPassword: yup
      .string()
      .required("confirm password is required")
      .oneOf([yup.ref("newPassword"), null], "password not match"),
  });

  const contactUsSchema = yup.object().shape({
    email: yup.string().required("email is required").email(),
    fname: yup
      .string()
      .required("first name is required")
      .max(30, "too long")
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
        "only contain Latin letters"
      ),
    lname: yup
      .string()
      .required("last name is required")
      .max(30, "too long")
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
        "only contain Latin letters"
      ),
    comments: yup.string().required("comment is required"),
    phone: yup.string().required("phone is required"),
    //     captcha: yup.string().required("check the captcha."),
  });

  return {
    signupSchema,
    profileSchema,
    AddressSchema,
    ResetPasswordSchema,
    changePasswordSchema,
    contactUsSchema,
    signInSchema,
    forgotPasswordSchema,
  };
};

export default ValidationSchema;
