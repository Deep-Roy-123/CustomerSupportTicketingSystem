import type React from "react";
import type { Input } from "./CreateNewTicket";

interface DeletedTicketProps{
    deleteTicket: Input[];
    handleViewDetails: (tdata: Input) => void;
}
const DeletedTicket:React.FC<DeletedTicketProps> = ({deleteTicket,handleViewDetails}) => {
    
  return (
    <table className="min-w-[1100px] w-full table-auto border-collapse mt-5">
          <thead className="bg-gray-500 text-white">
            <tr>
              <th className="border-2 font-medium border-black px-1 text-[20px]">
                Id
              </th>
              <th className="border-2 font-medium border-black px-1 text-[20px]">
                Title
              </th>
              <th className="border-2 font-medium border-black px-1 text-[20px]">
                Priority
              </th>
              <th className="border-2 font-medium border-black px-1 text-[20px]">
                Status
              </th>
              <th className="border-2 font-medium border-black px-1 text-[20px]">
                Created Date
              </th>
              <th className="border-2 font-medium border-black px-1 text-[20px]">
                Deleted Date
              </th>
              <th className="border-2 font-medium border-black px-2 text-[20px]">
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
                  className="even:bg-gray-300 odd:bg-gray-100 text-gray-900"
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
                    }`}
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
                    }`}
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
  )
}

export default DeletedTicket