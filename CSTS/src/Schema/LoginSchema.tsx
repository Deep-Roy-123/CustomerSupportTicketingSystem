import * as Yup from "yup";
const emailx=/^([a-z0-9]+)([.%_+]{0,1})([a-z0-9]+)@([a-z]+)\.([a-z]+)$/;
const passwordex=/^([A-Z][a-z]+)@([0-9]+)$/
export const LoginSchema = Yup.object({
    email:Yup.string()
        .matches(emailx,"Email should be in small letter,their will be .,%,_,+,@ this special charecter")
        .min(10, 'Email should be min 15 char')
        .required("Please Enter Your Email"),
    password: Yup.string()
        .matches(passwordex,"Password first char should be capital,their will be one @")
        .min(5,"Password should be min 5 char")
        .required("Please Select Password"),
});
