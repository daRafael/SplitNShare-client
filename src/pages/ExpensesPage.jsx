import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddExpense from "../components/AddExpense";
import InspectExpense from "../components/InspectExpense";
import expensesService from "../../services/expenses.service";
import { AuthContext } from "../context/auth.context";

const Expenses = () => {
  const [ addExpenseOverlay, setAddExpenseOverlay] = useState(false);
  const [ inspectExpenseOverlay, setInspectExpenseOverlay ] = useState(false)
  const [ allUserExpenses, setAllUserExpenses ] = useState([]);
  const [ userPaidByExpenses, setUserPaidByExpenses ] = useState([]);
  const [ userPayeeExpenses, setUserPayeeExpenses ] = useState([]);
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    expensesService
      .getAllExpenses()
      .then((response) => {
        const expenses = response.data
        setAllUserExpenses(expenses)

        // Separate the expenses based on the user role
        const paidByExpenses = expenses.filter(expense => expense.paidBy._id === user._id);
        const payeeExpenses = expenses.filter(expense => 
          expense.splitWith.some(splitUser => splitUser._id === user._id) && expense.paidBy._id !== user._id
        );

        setUserPaidByExpenses(paidByExpenses);
        setUserPayeeExpenses(payeeExpenses);
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error)
      })
  }, [])

  const deleteExpense = (expenseId) => {
    expensesService
      .deleteExpense(expenseId)
      .then((response) => {

        setAllUserExpenses(allUserExpenses.filter(expense => expense._id !== expenseId));
        setUserPaidByExpenses(userPaidByExpenses.filter(expense => expense._id !== expenseId));
        setUserPayeeExpenses(userPayeeExpenses.filter(expense => expense._id !== expenseId));
      })
      .catch((error) => {
        console.error('Error deleting expense:', error);
      });
  }

  const toggleAddExpenseOverlay = () => {
    setAddExpenseOverlay(!addExpenseOverlay)
  }

  const toggleInspectExpenseOverlay = (expense) => {
    setInspectExpenseOverlay(inspectExpenseOverlay === expense ? null : expense);
  }

  return (
    <>
      {addExpenseOverlay && (
        <AddExpense toggleAddExpenseOverlay={toggleAddExpenseOverlay} />
    )}
    <div className="pt-20 pb-4 h-full pr-2 flex flex-col flex-1 ">
      <div className="flex rounded-md flex-col items-center h-screen pr-4 p-4 bg-lime-200">
        <div className="bg-white rounded-md flex flex-row items-center justify-between w-full">
          <span className="m-4 text-stone-400 text-xl font-bold">All expenses</span>
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
              { allUserExpenses.length > 0 ? (
                <>
                {userPaidByExpenses.length > 0 &&
                  <>
                    <h2 className="text-stone-400 text-lg font-bold mb-2">Expenses Paid By You</h2>
                    {userPaidByExpenses.map((expense, index) => {
                      return (
                        <div key={index} className="mb-5 justify-between items-center flex text-s p-2 rounded-md text-white bg-stone-400 w-full" >
                          <div className="ml-4">
                            {expense.description}
                          </div>
                          <div>
                            <button 
                              onClick={() => {toggleInspectExpenseOverlay(expense)}}
                              className="mr-4 text-xs py-2 px-4 rounded-full text-white bg-stone-500 hover:bg-stone-600"
                            >
                                Inspect
                            </button> 
                            <button 
                              onClick={()=>{deleteExpense(expense._id)}}
                              className="mr-4 text-xs py-2 px-4 rounded-full text-white bg-stone-500 hover:bg-stone-600"
                            >
                              Delete
                            </button>
                          </div>
                          
                          {inspectExpenseOverlay === expense && (
                          <InspectExpense expense={expense} toggleInspectExpenseOverlay={toggleInspectExpenseOverlay} />
                          )}
                        </div>
                      )
                    })}
                  </>
                }
                {userPayeeExpenses.length > 0 &&
                  <>
                    <h2 className="text-stone-400 text-lg font-bold">Expenses You Owe</h2>
                    {userPayeeExpenses.map((expense, index) =>{
                      return (
                        <div key={index} className=" mb-5 justify-between items-center flex text-s p-2 rounded-md text-white bg-stone-400 w-full" >
                          <div className="ml-4">
                            {expense.description}
                          </div>
                          <button
                            onClick={() => {toggleInspectExpenseOverlay(expense)}} 
                            className="mr-4 text-xs py-2 px-4 rounded-full text-white bg-stone-500 hover:bg-stone-600"
                          >
                              Inspect
                          </button>
                          {inspectExpenseOverlay === expense && (
                          <InspectExpense expense={expense} toggleInspectExpenseOverlay={toggleInspectExpenseOverlay} />
                          )}
                        </div>
                      )
                    })}
                  </>
                }
                </>
                ) : (
                  <div className="text-stone-400 text-xl font-bold">
                    You have no Expenses
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

export default Expenses;
