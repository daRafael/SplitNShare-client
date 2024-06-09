import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import groupsService from "../../services/groups.service";
import usersService from "../../services/users.service";

const AddGroup = ({ toggleGroupOverlay}) => {
    const { user } = useContext(AuthContext);
    const [ allUsers, setAllUsers ] = useState([])
    const [ groupMembersInputs, setGroupMembersInputs ] = useState(['']);
    const [ groupNameInput, setGroupNameInput ] = useState('');

    useEffect(() => {
        usersService
          .getAllUsers()
          .then((response) => {
            setAllUsers(response.data);
          })
          .catch((error) => {
            console.error('Error fetching users:', error)
          })
    
      }, []);

    const addMemberInput = () => {
        setGroupMembersInputs([...groupMembersInputs, '']);
    }

    const removeMemberInput = (index) => {
        setGroupMembersInputs(groupMembersInputs.filter((input, i) => i !== index));
    }

    const handleMemberInputChange = (index, e) => {
        const newGroupMembersInputs = [...groupMembersInputs];
        newGroupMembersInputs[index] = e.target.value;
        setGroupMembersInputs(newGroupMembersInputs);
    }

    const handleGroupNameInput = (e) => {
        setGroupNameInput(e.target.value);
    }

    const handleFormSumbit = async (e) => {
        e.preventDefault();

        if(!groupNameInput) {
            return alert('Please name the group');
        }

        // Validate splitWithInputs for duplicate entries
        const memberTracker = {};
        for (let input of groupMembersInputs) {
            if (memberTracker[input]) {
                return alert('User already added');
            }
            memberTracker[input] = true;
        }

        // Validate groupMembersInputs
        const invalidInputs = groupMembersInputs.filter(input => {
            // Check if input matches username or email of any user in allUsers
            return !allUsers.some(user => user.username === input || user.email === input);
        });
  
        if (invalidInputs.length > 0) {
            return alert('One or more user inputs are invalid');
        }

        const groupMembersIds = groupMembersInputs.map(username => {
            const user = allUsers.find(user => user.username === username);
            return user ? user._id : null;
          }).filter(id => id !== null);
      
          if(groupMembersIds.includes(user._id)) {
            return alert('You are already part of the expense')
        }

        const groupData = {
            name: groupNameInput,
            members: groupMembersIds,
        }

        try {
            await groupsService.createGroup(groupData)

            // Add friends for the user
            const friendPromises = groupMembersInputs.map((friendInput) => 
                usersService.addFriend({ friendInput })
            );

            await Promise.all(friendPromises);

            toggleGroupOverlay();
        } catch(error) {
            console.error('Error creating group:', error);
            const errorDescription = error?.response?.data?.message || 'Failed to create group. Please try again';
            setErrorMessage(errorDescription);
        }

        setGroupMembersInputs(['']);
        setGroupNameInput('');
    }

    return (
        <div className=" fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 justify-center bg-black opacity-50"></div>
        <div className="w-80 bg-white rounded-lg shadow-lg p-8 z-50 relative justify-center items-center">
            <div className="flex justify-center">
            <h2 className="text-xl text-stone-500 font-semibold mb-4">New Group</h2>
            </div>
            <form onSubmit={handleFormSumbit} className="flex justify-center items-center flex-col">
            {groupMembersInputs.map((input, index) => (
                <div className="mb-2 input flex items-center gap-1" key={index}>
                <input
                    className="rounded-md p-2 border focus:border-none focus:outline-stone-500 hover:border-stone-500"
                    type="text"
                    name={`user-${index}`}
                    placeholder="Add member"
                    value={input}
                    onChange={(event) => handleMemberInputChange(index, event)}
                />
                <div className='flex items-center text-gray-500 hover:text-gray-800'>
                    <button onClick={()=> {removeMemberInput(index)}}>
                    x
                    </button>
                </div>
                </div>
            ))}
            <div className="flex justify-center mb-4">
                <button type='button' className="text-gray-500 hover:text-gray-800" onClick={addMemberInput}>
                +
                </button>
            </div>
            <div>
                <input 
                type="text" 
                value={groupNameInput}
                placeholder='Description'
                className="mb-5 rounded-md p-2 border focus:border-none focus:outline-stone-500 hover:border-stone-500"
                onChange={handleGroupNameInput}
                />
            </div>
            <button
                className="px-4 py-2 bg-stone-400 text-white rounded-lg hover:bg-stone-500"
                type='submit'
            >
                Add
            </button>
            </form>
            <button onClick={toggleGroupOverlay} className="absolute top-1 right-4 text-gray-500 hover:text-gray-800">
                X
            </button>
        </div>
        </div>
    );
};

export default AddGroup;
