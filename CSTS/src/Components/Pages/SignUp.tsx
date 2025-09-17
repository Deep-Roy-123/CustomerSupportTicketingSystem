import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SignupSchema } from "../../Schema/SignupSchema";
import { RiUserReceived2Line } from "react-icons/ri";


export interface User {
  name?: string;
  id: string;
  email: string;
  password: string;
}

export const initUser = {
  name: "",
  id: "",
  email: "",
  password: "",
};

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initUser,
      validationSchema: SignupSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: (values, action) => {
        const data: User[] = JSON.parse(
          localStorage.getItem("userData") || "[]"
        );

        //for id genaration
        const len = data.length;
        if (len === 0) {
          values.id = "User " + "1000";
        } else {
          const uId = parseInt(data[len - 1].id.slice(5));
          values.id = "User " + (uId + 1);
        }

        const userData: User[] = [...data, values];
        localStorage.setItem("userData", JSON.stringify(userData));

        alert("Account created successfully..");
        navigate("/");
        action.resetForm();
      },
    });

  return (
    <div>
      <div className="flex justify-between items-center px-5 md:px-15 lg:px-20 py-2 rounded-md bg-white shadow-lg shadow-gray-400">
        <h1 className="text-4xl  text-gray-900 font-bold">CSTS</h1>
        <button
          className="font-medium md:text-[22px] rounded-md text-gray-900 bg-blue-400 h-[50px] px-3 hover:transition-all hover:bg-blue-700 hover:scale-103 hover:delay-300"
          type="button"
          onClick={() => {
            navigate("/");
          }}
          title="Log In"
        >
          <RiUserReceived2Line className="w-[60px] h-[35px]" />
        </button>
      </div>

      {/* sign up form */}
      <div className="flex flex-col justify-center items-center mt-5 md:mt-0 pb-2">
        <form
          className=" w-[300px] md:w-[600px] shadow-xl shadow-gray-500 bg-gray-200 rounded-2xl px-[15px] py-[10px] md:px-[25px] md:py-[20px] md:my-10 "
          onSubmit={handleSubmit}
        >
          {/* name field */}
          <div className="text-[20px] md:text-[25px] font-medium flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input
              type="name"
              name="name"
              placeholder="Enter Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="rounded-md text-[20px] border-2 pl-2 h-[35px] md:h-[50px] focus:transition focus:scale-103"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

          {/* email field */}
          <div className="text-[20px] md:text-[25px] font-medium flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="rounded-md text-[20px] border-2 pl-2 h-[35px] md:h-[50px] focus:transition focus:scale-103"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          {/* password field */}
          <div className="mt-2 text-[20px] md:text-[25px] font-medium flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              placeholder="Enter Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="rounded-md text-[20px] md:h-[50px] border-2 pl-2 focus:transition focus:scale-103"
            />
            {errors.password && touched.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Submit Btn */}
          <button
            type="submit"
            className="w-full text-gray-800 text-[20px] md:text-[30px] mt-4 font-medium rounded-md bg-blue-400 h-[35px] md:h-[50px] hover:transition-all hover:bg-blue-700 hover:scale-103 hover:delay-500"
          >
            Sign Up
          </button>
          <p className="text-center mt-1">
            Do you have an account?{" "}
            <button
              className="text-blue-700 underline"
              onClick={() => {
                navigate("/");
              }}
            >
              Log In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
