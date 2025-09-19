import React, { type Dispatch, type SetStateAction } from "react";
import { LuCircleUser } from "react-icons/lu";
import { RiUserSharedLine } from "react-icons/ri";
import { MdCancelPresentation } from "react-icons/md";
import type { User } from "./Pages/SignUp";
import { useNavigate } from "react-router-dom";

interface UserDetailsProps {
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  userData: User[];
  darkMode: boolean;
}
const UserDetails: React.FC<UserDetailsProps> = ({
  showForm,
  setShowForm,
  userId,
  setUserId,
  userData,
  darkMode,
}) => {
  const navigate = useNavigate();
  const uData = userData.find((d) => d.id === userId) as User;
  return (
    <div
      className={`${
        darkMode === true
          ? "bg-gray-800 text-gray-200 border-gray-200"
          : "bg-gray-200 text-gray-800 border-gray-800"
      }`}
    >
      {showForm && (
        <div className="w-[250px] border-2 rounded-md z-100 shadow-md shadow-gray-500">
          <p className="flex justify-center mt-2">
            <LuCircleUser className="h-[40px] w-[60px]" />
          </p>
          <p className="text-center text-[18px] font-bold mt-1">{uData.id}</p>
          <hr className="border-1 mt-2" />
          <p className="text-center font-medium mt-2">{uData.name}</p>
          <p className="text-center font-medium">{uData.email}</p>
          <hr className="border-1 mt-2" />
          <div className="flex justify-center gap-14 mt-4 pb-2">
            <button
              className="rounded-md bg-blue-400 p-1 hover:transition hover:scale-105 hover:bg-blue-600 hover:delay-300"
              onClick={() => {
                setShowForm(false);
              }}
              title="Cancle Button"
            >
              <MdCancelPresentation className="h-[30px] w-[60px]" />
            </button>
            <button
              className="rounded-md bg-red-500 p-1  hover:transition hover:scale-105 hover:bg-red-600 hover:delay-300"
              onClick={() => {
                setUserId("");
                localStorage.removeItem("userId");
                localStorage.removeItem("darkMode");
                navigate("/", { replace: true });
              }}
              title="Log Out"
            >
              <RiUserSharedLine className="h-[30px] w-[60px]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
