import { useFormik } from "formik";
import React, { type Dispatch, type SetStateAction } from "react";
import { initComment, type Comment } from "./TicketDetail";
import type { Input } from "./CreateNewTicket";

interface CommentsFormProps {
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  ticket: Input;
  darkMode: boolean;
}

const CommentsForm: React.FC<CommentsFormProps> = ({
  showForm,
  setShowForm,
  ticket,
  darkMode,
}) => {
  const { values, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: initComment,
    onSubmit: (values, action) => {
      const data: Comment[] = JSON.parse(
        localStorage.getItem("commentsData") || "[]"
      );
      const dateTime = new Date();
      const date = dateTime.toLocaleString();
      values.time = date;
      values.id = ticket.id;
      const commentData: Comment[] = [...data, values];
      localStorage.setItem("commentsData", JSON.stringify(commentData));
      action.resetForm();
      setShowForm(false);
    },
  });
  return (
    <div>
      {showForm && (
        <form
          className={`mb-5 p-2 z-100 absolute top-[50%] left-[20%] md:left-[40%] xl:left-[45%] rounded-md flex flex-col w-[200px] gap-4 justify-center items-center shadow-md shadow-gray-500 px-2 hover:transition hover:scale-105 hover:delay-200 ${
            darkMode === true
              ? "bg-gray-800 text-gray-200 border-gray-200"
              : "bg-gray-200 text-gray-800 border-gray-800"
          }`}
          onSubmit={handleSubmit}
        >
          <textarea
            name="comment"
            className={`border-2 outline-0 w-full h-[80px] rounded-md pl-2 hover:transition hover:scale-103 hover:delay-500 ${
              darkMode === true ? "text-gray-200" : ""
            }`}
            placeholder="Enter your Comment.."
            value={values.comment}
            onChange={handleChange}
            onBlur={handleBlur}
          ></textarea>
          <button
            className="rounded-md w-full bg-blue-400 text-[18px] p-2 hover:transition-all hover:bg-blue-600 hover:scale-103 hover:delay-300"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default CommentsForm;
