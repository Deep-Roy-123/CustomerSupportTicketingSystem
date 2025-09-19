import type React from "react";
import type { Input } from "./CreateNewTicket";
import StatusDropdown from "./StatusDropdown";
import { type Dispatch, type SetStateAction } from "react";
import ActiveTicketCardView from "./ActiveTicketCardView";

interface ActiveTicketProps {
  filterData: Input[];
  handleViewDetails: (tdata: Input) => void;
  handleDelete: (id: string) => void;
  ticketData: Input[];
  setTicketData: Dispatch<SetStateAction<Input[]>>;
  view: boolean;
  darkMode: boolean;
}

const ActiveTicket: React.FC<ActiveTicketProps> = ({
  filterData,
  handleViewDetails,
  handleDelete,
  ticketData,
  setTicketData,
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
        <table className="min-w-[1100px] w-full table-auto border-collapse mt-5 mb-10">
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
                className={`border-2 font-medium px-2 text-[20px] ${
                  darkMode === true ? "" : "border-gray-800"
                }`}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((tdata) => {
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
                    className={`border-2 text-center border-black font-medium px-1 ${
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
                    className={`border-2 border-black text-center font-medium px-1 ${
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
                  <td className="border-2 px-2 w-[350px]">
                    <div className="flex justify-evenly py-2 gap-2">
                      <button
                        className="rounded-md px-3 font-medium bg-green-600 text-white hover:transition-all hover:bg-green-700 hover:scale-103 hover:delay-300"
                        onClick={() => {
                          handleViewDetails(tdata);
                        }}
                      >
                        View Detail
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
                            localStorage.setItem(
                              "ticketData",
                              JSON.stringify(updated)
                            );
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
                          tdata.status !== "Resolved"
                            ? "Ticket is not resolved"
                            : ""
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {view === true && (
        <ActiveTicketCardView
          filterData={filterData}
          ticketData={ticketData}
          setTicketData={setTicketData}
          handleViewDetails={handleViewDetails}
          handleDelete={handleDelete}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default ActiveTicket;
