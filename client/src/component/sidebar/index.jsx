import React from "react";
import logo from "../../assets/correct.png";
import user from "../../assets/user.png";
import { AiOutlineUpload } from "react-icons/ai";
import { MdLightMode } from "react-icons/md";
import { MdModeNight } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";

const SideBar = ({ setDarkMode, darkMode, messages }) => {
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleExport = () => {
    // Format the chat data as a string (you can customize this based on your message structure)
    const chatData = messages
      .map((message) => `${message.isBot ? "TextiAi" : "You"}: ${message.text}`)
      .join("\n");

    // Create a Blob containing the chat data
    const blob = new Blob([chatData], { type: "text/plain" });

    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = "chat.txt";

    // Append the link to the DOM and trigger the download
    document.body.appendChild(link);
    link.click();

    // Cleanup: remove the link and revoke the URL
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };
  return (
    <div
      className="h-screen md:w-[350px] max-w-[350px] flex flex-col dark:bg-slate-800  border-r-2 border-neutral-0  dark:border-slate-700
    "
    >
      <div className="flex w-full h-fit p-3 md:justify-between justify-center dark:bg-slate-800 bg-slate-100">
        <div className="flex w-full h-10 items-center  ">
          <img src={logo} alt="logo" className="h-10 w-10 md:mr-1" />
          <h1 className="font-bold text-teal-700 hidden md:block dark:text-slate-100 text-xl items-center">
            TextiAi
          </h1>
        </div>
        <h2 className="font-semibold text-slate-800 hidden md:block dark:text-slate-100">
          v.2.2.7
        </h2>
      </div>
      <div className="flex  h-[64vh] overflow-x-auto gap-2 p-1 item-center dark:bg-slate-800 bg-slate-100 flex-col ">
        {messages?.map((message, index) => (
          <div
            className={` w-fit md:w-full h-[55px] gap-2 text-[17px] items-center dark:bg-slate-700 dark:text-slate-100 justify-center bg-slate-50 rounded px-3 py-3 font-semibold text-slate-700 shadow-sm ${
              message.isBot ? "flex" : "hidden"
            } `}
            key={index}
          >
            <FiMessageSquare className="w-10" />
            <h3 className="  line-clamp-1 truncate hidden md:block">
              {message.text}
            </h3>
          </div>
        ))}
      </div>
      <div className="flex justify-between flex-col pt-2 px-3 gap-2  border-t-2 dark:border-slate-700">
        <div className="flex items-center gap-2 my-2">
          <img src={user} alt="user" className="md:w-11 w-10 cursor-pointer" />
          <h1 className="font-bold hidden md:block text-slate-700 text-xl items-center dark:text-slate-100">
            Atish Fulzade
          </h1>
        </div>
        <div
          className="flex items-center w-fit  md:w-full p-3 font-semibold text-sm gap-2 cursor-pointer dark:bg-slate-700 dark:text-slate-100 bg-slate-200 rounded"
          onClick={handleExport}
        >
          <AiOutlineUpload className="w-7" />
          <p className="hidden md:block">Export Chat</p>
        </div>
        <div
          className="flex items-center w-fit md:w-full p-3 font-semibold text-sm gap-2 cursor-pointer dark:bg-slate-700 dark:text-slate-100  bg-slate-200 rounded "
          onClick={toggleDarkMode}
        >
          {darkMode ? (
            <MdLightMode className="w-7" />
          ) : (
            <MdModeNight className="w-7" />
          )}
          <p className="hidden md:block">{darkMode ? "Light" : "Night"} Mode</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
