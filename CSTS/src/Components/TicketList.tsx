import { useEffect, useState } from "react";
import type { Input } from "./CreateNewTicket";
import { useNavigate } from "react-router-dom";
import PriorityDropdown from "./PriorityDropdown";
import StatusDropdown from "./StatusDropdown";
import StatusBar from "./StatusBar";
import { MdAddCard } from "react-icons/md";
import TicketStatusDropdown from "./TicketStatusDropdown";
import DeletedTicket from "./DeletedTicket";
import ActiveTicket from "./ActiveTicket";
import { RiResetRightFill } from "react-icons/ri";

const TicketList: React.FC = () => {
  const [ticketData, setTicketData] = useState<Input[]>([]);
  const [selectPriority, setSelectPriority] = useState<string>("");
  const [selectStatus, setSelectStatus] = useState<string>("");
  const [filterSearch, setFilterSearch] = useState<string>("");
  const [ticketStatus, setTicketStatus] = useState<string>("Active Ticket");
  const [deleteTicket, setDeleteTicket] = useState<Input[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data: Input[] = JSON.parse(
      localStorage.getItem("ticketData") || "[]"
    );
    setTicketData(data);
  }, []);

  const [filterData, setFilterData] = useState<Input[]>([]);

  useEffect(() => {
    let data: Input[] = ticketData;
    if (ticketStatus === "Delete Ticket") {
      data = data.filter((ticket) => ticket.isDeleted === "true");
    } else if (ticketStatus === "" || ticketStatus === "Active Ticket") {
      data = data.filter((ticket) => ticket.isDeleted === "false");
    }

    if (selectStatus !== "All" && selectStatus !== "") {
      data = data.filter((ticket) => ticket.status === selectStatus);
    }
    if (selectPriority !== "All" && selectPriority !== "") {
      data = data.filter((ticket) => ticket.priority === selectPriority);
    }
    if (filterSearch) {
      data = data.filter((ticket) =>
        ticket.title.toLowerCase().includes(filterSearch.toLowerCase())
      );
    }

    if (ticketStatus === "Delete Ticket") {
      setDeleteTicket(data);
    } else {
      setFilterData(data);
    }
  }, [selectStatus, selectPriority, filterSearch, ticketData, ticketStatus]);

  const handleDelete = (id: string) => {
    const updatedData = ticketData.map((ticket) => {
      if (ticket.id === id && ticket.status === "Resolved") {
        const deleteTime = new Date();
        const date = deleteTime.toLocaleString();
        ticket.deletedTime = date;
        return { ...ticket, isDeleted: "true" };
      }
      return ticket;
    });
    setTicketData(updatedData);

    localStorage.setItem("ticketData", JSON.stringify(updatedData));
  };

  const handleViewDetails = (tdata: Input) => {
    navigate(`/ticket/:${tdata.id}`, { state: { ticket: tdata } });
  };

  const handleReset = () => {
    setSelectStatus("");
    setSelectPriority("");
    setTicketStatus("Active Ticket");
    setFilterSearch("");
  };

  return (
    <div className="bg-gray-100 h-full md:h-screen">
      <div className="flex justify-between items-center px-5 md:px-15 lg:px-20 py-2 rounded-md bg-white shadow-lg shadow-gray-400">
        <h1 className="text-2xl md:text-4xl text-gray-900 font-bold">
          Ticket List
        </h1>
        <button
          className="font-medium md:text-[22px] rounded-md text-gray-900 bg-blue-400 h-[50px] px-3 hover:transition-all hover:bg-blue-700 hover:scale-103 hover:delay-300"
          type="button"
          onClick={() => {
            navigate("/");
          }}
          title="Add Ticket"
        >
          <MdAddCard className="w-[60px] h-[40px]" />
        </button>
      </div>
      <div className="overflow-x-auto w-full mt-[30px] px-[50px]">
        <StatusBar />
        <div className="flex flex-row justify-evenly min-w-[1100px] w-full mt-5 rounded-md bg-gray-100 shadow-md shadow-gray-500 p-3">
          <div className="bg-gray-200 w-[250px] hover:transition hover:scale-103 hover:delay-300 hover:bg-gray-300">
            <input
              type="text"
              className="rounded-md  h-[40px] outline-0 text-gray-900 pl-3 w-full border-2"
              placeholder="Enter Ticket Title"
              value={filterSearch}
              onChange={(e) => {
                setFilterSearch(e.target.value);
              }}
            />
          </div>
          <PriorityDropdown
            value={selectPriority}
            onChange={setSelectPriority}
            isAll={true}
            className={`rounded-md px-3 h-[40px] text-gray-900 font-medium bg-gray-200 outline-0 border-2 w-[250px] hover:transition hover:scale-103 hover:delay-300 hover:bg-gray-300`}
          />
          <StatusDropdown
            value={selectStatus}
            onChange={setSelectStatus}
            isAll={true}
            className={`rounded-md px-3 h-[40px] font-medium bg-gray-200 text-gray-900 outline-0 border-2 w-[250px] hover:transition hover:scale-103 hover:delay-300 hover:bg-gray-300`}
          />
          <TicketStatusDropdown
            value={ticketStatus}
            onChange={setTicketStatus}
            className={`rounded-md px-3 h-[40px] font-medium bg-gray-200 text-gray-900 outline-0 border-2 w-[250px] hover:transition hover:scale-103 hover:delay-300 hover:bg-gray-300`}
          />
          <button
            className="rounded-md  h-[40px] outline-0 text-gray-900 bg-gray-200 w-[40px] font-medium text-center border-2 hover:transition hover:scale-103 hover:delay-300 hover:bg-gray-300 flex justify-center"
            onClick={handleReset}
            title="Reset"
          >
            <RiResetRightFill className="text-center text-[24px] mt-[6px]"/>
          </button>
        </div>
        {ticketStatus === "Delete Ticket" ? (
          <DeletedTicket
            deleteTicket={deleteTicket}
            handleViewDetails={handleViewDetails}
          />
        ) : (
          <ActiveTicket
            filterData={filterData}
            handleViewDetails={handleViewDetails}
            handleDelete={handleDelete}
            ticketData={ticketData}
            setTicketData={setTicketData}
          />
        )}
      </div>
    </div>
  );
};

export default TicketList;
