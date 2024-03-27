import React, { useEffect, useRef, useState } from "react";
import SideBar from "./component/sidebar";
import InputForm from "./component/input";
import Response from "./component/response";
import { io } from "socket.io-client";

const server = "https://code-alpha-chatbot-sigma.vercel.app/";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const responseContainerRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection only once
    socketRef.current = io(server);

    // Define event listeners
    socketRef.current.on("message", (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.message, isBot: true },
      ]);
    });

    // Cleanup function to disconnect socket when component unmounts
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleInputSubmit = (inputValue) => {
    if (inputValue.trim() !== "") {
      // Emitting the input value to the server
      socketRef.current.emit("message", { message: inputValue });
      // Update messages state with the user message
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputValue, isBot: false },
      ]);
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the message container
    responseContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
