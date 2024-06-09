import React, { useEffect } from "react";
import { useState } from "react";
import AddExpense from "../components/AddExpense";
import InspectFriend from "../components/InspectFriend";
import usersService from "../../services/users.service";



const Friends = () => {
  const [ addExpenseOverlay, setAddExpenseOverlay] = useState(false);
  const [ inspectFriendOverlay, setInspectFriendOverlay ] = useState(false)
  const [ allUserFriends, setAllUserFriends ] = useState([])

  useEffect(() => {
    usersService
      .getAllFriends()
      .then((response) => {
        setAllUserFriends(response.data)
      })
      .catch((error) => {
        console.error('Error fetching friends:', error)
      })
  }, [])

  const removeFriend = (id) => {
    usersService
      .deleteFriend(id)
      .then((response) => {
        setAllUserFriends(allUserFriends.filter(friend => friend._id !== id));
      })
      .catch((error) => {
        console.error('Error removing friend:', error);
      });
  }
  const toggleAddExpenseOverlay = () => {
    setAddExpenseOverlay(!addExpenseOverlay)
  }

  const toggleInspectFriendOverlay = (friend) => {
    setInspectFriendOverlay(inspectFriendOverlay === friend ? null : friend);
  }

  return (
    <>
      {addExpenseOverlay && (
        <AddExpense toggleAddExpenseOverlay={toggleAddExpenseOverlay} />
      )}
      <div className="pt-20 pb-4 h-full pr-2 flex flex-col flex-1">
        <div className="flex rounded-md flex-col items-center h-screen pr-4 p-4 bg-lime-200">
            <div className="bg-white rounded-md flex flex-row items-center justify-between w-full">
              <span className="m-4 text-stone-400 text-xl font-bold">Friends</span>
              <div className="flex flex-row items-center">
                <button 
                  onClick={toggleAddExpenseOverlay}
                  className="mr-4 text-xs p-2 rounded-full text-white bg-stone-400 hover:bg-stone-500"
                >
                  Add Expense
                </button>
              </div>
            </div>
          
          <div className="bg-white rounded-md flex flex-col gap-4 items-start w-full h-full mt-4 p-4">
            { allUserFriends ? (
                allUserFriends.map((friend, index) => {
                  return (
                      <div key={index} className="justify-between items-center flex text-s p-2 rounded-md text-white bg-stone-400 w-full" >
                        <div className="ml-4">
                          {friend.username}
                        </div>
                        <div>
                          <button  
                            className="mr-4 text-xs py-2 px-4 rounded-full text-white bg-stone-500 hover:bg-stone-600"
                            onClick={() => toggleInspectFriendOverlay(friend)}
                          >
                              Inspect
                          </button>
                          <button
                            onClick={() => {removeFriend(friend._id)}}
                            className="mr-4 text-xs py-2 px-4 rounded-full text-white bg-stone-500 hover:bg-stone-600"
                          >
                            Remove friend
                          </button>
                        </div> 
                        {inspectFriendOverlay === friend && (
                        <InspectFriend friend={friend} toggleInspectFriendOverlay={toggleInspectFriendOverlay} />
                        )}
                      </div>

                  )
                })
              ) : (
                <div className="text-stone-400 text-xl font-bold">
                  You have no friends
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;