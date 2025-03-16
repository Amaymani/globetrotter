import React from "react";

const optionColors = [
  "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-orange-500",
  "bg-red-500", "bg-pink-500", "bg-teal-500", "bg-indigo-500", "bg-lime-500"
];

let usedColors = []; 
let lastFourColors = [];

const getUniqueColor = () => {
  if (usedColors.length === optionColors.length) {
    usedColors = [];
  }

  let randomColor;
  do {
    const randomIndex = Math.floor(Math.random() * optionColors.length);
    randomColor = optionColors[randomIndex];
  } while (lastFourColors.includes(randomColor));

  lastFourColors.push(randomColor);
  if (lastFourColors.length > 4) {
    lastFourColors.shift(); 
  }

  usedColors.push(randomColor);
  return randomColor;
};

const OptionCard = ({ option, onClick, className = "", color = getUniqueColor(), disabled = false, children }) => {
  return (
    <button
      disabled={disabled}
      className={`${className} relative p-4 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 
        ${color} ${disabled ? "cursor-not-allowed opacity-50" : ""}
        shadow-[0px_8px_0px_rgba(0,0,0,0.2)] border-4 border-white overflow-hidden`}
      onClick={onClick}
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-[-100%] w-[150%] h-full bg-white opacity-0 skew-x-[-20deg] 
        transition-transform duration-700 ease-in-out group-hover:opacity-20 group-hover:translate-x-[200%]"></div>
      </div>

      {children || <span>{option}</span>}
    </button>
  );
};

const QuestionCard = ({ question, className = "", children }) => {
  return (
    <div
      className={`${className} w-full mx-auto p-6 border-none bg-white rounded-2xl text-center relative shadow-[0px_8px_16px_rgba(0,0,0,0.2)] overflow-hidden`}
    >
      <div className="absolute bottom-0 left-0 w-full h-[20px] bg-transparent shadow-[inset_0px_-8px_8px_rgba(0,0,0,0.2)]"></div>

      <h2 className="text-lg font-bold text-gray-800">{question}</h2>
      {children}
    </div>
  );
};





export { QuestionCard, OptionCard };