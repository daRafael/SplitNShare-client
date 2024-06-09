import React from "react";
import { useState } from "react";
import AddExpense from "../components/AddExpense";

const Homepage = () => {
  const [ addExpenseOverlay, setAddExpenseOverlay] = useState(false)

  const toggleAddExpenseOverlay = () => {
    setAddExpenseOverlay(!addExpenseOverlay)
  }

  return (
    <>
    {addExpenseOverlay && (
        <AddExpense toggleAddExpenseOverlay={toggleAddExpenseOverlay} />
    )}
    <div className="pt-20 pb-4 h-full pr-2 flex flex-col flex-1">
      <div className="flex rounded-md flex-col items-center h-screen pr-4 p-4 bg-lime-200">
        <div className="bg-white rounded-md flex flex-row items-center justify-between w-full">
          <span className="m-4 text-stone-400 text-xl font-bold">Homepage</span>
          <div className="flex flex-row items-center">
            <button
              onClick={toggleAddExpenseOverlay}
              className="mr-4 text-xs p-2 rounded-full text-white bg-stone-400 hover:bg-stone-500"
            >
              Add Expense
            </button>
          </div>
        </div>


       <div className="bg-white rounded-md flex flex-col items-center justify-center w-full h-full mt-4">
          <h1 className="flex-col justify-center items-center text-5xl p-4 text-stone-400 font-bold">SplitNShare</h1>
          <h1 className="flex-col justify-center items-center text-5xl p-4 text-stone-400 font-bold">Fair and Square!</h1>
        </div>
        </div>
    </div>
    </>
  );
};

export default Homepage;
