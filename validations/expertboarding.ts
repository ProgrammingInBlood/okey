import * as Yup from "Yup";

const FILE_SIZE = 2 * 1024 * 1024; //2MB
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];

export const checkDimensions = (value: any) => {
  if (value) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(value);
      reader.onload = function (value) {
        const img = new Image() as any;
        img.src = value?.target?.result;
        img.onload = function () {
          const width = this.width;
          const height = this.height;
          resolve({ width, height });
        };
      };
    });
  }
};

export const yourCompanyValidation = Yup.object().shape({
  companyName: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Required"),
  companyWebsite: Yup.string().url("Invalid url format").required("Required"),
  numberOFEmployees: Yup.number()
    .min(1, "Number of employees must be at least 1")
    .max(99999, "Number of employees must be less than 99999")
    .required("Required"),
  linkedIn: Yup.string().url("Invalid url format").required("Required"),
  attachment: Yup.mixed()
    .nullable()
    .notRequired()
    .test(
      "FILE_SIZE",
      "Max 2MB file size is allowed.",
      (value) => !value || (value && value.size <= FILE_SIZE)
    )
    .test(
      "FILE_FORMAT",
      "Uploaded file has unsupported format.",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    )
    .test(
      "FILE_DIMENSIONS",
      "Dimensions for the logo should be between 150X150 px and 500X500 px",
      (value) => {
        return (
          !value ||
          (value &&
            value.dimensions.width >= 125 &&
            value.dimensions.height >= 125 &&
            value.dimensions.width <= 500 &&
            value.dimensions.height <= 500)
        );
      }
    ),
});

export const areaOfExpertiseValidation = Yup.object().shape({
  name: Yup.array().of(
    Yup.object().shape({
      text: Yup.string()
        .min(2, "An example needs to be between 2-and 255 characters.")
        .max(255, "An example needs to be between 2-and 255 characters.")
        .required("Required"),
    })
  ),
});
