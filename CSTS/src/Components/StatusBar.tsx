import type React from "react";
import type { Input } from "./CreateNewTicket";

interface StatusBarProps {
  userId: string;
  darkMode: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({ userId, darkMode }) => {
  let data: Input[] = JSON.parse(localStorage.getItem("ticketData") || "[]");
  const deleteTicket = data.filter(
    (d) => d.isDeleted === "true" && d.userId === userId
  ).length;
  const activeTicket = data.filter(
    (d) => d.isDeleted === "false" && d.userId === userId
  );
  const open = activeTicket.filter(
    (d) => d.status === "Open" && d.userId === userId
  ).length;
  const inProgress = activeTicket.filter(
    (d) => d.status === "In Progress" && d.userId === userId
  ).length;
  const resolved = activeTicket.filter(
    (d) => d.status === "Resolved" && d.userId === userId
  ).length;

  const low = activeTicket.filter(
    (d) => d.priority === "Low" && d.userId === userId
  ).length;
  const medium = activeTicket.filter(
    (d) => d.priority === "Medium" && d.userId === userId
  ).length;
  const high = activeTicket.filter(
    (d) => d.priority === "High" && d.userId === userId
  ).length;
  return (
    <div
      className={`min-w-[1100px] w-full ${
        darkMode === true
          ? "bg-gray-800 text-gray-200"
          : "bg-gray-200 text-gray-800"
      }`}
    >
      <div className="flex flex-row justify-evenly h-27">
        <div className="w-[300px] rounded-md shadow-md shadow-gray-500 hover:transition hover:scale-105 hover:delay-300">
          <p className="text-center text-[22px] mt-3 font-medium">Ticket</p>
          <div className="flex flex-row justify-evenly">
            <p className="text-[18px] font-medium">
              Active Ticket
              <br />{" "}
              <strong className="pl-13 font-medium">
                {activeTicket.length}
              </strong>
            </p>
            <p className="text-[18px] font-medium">
              Delete Ticket <br />{" "}
              <strong className="pl-13 font-medium">{deleteTicket}</strong>
            </p>
          </div>
        </div>
        <div className="w-[300px] rounded-md shadow-md shadow-gray-500 hover:transition hover:scale-105 hover:delay-300 ">
          <p className="text-center text-[22px] mt-3 font-medium">Status</p>
          <div className=" flex flex-row justify-evenly">
            <p className="text-[18px] font-medium">
              Open <br /> <strong className="pl-4 font-medium">{open}</strong>
            </p>
            <p className="text-[18px] font-medium">
              In Progress <br />{" "}
              <strong className="pl-9 font-medium">{inProgress}</strong>
            </p>
            <p className="text-[18px] font-medium">
              {" "}
              Resolved <br />{" "}
              <strong className="pl-7 font-medium">{resolved}</strong>
            </p>
          </div>
        </div>
        <div className="w-[300px] rounded-md shadow-md shadow-gray-500 hover:transition hover:scale-105 hover:delay-300">
          <p className="text-center text-[22px] mt-3 font-medium">Priority</p>
          <div className=" flex flex-row justify-evenly">
            <p className="text-[18px] font-medium">
              Low <br /> <strong className="pl-2 font-medium">{low}</strong>
            </p>
            <p className="text-[18px] font-medium">
              Medium <br />{" "}
              <strong className="pl-7 font-medium">{medium}</strong>
            </p>
            <p className="text-[18px] font-medium">
              {" "}
              High <br /> <strong className="pl-3 font-medium">{high}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
