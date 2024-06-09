import AddGroupExpense from "./AddGroupExpense";
import { useState } from "react";

const InspectGroup = ({ group, toggleInspectGroupOverlay }) => {
  const [addGroupExpenseOverlay, setAddGroupExpenseOverlay] = useState(false);

  const toggleAddGroupExpenseOverlay = () => {
    setAddGroupExpenseOverlay(!addGroupExpenseOverlay);
  };

  return (
    <>
      {addGroupExpenseOverlay && (
        <AddGroupExpense group={group} toggleAddGroupExpenseOverlay={toggleAddGroupExpenseOverlay} />
      )}
      <div className={`fixed inset-0 flex items-center justify-center z-50 ${addGroupExpenseOverlay ? 'hidden' : ''}`}>
        <div className="fixed inset-0 justify-center bg-black opacity-30"></div>
        <div className="w-80 h-96 bg-white rounded-lg shadow-lg p-8 z-50 relative flex flex-col">
          <div className="flex justify-center mb-4">
            <h2 className="text-xl text-stone-500 font-semibold">{group.name}</h2>
          </div>
          <div className="mb-4">
            <h3 className="text-stone-500 text-lg font-semibold">Owner:</h3>
            <p className="text-black">{group.owner.username}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-stone-500 text-lg font-semibold">Members:</h3>
            <ul>
              {group.members.map((member, index) => (
                <li className="text-black" key={index}>{member.username}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-stone-500 text-lg font-semibold">Expenses:</h3>
            <ul>
              {group.expenses.map((expense, index) => (
                <li className="text-black" key={index}>{expense.description}</li>
              ))}
            </ul>
          </div>
          <button
            className="px-4 py-2 bg-stone-400 text-white rounded-lg hover:bg-stone-500 mb-4"
            onClick={toggleAddGroupExpenseOverlay}
          >
            Add Expense
          </button>
          <button onClick={toggleInspectGroupOverlay} className="absolute top-1 right-4 text-gray-500 hover:text-gray-800">
            x
          </button>
        </div>
      </div>
    </>
  );
};

export default InspectGroup;