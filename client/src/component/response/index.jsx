// Response.jsx
import React, { useEffect, useState } from "react";
import user from "../../assets/user.png";
import logo from "../../assets/correct.png";
import { TypeAnimation } from "react-type-animation";

const Response = ({ messages, responseContainerRef }) => {
  return (
    <div
      ref={responseContainerRef}
      className="w-full dark:bg-slate-800 h-[85vh] px-[8vw] md:px-[280px] py-5 overflow-x-auto"
    >
      {messages.map((message, index) => (
        <div key={index} className="flex flex-col">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <img
                src={message.isBot ? logo : user}
                className="w-5 h-5"
                alt="logo"
              />
              <p className="dark:text-slate-100 text-slate-800 font-medium">
                {message.isBot ? "TextiAi" : "You"}
              </p>
            </div>
            <div className="ps-10 mb-3 text-slate-800 dark:text-slate-200 mt-2">
              {message.isBot ? (
                <TypeAnimation
                  sequence={[message.text]}
                  cursor={false}
                  speed={70}
                />
              ) : (
                message.text
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Response;
