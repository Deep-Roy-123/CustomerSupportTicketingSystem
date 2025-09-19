import React, { type Dispatch, type SetStateAction } from "react";
import type { Input } from "./CreateNewTicket";
import StatusDropdown from "./StatusDropdown";
interface ActiveTicketCardViewProps {
  filterData: Input[];
  ticketData: Input[];
  setTicketData: Dispatch<SetStateAction<Input[]>>;
  handleViewDetails: (tdata: Input) => void;
  handleDelete: (id: string) => void;
  darkMode: boolean;
}

const ActiveTicketCardView: React.FC<ActiveTicketCardViewProps> = ({
  filterData,
  ticketData,
  setTicketData,
  handleViewDetails,
  handleDelete,
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
      {filterData.map((tdata) => (
        <div
          className={`rounded-md p-3 my-8 w-[320px] hover:transition hover:scale-105 mt-8 shadow-md shadow-gray-500 ${
            darkMode === true
              ? "bg-gray-800 text-gray-200"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          <div className="flex flex-row justify-between">
            <p className="text-blue-500 font-medium">{tdata.id}</p>
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
          <div className="flex justify-evenly py-2 gap-2 mt-4">
            <button
              className="rounded-md px-3 font-medium bg-green-600 text-white hover:transition-all hover:bg-green-700 hover:scale-103 hover:delay-300 w-[80px]"
              onClick={() => {
                handleViewDetails(tdata);
              }}
            >
              View
            </button>

            <div>
              <StatusDropdown
                value={tdata.status}
                onChange={(value) => {
                  const updated = ticketData.map((ticket) => {
                    if (ticket.id === tdata.id) {
                      return { ...ticket, status: value };
                    }
                    return ticket;
                  });
                  setTicketData(updated);
                  localStorage.setItem("ticketData", JSON.stringify(updated));
                }}
                isAll={false}
                className={`rounded-md px-3 h-[40px] font-medium outline-0 w-[110px] text-white bg-yellow-500 hover:transition-all hover:bg-yellow-600 hover:scale-103 hover:delay-300`}
              />
            </div>
            <button
              className={` text-white rounded-md py-2 w-[80px] font-medium ${
                tdata.status !== "Resolved"
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-500 hover:transition-all hover:bg-red-600 hover:scale-103 hover:delay-300"
              }`}
              onClick={() => handleDelete(tdata.id)}
              disabled={tdata.status !== "Resolved"}
              title={
                tdata.status !== "Resolved" ? "Ticket is not resolved" : ""
              }
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActiveTicketCardView;
