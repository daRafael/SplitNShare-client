import React, { useContext, useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import expensesService from '../../services/expenses.service';
import usersService from '../../services/users.service';
import groupsService from '../../services/groups.service';
import { AuthContext } from '../context/auth.context';

export default function AddGroupExpense({ toggleAddGroupExpenseOverlay, group }) {
  //fetching users from database
  const { user } = useContext(AuthContext)
  const [allUsers, setAllUsers] = useState([]);
  console.log(group)
  
  useEffect(() => {
    usersService
      .getAllUsers()
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
      })

    // Extract member IDs from the group
    const memberIds = group.members.map(member => member._id);
    setSplitWithIds(memberIds);

  }, [group]);

  const [descriptionInput, setDescriptionInput] = useState('');
  const [amountInput, setAmountInput] = useState('0.00');
  const [paidByInput, setPaidByInput] = useState('');
  const [divisionTypeInput, setDivisonTypeInput] = useState('equally');
  const [splitWithIds, setSplitWithIds] = useState([]);


  const handleDescriptionInput = (e) => {
    setDescriptionInput(e.target.value)
  };

  const handleAmountInputChange = (value) => {
    setAmountInput(value);
  };

  const handlePaidByInput = (e) => {
    setPaidByInput(e.target.value);
  };

  const handleDivisionTypeInput = (e) => {
    setDivisonTypeInput(e.target.value);
  };

  const handleFormSumbit = async (e) => {
    e.preventDefault();

    if(!descriptionInput || !amountInput) {
      return alert('Please fill necessary fields');
    }

    let paidByUserId = user._id; // Default to current user ID
    if (paidByInput.length > 0 && paidByInput !== 'Me') {
      const paidByUser = allUsers.find(user => user.username === paidByInput);
      paidByUserId = paidByUser ? paidByUser._id : null;
    }

    const expenseData = {
      description: descriptionInput,
      amountPaid: Number(amountInput).toFixed(2),
      paidBy: paidByUserId === null ? paidByInput : paidByUserId,
      splitWith: splitWithIds,
      splitType: divisionTypeInput,
      group: group._id,
    };

    try {
      await expensesService.createGroupExpense(group._id, expenseData);

      toggleAddGroupExpenseOverlay();
    } catch (error) {
      console.error('Error creating expense or adding friends:', error);
      const errorDescription = error?.response?.data?.message || 'Failed to create expense. Please try again';
      setErrorMessage(errorDescription);
    }

    setDescriptionInput('');
    setAmountInput('0.00');
    setPaidByInput('');
    setDivisonTypeInput('equally');
  }

  return (
    <div className=" text-black fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 justify-center bg-black opacity-50"></div>
      <div className="w-80 bg-white rounded-lg shadow-lg p-8 z-50 relative justify-center items-center">
        <div className="flex justify-center">
          <h2 className="text-xl text-stone-500 font-semibold mb-4">New Expense</h2>
        </div>
        <form onSubmit={handleFormSumbit} className="flex justify-center items-center flex-col">
          <div>
            <input 
              type="text" 
              value={descriptionInput}
              placeholder='Description'
              className="rounded-md p-2 border focus:border-none focus:outline-stone-500 hover:border-stone-500"
              onChange={handleDescriptionInput}
            />
          </div>
          <div>
              <CurrencyInput
                id='input-amount'
                name='input-amount'
                value={amountInput}
                placeholder='0.00'
                suffix='€'
                decimalSeparator='.'
                groupSeparator=','
                decimalsLimit={2}
                fixedDecimalLength={2}
                onValueChange={(value) => handleAmountInputChange(value)}
                className=" mb-4 w-full text-stone-500 text-6xl text-center p-2  focus:outline-none"
              />
          </div>
          <div className='mb-4 flex gap-3'>
            <select 
              name='paidBy-user'
              value={paidByInput}
              onChange={handlePaidByInput} 
              className="w-32 rounded-md p-2 border focus:border-none focus:outline-stone-500 hover:border-stone-500"
            > 
              <option value="" disabled hidden>Paid By</option>
              <option value='Me'>Me</option>
              {group.members.map((user, index) => {
                  return <option key={index} value={user.username}>{user.username}</option>

              })}
            </select>
            <select 
              name='division-type'
              value={divisionTypeInput} 
              onChange={handleDivisionTypeInput}
              className="w-32 rounded-md p-2 border focus:border-none focus:outline-stone-500 hover:border-stone-500"
            >
             <option value="equally">Equally</option>
             {/* <option value="exactAmounts">Exact Amounts</option> */}
            </select>
          </div>
          <button
            className="px-4 py-2 bg-stone-400 text-white rounded-lg hover:bg-stone-500"
            type='submit'
          >
            Add
          </button>
        </form>
        <button onClick={toggleAddGroupExpenseOverlay} className="absolute top-1 right-4 text-gray-500 hover:text-gray-800">
          X
        </button>
      </div>
    </div>
  );
}