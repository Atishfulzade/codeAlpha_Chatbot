// InputForm.jsx
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";

const InputForm = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(inputValue);
    setInputValue("");
  };
  const enterPressed = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="w-full h-[15vh] px-[4vw] md:px-[280px] dark:bg-slate-800">
      <div className="flex border rounded-lg mt-4 dark:border-slate-600 border-slate-300 items-center px-2">
        <input
          type="text"
          placeholder="Write something..."
          value={inputValue}
          onKeyDown={enterPressed}
          onChange={handleChange}
          className="w-[90%] md:w-[90%] h-16 bg-transparent outline-none border-none indent-3 text-[20px] text-slate-800 dark:text-slate-100 mr-2"
        />
        <button
          className="text-2xl bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-50 rounded-lg h-11 md:px-4 px-3"
          onClick={handleSubmit}
        >
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default InputForm;
