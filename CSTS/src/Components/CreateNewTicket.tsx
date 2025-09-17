import { useFormik } from "formik";
import { ValidationSchema } from "../Schema/ValidationSchema";
import { useNavigate } from "react-router-dom";
import { RiListView } from "react-icons/ri";
import type React from "react";

export interface Input {
  title: string;
  description: string;
  priority: string;
  date: string;
  id: string;
  status: string;
  isDeleted: string;
  deletedTime?: string;
  userId: string;
}

const CreateNewTicket: React.FC = () => {
  const priority: string[] = ["Low", "Medium", "High"];
  const navigate = useNavigate();
  const uid: string = JSON.parse(localStorage.getItem("userId") || "");
  const initialVal = {
    title: "",
    description: "",
    priority: "",
    date: "",
    id: "",
    status: "Open",
    isDeleted: "false",
    deletedTime: "",
    userId: uid,
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialVal,
      validationSchema: ValidationSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: (values, action) => {
        const data: Input[] = JSON.parse(
          localStorage.getItem("ticketData") || "[]"
        );

        //for date and time
        const dateTime = new Date();
        const date = dateTime.toLocaleString();
        values.date = date;

        //for id genaration
        const len = data.length;
        if (len === 0) {
          values.id = "Ticket " + "1000";
        } else {
          const uId = parseInt(data[len - 1].id.slice(7));
          values.id = "Ticket " + (uId + 1);
        }

        const ticketData: Input[] = [...data, values];
        localStorage.setItem("ticketData", JSON.stringify(ticketData));

        alert("Ticket Created successfully..");
        navigate("/dashboard");
        action.resetForm();
      },
    });

  return (
    <div className="bg-gray-300 h-screen">
      <div className="flex justify-between w-full items-center px-5 md:px-15 lg:px-20 py-2 rounded-md bg-white shadow-lg shadow-gray-400">
        <h1 className="text-2xl md:text-4xl text-gray-900 font-bold">
          Create Ticket
        </h1>
        <button
          className="font-medium md:text-[22px] rounded-md text-gray-900 bg-blue-400 h-[50px] px-3 hover:transition-all hover:bg-blue-700 hover:scale-105 hover:delay-300 "
          type="button"
          onClick={() => {
            navigate("/dashboard");
          }}
          title="Ticket List"
        >
          <RiListView className="h-[40px] w-[60px]" />
        </button>
      </div>
      <div className="flex flex-col justify-center items-center mt-5 md:mt-0 pb-2">
        <form
          className=" w-[300px] md:w-[600px] shadow-xl shadow-gray-500 bg-gray-200 rounded-2xl px-[15px] py-[10px] md:px-[25px] md:py-[20px] md:my-10 "
          onSubmit={handleSubmit}
        >
          {/* name field */}
          <div className="text-[18px] md:text-[25px] font-medium flex flex-col gap-1">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter Title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              className="rounded-md border-2 pl-2 h-[35px] md:h-[50px] focus:transition focus:scale-103"
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
          </div>

          {/* description field */}
          <div className="mt-2 text-[18px] md:text-[25px] font-medium flex flex-col gap-1">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              placeholder="Enter Description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className="rounded-md border-2 pl-2 focus:transition focus:scale-103"
            />
            {errors.description && touched.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Priority section */}
          <div className="mt-2 text-[18px] md:text-[25px] font-medium flex flex-col gap-1">
            <label htmlFor="priority">Priority</label>
            <select
              name="priority"
              value={values.priority}
              onChange={handleChange}
              onBlur={handleBlur}
              className="rounded-md border-2 pl-2 h-[35px] md:h-[50px] focus:transition focus:scale-103"
            >
              <option value="" hidden>
                Select Priority
              </option>
              {priority.map((pr) => (
                <option key={pr} value={pr}>
                  {pr}
                </option>
              ))}
            </select>
            {errors.priority && touched.priority && (
              <p className="text-red-500">{errors.priority}</p>
            )}
          </div>

          {/* Submit Btn */}
          <button
            type="submit"
            className="w-full text-gray-800 text-[18px] md:text-[30px] mt-3 font-medium rounded-md bg-blue-400 h-[35px] md:h-[60px] hover:transition-all hover:bg-blue-700 hover:scale-103 hover:delay-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewTicket;
