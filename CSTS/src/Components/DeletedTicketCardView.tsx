import React from "react";
import type { Input } from "./CreateNewTicket";
interface DeletedTicketCardViewProps{
    deleteTicket: Input[];
    handleViewDetails: (tdata: Input) => void;
}
const DeletedTicketCardView:React.FC<DeletedTicketCardViewProps> = ({deleteTicket, handleViewDetails}) => {
  return (
    <div className="min-w-[1100px] mt-6 pb-5 flex flex-wrap justify-evenly bg-gray-200 rounded-md">
      {deleteTicket.map((tdata) => (
        <div className="bg-gray-100 rounded-md p-3 w-[320px] mt-4 shadow-lg">
          <div className="flex flex-row justify-between">
            <p className="text-blue-500 font-medium mt-1">{tdata.id}</p>
            <p
              className={`border-2 rounded-lg text-center border-gray-800 font-medium px-2 ${
                tdata.priority !== "Low"
                  ? tdata.priority === "Medium"
                    ? "text-amber-500"
                    : "text-green-600"
                  : "text-red-600"
              }`}
            >
              {tdata.priority}
            </p>
            <p
              className={`border-2 rounded-lg border-gray-800 text-center font-medium px-2 ${
                tdata.status !== "Open"
                  ? tdata.status === "In Progress"
                    ? "text-amber-500"
                    : "text-red-600"
                  : "text-green-600"
              }`}
            >
              {tdata.status}
            </p>
          </div>
          <p className="text-center mt-4 font-medium text-gray-800 text-[20px]">
            {tdata.title}
          </p>
          <p className="font-medium text-[18px] text-gray-800 mt-4">
            Created Date :{" "}
            <span className="font-medium text-[16px]">{tdata.date}</span>
          </p>

          <p className="font-medium text-[18px] text-gray-800 mt-2">
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
