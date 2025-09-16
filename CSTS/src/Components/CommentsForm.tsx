import { useFormik } from 'formik';
import React, { type Dispatch, type SetStateAction } from 'react';
import { initComment, type Comment } from './TicketDetail';
import type { Input } from './CreateNewTicket';
 
interface CommentsFormProps{
    showForm: boolean; 
    setShowForm: Dispatch<SetStateAction<boolean>>; 
    ticket: Input;
}

const CommentsForm:React.FC<CommentsFormProps> = ({showForm,setShowForm,ticket}) => {
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
                className="bg-gray-200 mb-5 p-2 z-100 absolute  top-[50%] left-[20%] md:left-[40%] xl:left-[45%] rounded-md flex flex-col w-[200px] gap-4 justify-center items-center shadow-lg shadow-gray-500 px-2 hover:transition hover:scale-105 hover:delay-200"
                onSubmit={handleSubmit}
              >
                <textarea
                  name="comment"
                  className="border-2 w-full h-[80px] rounded-md pl-2 hover:transition hover:scale-103 hover:delay-500"
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
  )
}

export default CommentsForm