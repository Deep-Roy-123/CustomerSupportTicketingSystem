import React from "react";
import { useNavigate } from "react-router-dom";
import { ImUserPlus } from "react-icons/im";
import { useFormik } from "formik";
import { LoginSchema } from "../../Schema/LoginSchema";
import { initUser, type User } from "./SignUp";

const LogIn: React.FC = () => {
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initUser,
      validationSchema: LoginSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: (values, action) => {
        const data: User[] = JSON.parse(
          localStorage.getItem("userData") || "[]"
        );
        const uId: string =(
          localStorage.getItem("userId") || ""
        );

        if(!uId){
          const user = data.find(
            (d) => d.email === values.email && d.password === values.password
          );
  
          if (user) {
            alert("Login successfully..");
            action.resetForm();
            navigate("/dashboard", { state: { usrId: user.id } });
          } else {
            alert("email And password not Match");
          }
        }else{
          alert("One User exists, you can't LogIn")
          action.resetForm();
        }
      },
    });

  return (
    <div>
      {/*header */}
      <div className="flex justify-between items-center px-5 md:px-15 lg:px-20 py-2 rounded-md bg-white shadow-lg shadow-gray-400">
        <h1 className="text-4xl  text-gray-900 font-bold">CSTS</h1>
        <button
          className="font-medium md:text-[22px] rounded-md text-gray-900 bg-blue-400 h-[50px] px-3 hover:transition-all hover:bg-blue-700 hover:scale-103 hover:delay-300"
          type="button"
          onClick={() => {
            navigate("/signup");
          }}
          title="Sign Up"
        >
          <ImUserPlus className="w-[60px] h-[35px]" />
        </button>
      </div>

      {/* Login page form */}
      <div className="flex flex-col justify-center items-center mt-5 md:mt-0 pb-2">
        <form
          className=" w-[300px] md:w-[600px] shadow-xl shadow-gray-500 bg-gray-200 rounded-2xl px-[15px] py-[10px] md:px-[25px] md:py-[20px] md:my-10 "
          onSubmit={handleSubmit}
        >
          {/* email field */}
          <div className="text-[18px] md:text-[25px] font-medium flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="rounded-md border-2 pl-2 h-[35px] md:h-[50px] focus:transition focus:scale-103"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          {/* password field */}
          <div className="mt-2 text-[18px] md:text-[25px] font-medium flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              placeholder="Enter Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="rounded-md border-2 pl-2 focus:transition focus:scale-103"
            />
            {errors.password && touched.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Submit Btn */}
          <button
            type="submit"
            className="w-full text-gray-800 text-[18px] md:text-[30px] mt-3 font-medium rounded-md bg-blue-400 h-[35px] md:h-[60px] hover:transition-all hover:bg-blue-700 hover:scale-103 hover:delay-500"
          >
            Sign In
          </button>
          <p className="text-center">
            Don't have an account?{" "}
            <button
              className="text-blue-700 underline"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
