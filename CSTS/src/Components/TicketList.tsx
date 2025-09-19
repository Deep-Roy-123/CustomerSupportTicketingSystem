import { useEffect, useState } from "react";
import type { Input } from "./CreateNewTicket";
import { useNavigate } from "react-router-dom";
import PriorityDropdown from "./PriorityDropdown";
import StatusDropdown from "./StatusDropdown";
import StatusBar from "./StatusBar";
import { MdAddCard, MdLightMode } from "react-icons/md";
import TicketStatusDropdown from "./TicketStatusDropdown";
import DeletedTicket from "./DeletedTicket";
import ActiveTicket from "./ActiveTicket";
import { RiResetRightFill } from "react-icons/ri";
import { FaRegAddressCard, FaRegUserCircle } from "react-icons/fa";
import type { User } from "./Pages/SignUp";
import UserDetails from "./UserDetails";
import { LuTableProperties } from "react-icons/lu";

const TicketList: React.FC = () => {
  const [ticketData, setTicketData] = useState<Input[]>([]);
  const [selectPriority, setSelectPriority] = useState<string>("");
  const [selectStatus, setSelectStatus] = useState<string>("");
  const [filterSearch, setFilterSearch] = useState<string>("");
  const [ticketStatus, setTicketStatus] = useState<string>("Active Ticket");
  const [deleteTicket, setDeleteTicket] = useState<Input[]>([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [view, setView] = useState(false);
  const [filterData, setFilterData] = useState<Input[]>([]);

  const theme:boolean=JSON.parse(localStorage.getItem("darkMode") ?? "false");
  const [darkMode, setDarkMode] = useState(theme);
  

  useEffect(() => {
    const data: Input[] = JSON.parse(
      localStorage.getItem("ticketData") || "[]"
    );
    setTicketData(data);
    const usrId = localStorage.getItem("userId") || "";
    setUserId(usrId);
    console.log(usrId);
    if (usrId === "") {
      navigate("/");
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      setFilterData([]);
      setDeleteTicket([]);
      return;
    }
    let data: Input[] = ticketData;
    if (ticketStatus === "Delete Ticket") {
      data = data.filter(
        (ticket) => ticket.isDeleted === "true" && ticket.userId === userId
      );
    } else if (ticketStatus === "" || ticketStatus === "Active Ticket") {
      data = data.filter(
        (ticket) => ticket.isDeleted === "false" && ticket.userId === userId
      );
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
  }, [
    selectStatus,
    selectPriority,
    filterSearch,
    ticketData,
    ticketStatus,
    userId,
  ]);

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
    setView(false);
  };

  const userData: User[] = JSON.parse(localStorage.getItem("userData") || "[]");

  return (
    <div
      className={`${
        darkMode === true ? "bg-gray-800 text-gray-100" : "bg-gray-200 text-gray-800"
      }`}
    >
      <div className="min-h-screen">
        <div className="flex justify-between items-center px-4 md:px-15 lg:px-20 py-2 rounded-md shadow-md shadow-gray-500">
          <h1 className="text-2xl md:text-4xl font-bold">
            Ticket List
          </h1>
          <div className="flex flex-row gap-2 md:gap-3">
            <button
              className="rounded-md bg-blue-400 shadow-sm shadow-gray-500 h-[50px] px-3 hover:transition-all hover:bg-blue-700 hover:scale-103 hover:delay-300"
              type="button"
              onClick={() => {
                navigate("/createTicket");
              }}
              title="Add Ticket"
            >
              <MdAddCard className="w-[40px] md:w-[60px] h-[40px]" />
            </button>
            <button
              className="rounded-md bg-blue-400 shadow-sm shadow-gray-500 h-[50px] px-3 hover:transition-all hover:bg-blue-700 hover:scale-105 hover:delay-300 "
              type="button"
              onClick={() => {
                setShowForm(true);
              }}
              title="User Details"
            >
              <FaRegUserCircle className="h-[35px] w-[40px] md:w-[60px]" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto w-full mt-[30px] px-[50px]">
          <StatusBar userId={userId} darkMode={darkMode}/>
          <div className="flex flex-row justify-evenly min-w-[1100px] w-full mt-5 rounded-md shadow-md shadow-gray-500 p-3">
            <div className="w-[230px] hover:transition hover:scale-103 hover:delay-300">
              <input
                type="text"
                className={`rounded-md  h-[40px] outline-0 pl-3 w-full border-2 ${(darkMode===true)?'placeholder-gray-200':''}`}
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
              darkMode={darkMode}
              className={`rounded-md px-3 h-[40px] font-medium outline-0 border-2 w-[230px] hover:transition hover:scale-103 hover:delay-300`}
            />
            <StatusDropdown
              value={selectStatus}
              onChange={setSelectStatus}
              darkMode={darkMode}
              isAll={true}
              className={`rounded-md px-3 h-[40px] font-medium outline-0 border-2 w-[230px] hover:transition hover:scale-103 hover:delay-300`}
            />
            <TicketStatusDropdown
              value={ticketStatus}
              onChange={setTicketStatus}
              darkMode={darkMode}
              className={`rounded-md px-3 h-[40px] font-medium outline-0 border-2 w-[230px] hover:transition hover:scale-103 hover:delay-300`}
            />
            <button
              className="rounded-md bg-blue-400 shadow-sm shadow-gray-500 hover:bg-blue-600 px-2 h-[40px] outline-0 pt-1 font-medium text-center hover:transition hover:scale-103 hover:delay-300 flex justify-center"
              onClick={() => {
                setView(!view);
              }}
            >
              {view === true ? (
                <LuTableProperties
                  className="w-[30px] h-[30px] mt-[2px]"
                  title="Table View"
                />
              ) : (
                <FaRegAddressCard
                  className="w-[30px] h-[30px] mt-[2px]"
                  title="Card View"
                />
              )}
            </button>
            <button
              className="rounded-md bg-blue-400 shadow-sm shadow-gray-500 h-[40px] outline-0 w-[46px] font-medium text-center pt-[2px] hover:bg-blue-600 hover:transition hover:scale-103 hover:delay-300 flex justify-center"
              onClick={handleReset}
              title="Reset"
            >
              <RiResetRightFill className="text-center text-[25px] mt-[6px]" />
            </button>
          </div>
          <div>
            {ticketStatus === "Delete Ticket" ? (
              <DeletedTicket
                deleteTicket={deleteTicket}
                handleViewDetails={handleViewDetails}
                view={view}
                darkMode={darkMode}
              />
            ) : (
              <ActiveTicket
                filterData={filterData}
                handleViewDetails={handleViewDetails}
                handleDelete={handleDelete}
                ticketData={ticketData}
                setTicketData={setTicketData}
                view={view}
                darkMode={darkMode}
              />
            )}
          </div>
        </div>
        <div className="absolute top-18 right-2">
          <UserDetails
            showForm={showForm}
            setShowForm={setShowForm}
            userId={userId}
            setUserId={setUserId}
            userData={userData}
            darkMode={darkMode}
          />
        </div>
      </div>
      <div className="fixed bottom-2 right-2 z-100">
        <button
          onClick={() => {
            setDarkMode(!darkMode);
            localStorage.setItem("darkMode",JSON.stringify(!darkMode));
          }}
        >
          <MdLightMode
            className={`h-[40px] w-[40px] ${
              darkMode === true ? "text-yellow-300" : "text-black"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default TicketList;
