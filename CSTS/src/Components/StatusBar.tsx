import type React from "react";
import type { Input } from "./CreateNewTicket";

interface StatusBarProps{
    userId: string;
}

const StatusBar:React.FC<StatusBarProps> = ({userId}) => {
  let data: Input[] = JSON.parse(
        localStorage.getItem("ticketData") || "[]"
      );
  const deleteTicket=data.filter((d)=>d.isDeleted==="true" && d.userId===userId).length;
  const activeTicket=data.filter((d)=>d.isDeleted==="false" && d.userId===userId);
  const open=activeTicket.filter((d)=>d.status==='Open' && d.userId===userId).length;
  const inProgress=activeTicket.filter((d)=>d.status==='In Progress' && d.userId===userId).length;
  const resolved=activeTicket.filter((d)=>d.status==='Resolved' && d.userId===userId).length;

  const low=activeTicket.filter((d)=>d.priority==="Low" && d.userId===userId).length;
  const medium=activeTicket.filter((d)=>d.priority==="Medium" && d.userId===userId).length;
  const high=activeTicket.filter((d)=>d.priority==="High" && d.userId===userId).length;
  return (
    <div className="min-w-[1100px] w-full">
        <div className="flex flex-row justify-evenly h-27">
            <div className="w-[300px] rounded-md bg-gray-100 shadow-lg shadow-gray-500 hover:transition hover:scale-105 hover:delay-300 hover:bg-gray-200">
                <p className="text-center text-[22px] mt-3 font-medium text-gray-800">Ticket</p>
                <div className="flex flex-row justify-evenly">
                    <p className="text-[18px] font-medium">Active Ticket<br /> <strong className="pl-13 font-medium">{activeTicket.length}</strong></p>
                    <p className="text-[18px] font-medium">Delete Ticket <br /> <strong className="pl-13 font-medium">{deleteTicket}</strong></p>
                </div>
            </div>
            <div className="w-[300px] rounded-md bg-gray-100 shadow-lg shadow-gray-500 hover:transition hover:scale-105 hover:delay-300 hover:bg-gray-200">
                <p className="text-center text-[22px] mt-3 font-medium text-gray-800">Status</p>
                <div className=" flex flex-row justify-evenly">
                    <p className="text-[18px] font-medium">Open <br /> <strong className="pl-4 font-medium">{open}</strong></p>
                    <p className="text-[18px] font-medium">In Progress <br /> <strong className="pl-9 font-medium">{inProgress}</strong></p>
                    <p className="text-[18px] font-medium"> Resolved <br /> <strong className="pl-7 font-medium">{resolved}</strong></p>
                </div>
            </div>
            <div className="w-[300px] rounded-md bg-gray-100 shadow-lg shadow-gray-500 hover:transition hover:scale-105 hover:delay-300 hover:bg-gray-200">
                <p className="text-center text-[22px] mt-3 font-medium text-gray-800">Priority</p>
                <div className=" flex flex-row justify-evenly">
                    <p className="text-[18px] font-medium">Low <br /> <strong className="pl-2 font-medium">{low}</strong></p>
                    <p className="text-[18px] font-medium">Medium <br /> <strong className="pl-7 font-medium">{medium}</strong></p>
                    <p className="text-[18px] font-medium"> High <br /> <strong className="pl-3 font-medium">{high}</strong></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StatusBar