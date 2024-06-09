import React from 'react';

const InspectExpense = ({ expense, toggleInspectExpenseOverlay }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="w-96 bg-white rounded-lg shadow-lg p-8 z-50 relative">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl text-gray-800 font-semibold">{expense.description}</h2>
          <button onClick={toggleInspectExpenseOverlay} className="text-gray-500 hover:text-gray-800">
            X
          </button>
        </div>
        <div className="mb-4">
          <p className='text-black'><span className="text-stone-500 text-lg font-semibold">Amount Paid:</span> {expense.amountPaid} €</p>
        </div>
        <div className="mb-4">
          <p className='text-black'><span className="text-stone-500 text-lg font-semibold">Paid By:</span> {expense.paidBy.username}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-stone-500 text-lg font-semibold">Payees:</h3>
          <ul>
            {expense.splitWith.map((user, index) => (
              <li className='text-black' key={index}>{user.username}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <p className='text-black'><span className="text-stone-500 text-lg font-semibold">Division Type:</span> {expense.splitType}</p>
        </div>
      </div>
    </div>
  );
};

export default InspectExpense;