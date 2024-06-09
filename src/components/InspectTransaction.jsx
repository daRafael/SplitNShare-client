const InspectTransaction = ({ transaction, toggleInspectTransactionOverlay }) => {
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="w-96 bg-white rounded-lg shadow-lg p-8 z-50 relative">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl text-gray-800 font-semibold">Transaction Details</h2>
          <button onClick={toggleInspectTransactionOverlay} className="text-gray-500 hover:text-gray-800">
            X
          </button>
        </div>
        <div className="mb-4">
          <p className="text-black" ><span className="text-stone-500 text-lg font-semibold">Payer:</span> {transaction.payer.username}</p>
        </div>
        <div className="mb-4">
          <p className="text-black" ><span className="text-stone-500 text-lg font-semibold">Payee:</span> {transaction.payee.username}</p>
        </div>
        <div className="mb-4">
          <p className="text-black" ><span className="text-stone-500 text-lg font-semibold">Amount:</span> {transaction.amount} {transaction.currency}</p>
        </div>
        <div className="mb-4">
          <p className="text-black" ><span className="text-stone-500 text-lg font-semibold">Expense Description:</span> {transaction.expense.description}</p>
        </div>
        <div className="mb-4">
          <p className="text-black"><span className="text-stone-500 text-lg font-semibold">Status:</span> {transaction.status}</p>
        </div>
      </div>
    </div>
  );
};

export default InspectTransaction;