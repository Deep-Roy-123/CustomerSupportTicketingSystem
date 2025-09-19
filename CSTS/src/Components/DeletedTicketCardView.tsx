import React from "react";
import type { Input } from "./CreateNewTicket";
interface DeletedTicketCardViewProps {
  deleteTicket: Input[];
  handleViewDetails: (tdata: Input) => void;
  darkMode: boolean;
}
const DeletedTicketCardView: React.FC<DeletedTicketCardViewProps> = ({
  deleteTicket,
  handleViewDetails,
  darkMode,
}) => {
  return (
    <div
      className={`min-w-[1100px] my-6 flex flex-wrap justify-evenly rounded-md ${
        darkMode === true
          ? "bg-gray-800 shadow-md shadow-gray-500"
          : "bg-gray-200 shadow-md shadow-gray-500"
      }`}
    >
      {deleteTicket.map((tdata) => (
        <div
          className={`rounded-md p-3 my-8 w-[320px] hover:transition hover:scale-105 mt-8 shadow-md shadow-gray-500 ${
            darkMode === true
              ? "bg-gray-800 text-gray-200"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          <div className="flex flex-row justify-between">
            <p className="text-blue-500 font-medium mt-1">{tdata.id}</p>
            <p
              className={`border-2 rounded-lg text-center font-medium px-2 ${
                tdata.priority !== "Low"
                  ? tdata.priority === "Medium"
                    ? "text-amber-500"
                    : "text-green-600"
                  : "text-red-600"
              }
              ${darkMode === true ? "border-gray-200" : "border-gray-800"}
              `}
            >
              {tdata.priority}
            </p>
            <p
              className={`border-2 rounded-lg text-center font-medium px-2 ${
                tdata.status !== "Open"
                  ? tdata.status === "In Progress"
                    ? "text-amber-500"
                    : "text-red-600"
                  : "text-green-600"
              }
              ${darkMode === true ? "border-gray-200" : "border-gray-800"}
              `}
            >
              {tdata.status}
            </p>
          </div>
          <p className="text-center mt-4 font-medium text-[20px]">
            {tdata.title}
          </p>
          <p className="font-medium text-[18px] mt-4">
            Created Date :{" "}
            <span className="font-medium text-[16px]">{tdata.date}</span>
          </p>

          <p className="font-medium text-[18px] mt-2">
            Deleted Date :{" "}
            <span className="font-medium text-[16px]">{tdata.deletedTime}</span>
          </p>

          <button
            className=" w-full mt-4 py-2 rounded-md px-3 font-medium bg-green-600 text-white hover:transition-all hover:bg-green-700 hover:scale-102 hover:delay-300 mb-1"
            onClick={() => {
              handleViewDetails(tdata);
            }}
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default DeletedTicketCardView;
