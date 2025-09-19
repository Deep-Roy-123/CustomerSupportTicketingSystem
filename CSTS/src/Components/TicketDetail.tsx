import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Input } from "./CreateNewTicket";
import StatusDropdown from "./StatusDropdown";
import { RiListView } from "react-icons/ri";
import { MdAddCard, MdLightMode } from "react-icons/md";
import CommentsForm from "./CommentsForm";

export interface Comment {
  id: string;
  comment: string;
  time: string;
}
export const initComment = {
  id: "",
  comment: "",
  time: "",
};

const TicketDetail: React.FC = () => {
  const [ticketData, setTicketData] = useState<Input[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [showForm, setShowForm] = useState(false);
  const [showTicket, setShowTicket] = useState(true);
  const { ticket } = location.state || {};
  const [currentTicket, setCurrentTicket] = useState(ticket);
  
  const theme:boolean=JSON.parse(localStorage.getItem("darkMode") ?? "false");
  const [darkMode, setDarkMode] = useState(theme);

  const data: Input[] = JSON.parse(localStorage.getItem("ticketData") || "[]");
  const uid: string = localStorage.getItem("userId") || "";
  useEffect(() => {
    setTicketData(data);
    if (uid === "") {
      navigate("/");
    }
  }, [uid]);

  useEffect(() => {
    const updatedData = ticketData.find((td) => td.id === ticket.id);
    if (updatedData) {
      setCurrentTicket(updatedData);
    }
  }, [ticketData, ticket.id]);

  const commentsData: Comment[] = JSON.parse(
    localStorage.getItem("commentsData") || "[]"
  );

  const handleDeleteTicket = (id: string) => {
    const updatedData = ticketData.map((ticket) => {
      if (ticket.id === id && ticket.status === "Resolved") {
        const deleteTime = new Date();
        const date = deleteTime.toLocaleString();
        ticket.deletedTime = date;
        setShowTicket(false);
        navigate("/dashboard");
        return { ...ticket, isDeleted: "true" };
      }
      return ticket;
    });
    setTicketData(updatedData);
    localStorage.setItem("ticketData", JSON.stringify(updatedData));
  };

  return (
    <div className={`flex flex-col relative min-h-screen ${(darkMode===true)?'bg-gray-800 text-gray-200 border-gray-200':'bg-gray-200 text-gray-800 border-gray-800'}`}>
      <div className="flex justify-between items-center px-5 md:px-15 lg:px-20 rounded-md shadow-md shadow-gray-500 py-2 gap-10">
        <p className="text-2xl md:text-4xl font-bold">Ticket Details</p>
        <div className="flex flex-row gap-2 md:gap-5">
          <button
            className="font-medium text-[18px] md:text-[22px] rounded-md bg-blue-400 h-[50px] px-2 mt-2 md:px-3 hover:transition-all hover:bg-blue-600 hover:scale-103 hover:delay-300"
            type="button"
            onClick={() => {
              navigate("/createTicket");
            }}
            title="Add Ticket"
          >
            <MdAddCard className="h-[40px] w-[60px]" />
          </button>
          <button
            className="font-medium text-[18px] md:text-[22px] rounded-md bg-blue-400 h-[50px] md:h-[50px] mt-2 px-2 md:px-3 hover:transition-all hover:bg-blue-600 hover:scale-103 hover:delay-300"
            type="button"
            onClick={() => {
              navigate("/dashboard");
            }}
            title="Ticket List"
          >
            <RiListView className="h-[40px] w-[60px]" />
          </button>
        </div>
      </div>
      {showTicket && (
        <div className="flex justify-center">
          <div className="rounded-lg w-[310px] md:w-[700px] lg:w-[900px] shadow-md mx-2 md:mx-5 lg:mx-10 shadow-gray-500  mt-10 mb-10">
            <p className="text-[22px] md:text-2xl font-medium mt-3 text-center">
              {currentTicket.title}
            </p>
            <hr className="mx-3 mt-2 border-[1.5px]" />
            <p
              className={`px-3 text-[18px] font-medium mt-2 ${
                currentTicket.priority !== "Low"
                  ? currentTicket.priority === "Medium"
                    ? "text-amber-500"
                    : "text-green-600"
                  : "text-red-600"
              }`}
            >
              <span className="text-[20px]">Priority :</span>{" "}
              {currentTicket.priority}
            </p>
            <div className="flex justify-between px-3 mt-2">
              <p
                className={`text-[18px] font-medium mt-2 ${
                  currentTicket.status !== "Open"
                    ? currentTicket.status === "In Progress"
                      ? "text-amber-500"
                      : "text-red-600"
                    : "text-green-600"
                }`}
              >
                <span className="text-[20px]">Status :</span>{" "}
                {currentTicket.status}
              </p>

              {/*Status StatusDropdown */}

              {currentTicket.isDeleted === "false" && (
                <div className="mt-[-20px]">
                  <label
                    htmlFor="status"
                    className="font-medium pl-2 text-[18px]"
                  >
                    Update Status
                  </label>
                  <StatusDropdown
                    value={currentTicket.status}
                    onChange={(value) => {
                      const updated = ticketData.map((td) => {
                        if (td.id === currentTicket.id) {
                          return { ...td, status: value };
                        }
                        return td;
                      });
                      setTicketData(updated);
                      localStorage.setItem(
                        "ticketData",
                        JSON.stringify(updated)
                      );
                    }}
                    isAll={false}
                    className={`rounded-md px-3 h-[40px] font-medium outline-0 w-[110px] ml-3 md:ml-[-30px] md:w-[180px] bg-blue-400 hover:transition-all hover:bg-blue-600 hover:scale-103 hover:delay-300`}
                  />
                </div>
              )}
            </div>

            <fieldset className="border-2 mx-3 rounded-md mt-2">
              <legend className="px-2 text-[20px] font-medium mt-2">
                Created Date{" "}
              </legend>
              <p className="text-[16px] font-medium text-center pb-2">
                {currentTicket.date}
              </p>
            </fieldset>

            {currentTicket.isDeleted === "true" && (
              <fieldset className="border-2 mx-3 rounded-md mt-2">
                <legend className="px-1 text-start text-[20px] font-medium mt-2">
                  Deleted Date{" "}
                </legend>
                <p className="text-[16px] font-medium text-center pb-2">
                  {currentTicket.deletedTime}
                </p>
              </fieldset>
            )}

            <fieldset className="border-2 mx-3 rounded-md mt-4">
              <legend className="px-2 text-[20px] font-medium mt-2">
                Description{" "}
              </legend>
              <p className="text-[16px] font-medium text-center pb-2">
                {currentTicket.description}
              </p>
            </fieldset>

            <div className="flex flex-col md:flex-row justify-between mt-4 mb-5 mx-3 gap-3 md:gap-10">
              <fieldset className="rounded-md w-full md:mt-2 border-2 px-2">
                <legend className="font-medium text-center text-[20px] px-2">
                  Comments
                </legend>
                <ul className="mt-1 my-2 py-1 px-2 w-full ">
                  {commentsData
                    .filter((cmnt) => cmnt.id === ticket.id)
                    .map((cmnt, indx) => (
                      <li key={indx} className="mx-2 my-2">
                        <p>
                          {indx + 1}. {cmnt.comment}
                        </p>
                        <p className="text-end">({cmnt.time})</p>
                      </li>
                    ))}
                </ul>
              </fieldset>
            </div>
            <div className=" mx-3 mt-2">
              <button
                className="rounded-md bg-blue-400 py-2 h-[50px]  w-full text-xl font-medium flex justify-center hover:transition-all hover:bg-blue-600 hover:scale-101 hover:delay-300"
                onClick={() => {
                  setShowForm(true);
                }}
              >
                Add Comment
              </button>
            </div>
            <div className=" pb-3 mx-3 mt-4">
              {currentTicket.isDeleted === "false" && (
                <button
                  className={`rounded-md text-xl w-full h-[50px] font-medium ${
                    currentTicket.status !== "Resolved"
                      ? "bg-blue-200 text-white cursor-not-allowed"
                      : "bg-blue-400  hover:transition-all hover:bg-blue-600 hover:scale-101 hover:delay-300"
                  }`}
                  onClick={() => {
                    handleDeleteTicket(currentTicket.id);
                  }}
                  disabled={currentTicket.status !== "Resolved"}
                  title={
                    currentTicket.status !== "Resolved"
                      ? "Ticket is not resolved"
                      : ""
                  }
                >
                  Delete Ticket
                </button>
              )}
            </div>

            <CommentsForm
              showForm={showForm}
              setShowForm={setShowForm}
              ticket={ticket}
              darkMode={darkMode}
            />
          </div>
        </div>
      )}
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

export default TicketDetail;
