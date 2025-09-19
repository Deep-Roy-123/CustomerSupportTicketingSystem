import type React from "react";
import type { Input } from "./CreateNewTicket";
import DeletedTicketCardView from "./DeletedTicketCardView";

interface DeletedTicketProps {
  deleteTicket: Input[];
  handleViewDetails: (tdata: Input) => void;
  view: boolean;
  darkMode: boolean;
}
const DeletedTicket: React.FC<DeletedTicketProps> = ({
  deleteTicket,
  handleViewDetails,
  view,
  darkMode,
}) => {
  return (
    <div
      className={`${
        darkMode === true
          ? "bg-gray-800 text-gray-200 border-gray-200"
          : "bg-gray-200 text-gray-800 border-gray-800"
      }`}
    >
      {view === false && (
        <table className="min-w-[1100px] w-full table-auto border-collapse mt-5">
          <thead
            className={`${
              darkMode === true
                ? "bg-gray-800 text-gray-200"
                : "bg-gray-700 text-gray-200"
            }`}
          >
            <tr>
              <th
                className={`border-2 font-medium px-1 text-[20px] ${
                  darkMode === true ? "" : "border-gray-800"
                }`}
              >
                Id
              </th>
              <th
                className={`border-2 font-medium px-1 text-[20px] ${
                  darkMode === true ? "" : "border-gray-800"
                }`}
              >
                Title
              </th>
              <th
                className={`border-2 font-medium px-1 text-[20px] ${
                  darkMode === true ? "" : "border-gray-800"
                }`}
              >
                Priority
              </th>
              <th
                className={`border-2 font-medium px-1 text-[20px] ${
                  darkMode === true ? "" : "border-gray-800"
                }`}
              >
                Status
              </th>
              <th
                className={`border-2 font-medium px-1 text-[20px] ${
                  darkMode === true ? "" : "border-gray-800"
                }`}
              >
                Created Date
              </th>
              <th
                className={`border-2 font-medium px-1 text-[20px] ${
                  darkMode === true ? "" : "border-gray-800"
                }`}
              >
                Deleted Date
              </th>
              <th
                className={`border-2 font-medium px-2 text-[20px] ${
                  darkMode === true ? "" : "border-gray-800"
                }`}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {deleteTicket.map((tdata) => {
              console.log(tdata);
              return (
                <tr
                  key={tdata.id}
                  className={`${
                    darkMode === true
                      ? "even:bg-gray-700 odd:bg-gray-500"
                      : "even:bg-gray-300 odd:bg-gray-100"
                  }`}
                >
                  <td className="border-2 text-center font-medium px-1">
                    {tdata.id}
                  </td>
                  <td className="border-2 text-center font-medium px-1">
                    {tdata.title}
                  </td>
                  <td
                    className={`border-2 text-center font-medium px-1 ${
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
                  </td>
                  <td
                    className={`border-2 text-center font-medium px-1 ${
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
                  </td>
                  <td className="border-2 text-center font-medium px-1">
                    {tdata.date}
                  </td>
                  <td className="border-2 px-1 text-center font-medium">
                    {tdata.deletedTime}
                  </td>
                  <td className="border-2 p-2 text-center">
                    <button
                      className="rounded-md p-2 font-medium bg-green-600 text-white hover:transition-all hover:bg-green-700 hover:scale-103 hover:delay-300"
                      onClick={() => {
                        handleViewDetails(tdata);
                      }}
                    >
                      View Detail
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {view === true && (
        <DeletedTicketCardView
          deleteTicket={deleteTicket}
          handleViewDetails={handleViewDetails}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default DeletedTicket;
