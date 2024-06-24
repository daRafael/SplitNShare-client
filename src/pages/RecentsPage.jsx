import React, { useContext, useEffect, useInsertionEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddExpense from "../components/AddExpense";
import InspectTransaction from "../components/InspectTransaction";
import transactionsService from "../../services/transactions.sercice";
import { AuthContext } from "../context/auth.context";

const Recents = () => {
  const [ addExpenseOverlay, setAddExpenseOverlay] = useState(false);
  const [ inspectTransactionOverlay, setInspectTransactionOverlay ] = useState(false);
  const [ allTransactions, setAllTransactions ] = useState([]);
  const { user } = useContext(AuthContext) 

  useEffect(() => {
    
    Promise.all([
      transactionsService.getAllPayerTransactions(),
      transactionsService.getAllPayeeTransactions()
    ])
    .then(([payerResponse, payeeResponse]) => {
      
      let combinedTransactions = [...payerResponse.data, ...payeeResponse.data];
      combinedTransactions = combinedTransactions.filter(transaction => transaction.payer._id !== transaction.payee._id);
      combinedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
      setAllTransactions(combinedTransactions);
    })
    .catch((error) => {
      console.error('Error fetching transactions:', error);
    });
  }, []);

  const toggleAddExpenseOverlay = () => {
    setAddExpenseOverlay(!addExpenseOverlay)
  };

  const toggleInspectTransactionOverlay = (transaction) => {
    setInspectTransactionOverlay(inspectTransactionOverlay === transaction ? null : transaction);
  }

  const handlePaidButton = (transactionId) => {
    transactionsService.updateTransaction(transactionId, { status: 'paid' })
      .then((response) => {
        setAllTransactions((prevTransactions) =>
          prevTransactions.map((transaction) =>
            transaction._id === transactionId ? { ...transaction, status: 'paid' } : transaction
          )
        );
      })
      .catch((error) => {
        console.error('Error updating transaction:', error);
      });
  };

  return (
    <>
      {addExpenseOverlay && (
      <AddExpense toggleAddExpenseOverlay={toggleAddExpenseOverlay} />
    )}
    <div className="pt-20 pb-4 h-screen overflow-y-scroll pr-2 flex flex-col flex-1">
      <div className="flex rounded-md flex-col items-center h-screen  pr-4 p-4 bg-lime-200">
        <div className="bg-white rounded-md flex flex-row items-center justify-between w-full">
          <span className="m-4 text-stone-400 text-xl font-bold">Recent activity</span>
          <div className="flex flex-row items-center">
            <button
              onClick={setAddExpenseOverlay}
              className="mr-4 text-xs p-2 rounded-full text-white bg-stone-400 hover:bg-stone-500"
            >
              Add Expense
            </button>
          </div>  
        </div>

        <div className="bg-white rounded-md w-full h-full mt-4 p-4 overflow-y-scroll no-scrollbar">
          <div className="items-start justify-center w-full">
            { allTransactions.length > 0 ? (
                allTransactions.map((transaction, index) => {
                  const isUserPayer = transaction.payer._id === user._id;
                  const otherUser = isUserPayer ? transaction.payee : transaction.payer;
                  const description = isUserPayer
                    ? `${otherUser.username} owes ${transaction.amount} ${transaction.currency} to you`
                    : `You owe ${transaction.amount} ${transaction.currency} to ${otherUser.username}`;
                  return (
                    <div key={index}  className="h-24 sm:h-12 mb-5 justify-between items-center flex text-s p-2 rounded-md text-white bg-stone-400 w-full" >
                      <div className="ml-4">
                        {description}
                      </div>
                      <div className="flex flex-col gap-2 sm:flex-row">
                        {transaction.expense && isUserPayer && transaction.status !== 'paid' && (
                          <button
                            className="mr-4 text-xs py-2 px-4 rounded-full text-white bg-stone-500 hover:bg-stone-600"
                            onClick={() => handlePaidButton(transaction._id)}
                          >
                            Paid
                          </button>
                        )}
                        {transaction.status === 'paid' && (
                          <span className="mr-4 text-xs py-2 px-4 rounded-full text-white bg-green-500">
                            {otherUser.username} has paid!
                          </span>
                        )}
                        { transaction.expense &&
                          <button 
                            onClick={() => {toggleInspectTransactionOverlay(transaction)}}
                            className="mr-4 text-xs py-2 px-4 rounded-full text-white bg-stone-500 hover:bg-stone-600"
                          >
                            Inspect
                          </button>
                        }
                        {inspectTransactionOverlay === transaction && (
                          <InspectTransaction 
                            transaction={transaction} 
                            toggleInspectTransactionOverlay={toggleInspectTransactionOverlay} 
                          />
                        )}
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-stone-400 text-xl font-bold">
                  You have no activity
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Recents;
