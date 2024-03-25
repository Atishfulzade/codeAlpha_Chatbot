import React, { useEffect, useRef, useState } from "react";
import SideBar from "./component/sidebar";
import InputForm from "./component/input";
import Response from "./component/response";
import { io } from "socket.io-client";

const server = "https://code-alpha-chatbot-server.vercel.app/";
const socket = io(server);

function App() {
  const [inputData, setInputData] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const responseContainerRef = useRef(null);

  const scrollToBottom = () => {
    responseContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputSubmit = (inputValue) => {
    if (inputValue.trim() !== "") {
      // Emitting the input value to the server
      socket.emit("message", { message: inputValue });
      // Updating the input data state
      setInputData(inputValue);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on("message", (data) => {
      // Update messages state with both user and bot messages
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputData, isBot: false },
        { text: data.message, isBot: true }, // Use the received data directly as a string
      ]);
    });

    // Cleanup function to remove the event listener
    return () => {
      socket.off("message");
    };
  }, [inputData]);

  return (
    <div
      className={`w-full h-screen bg-slate-100 font-sans flex ${
        darkMode ? "dark" : ""
      }`}
    >
      <SideBar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        messages={messages}
      />
      <div className="flex flex-col w-full justify-center items-center">
        <Response
          messages={messages}
          responseContainerRef={responseContainerRef}
        />
        <InputForm onSubmit={handleInputSubmit} />
      </div>
    </div>
  );
}

export default App;
