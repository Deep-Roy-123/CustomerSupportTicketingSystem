import * as Yup from "yup";
const titlex=/^[A-Z][a-zA-Z ]+$/;
export const ValidationSchema = Yup.object({
    title: Yup.string()
        .matches(titlex,"First letter should be capital,Only letters and spaces are allowed")
        .min(10,"Title should be min 10 characters")
        .max(50,"Title should be max 50 characters")
        .required("Please enter your Title"),
    description:Yup.string()
        .typeError('Description must be a string')
        .min(15, 'Description should be min 15 char')
        .max(150,'Description should be max 150 letter')
        .required("Please Enter Your Description"),
    priority: Yup.string()
        .required("Please Select Priority"),

});
