import React, { useContext, useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import expensesService from '../../services/expenses.service';
import usersService from '../../services/users.service';
import groupsService from '../../services/groups.service';
import { AuthContext } from '../context/auth.context';

export default function AddExpense({ toggleAddExpenseOverlay }) {
  //fetching users from database
  const { user } = useContext(AuthContext)
  const [allUsers, setAllUsers] = useState([]);
  const [allUserGroups, setAllUserGroups] = useState([]);
  const [commonGroups, setCommonGroups] = useState([]);
  
  useEffect(() => {
    usersService
      .getAllUsers()
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
      })

    groupsService
      .getAllGroups()
      .then((response) => {
        setAllUserGroups(response.data)
      })
      .catch((error) => {
        console.error('Error fetching groups:', error)
      })

  }, []);


  const [splitWithInputs, setSplitWithInputs] = useState(['']);
  const [descriptionInput, setDescriptionInput] = useState('');
  const [amountInput, setAmountInput] = useState('0.00');
  const [paidByInput, setPaidByInput] = useState('');
  const [divisionTypeInput, setDivisonTypeInput] = useState('equally');
  const [groupInput, setGroupInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    if (splitWithInputs.length > 0 && allUsers.length > 0) {
      const splitWithIds = splitWithInputs.map(username => {
        const user = allUsers.find(user => user.username === username);
        return user ? user._id : null;
      }).filter(id => id !== null);

      if (splitWithIds.length > 0) {
        usersService.getCommonGroups({ splitWith: splitWithIds })
          .then((response) => {
            setCommonGroups(response.data);
          })
          .catch((error) => {
            console.error('Error fetching common groups:', error);
          });
      }
    }
  }, [splitWithInputs, allUsers]);

  const addSplitWithInput = () => {
    setSplitWithInputs([...splitWithInputs, '']);
  };
  const removeSplitWithInput = (index) => {
    setSplitWithInputs(splitWithInputs.filter((input, i) => i !== index));
  }
  const handleSplitWithInputChange = (index, e) => {
    const newSplitWithInputs = [...splitWithInputs];
    newSplitWithInputs[index] = e.target.value;
    setSplitWithInputs(newSplitWithInputs);
  };

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

  const handleGroupInput = (e) => {
    setGroupInput(e.target.value);
  }

  const handleFormSumbit = async (e) => {
    e.preventDefault();

    if(!splitWithInputs || !descriptionInput || !amountInput) {
      return alert('Please fill necessary fields');
    }

    // Validate splitWithInputs for duplicate entries
    const userTracker = {};
    for (let input of splitWithInputs) {
      if (userTracker[input]) {
        return alert('User already added');
      }
      userTracker[input] = true;
    }

    // Validate splitWithInputs
    const invalidInputs = splitWithInputs.filter(input => {
      // Check if input matches username or email of any user in allUsers
      return !allUsers.some(user => user.username === input || user.email === input);
    });

    if (invalidInputs.length > 0) {
      return alert('One or more user inputs are invalid');
    }

    /* const groupExists = allUserGroups.find((group) => {
      const groupFirstName = group.name.split(' ')[0];
      console.log(groupInput.length);
      console.log(groupFirstName.length);
      return groupInput.trim() === groupFirstName;
    });

    console.log(groupExists)

    if (groupExists) {
      return alert('That group name already exists');
    } */

    const splitWithIds = splitWithInputs.map(username => {
      const user = allUsers.find(user => user.username === username);
      return user ? user._id : null;
    }).filter(id => id !== null);

    if(splitWithIds.includes(user._id)) {
      return alert('You are already part of the expense')
    }

    let paidByUserId = user._id; // Default to current user ID
    if (paidByInput.length > 0 && paidByInput !== 'Me') {
      const paidByUser = allUsers.find(user => user.username === paidByInput);
      paidByUserId = paidByUser ? paidByUser._id : null;
    }

    let groupId;
    if(groupInput.length > 0) {
      const group = allUserGroups.find(group => group.name === groupInput);
      groupId = group ? group._id : null
    }

    const expenseData = {
      description: descriptionInput,
      amountPaid: Number(amountInput).toFixed(2),
      paidBy: paidByUserId === null ? paidByInput : paidByUserId,
      splitWith: splitWithIds,
      splitType: divisionTypeInput,
      group: groupId === null ? groupInput : groupId,
    };

    try {
      await expensesService.createExpense(expenseData);
      
      // Add friends for the user
      const friendPromises = splitWithInputs.map((friendInput) => 
        usersService.addFriend({ friendInput })
      );

      await Promise.all(friendPromises);

      toggleAddExpenseOverlay();
    } catch (error) {
      console.error('Error creating expense or adding friends:', error);
      const errorDescription = error?.response?.data?.message || 'Failed to create expense. Please try again';
      setErrorMessage(errorDescription);
    }


    setSplitWithInputs(['']);
    setDescriptionInput('');
    setAmountInput('0.00');
    setPaidByInput('');
    setDivisonTypeInput('equally');
    setGroupInput('');
  }

  return (
    <div className=" fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 justify-center bg-black opacity-50"></div>
      <div className="w-80 bg-white rounded-lg shadow-lg p-8 z-50 relative justify-center items-center">
        <div className="flex justify-center">
          <h2 className="text-xl text-stone-500 font-semibold mb-4">New Expense</h2>
        </div>
        <form onSubmit={handleFormSumbit} className="flex justify-center items-center flex-col">
          {splitWithInputs.map((input, index) => (
            <div className="mb-2 input flex items-center gap-1" key={index}>
              <input
                className="rounded-md p-2 border focus:border-none focus:outline-stone-500 hover:border-stone-500"
                type="text"
                name={`user-${index}`}
                placeholder="Splitting with"
                value={input}
                onChange={(event) => handleSplitWithInputChange(index, event)}
              />
              <div className='flex items-center text-gray-500 hover:text-gray-800'>
                <button onClick={()=> {removeSplitWithInput(index)}}>
                  x
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-center mb-4">
            <button type='button' className="text-gray-500 hover:text-gray-800" onClick={addSplitWithInput}>
              +
            </button>
          </div>
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
              {splitWithInputs.map((user, index) => {
                if(user.length > 0) {
                  return <option key={index} value={user}>{user}</option>
                }
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
          <div className='mb-4'>
            <select 
              name="group-selection" 
              value={groupInput}
              onChange={handleGroupInput}
              className="w-32 rounded-md p-2 border focus:border-none focus:outline-stone-500 hover:border-stone-500" 
            >
              <option value="" disabled hidden>Group</option>
              {commonGroups.map((group) => {
                return <option key={group._id} value={group._id}>{group.name}</option>
              })}
            </select>
          </div>
          <button
            className="px-4 py-2 bg-stone-400 text-white rounded-lg hover:bg-stone-500"
            type='submit'
          >
            Add
          </button>
        </form>
        <button onClick={toggleAddExpenseOverlay} className="absolute top-1 right-4 text-gray-500 hover:text-gray-800">
          X
        </button>
      </div>
    </div>
  );
}