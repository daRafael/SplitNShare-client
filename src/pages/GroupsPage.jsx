import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddExpense from "../components/AddExpense";
import InspectGroup from "../components/InspectGroup";
import groupsService from "../../services/groups.service";
import { AuthContext } from "../context/auth.context";

const Groups = () => {
  const [ addExpenseOverlay, setAddExpenseOverlay] = useState(false);
  const [ inspectGroupOverlay, setInspectGroupOverlay ] = useState(false)
  const [groups, setGroups] = useState([]);
  const [ownerGroups, setOwnerGroups] = useState([]);
  const [memberGroups, setMemberGroups] = useState([]);
  const { user } = useContext(AuthContext);

  console.log(groups)

  useEffect(() => {
    groupsService
      .getAllGroups()
      .then((response) => {
        const groups = response.data
        setGroups(groups)

        // Separate the groups based on the user role
        const ownerGroups = groups.filter(group => group.owner._id === user._id);
        const memberGroups = groups.filter(group => 
          group.members.some(member => member._id === user._id) && group.owner._id !== user._id
        );

        setOwnerGroups(ownerGroups);
        setMemberGroups(memberGroups);
      })
      .catch((error) => {
        console.log("Error fetching groups", error)
      })
  }, [])

  const deleteGroup = (groupId) => {
    groupsService
      .deleteGroup(groupId)
      .then((response) => {
        setGroups(groups.filter(group => group._id !== groupId));
        setOwnerGroups(ownerGroups.filter(group => group._id !== groupId));
        setMemberGroups(memberGroups.filter(group => group._id !== groupId));
      })
      .catch((error) => {
        console.error('Error deleting group:', error);
      });
  };

  const toggleAddExpenseOverlay = () => {
    setAddExpenseOverlay(!addExpenseOverlay)
  };

  const toggleInspectGroupOverlay = (group) => {
    setInspectGroupOverlay(inspectGroupOverlay === group ? null : group);
  }

  return (
    <>
      {addExpenseOverlay && (
        <AddExpense toggleAddExpenseOverlay={toggleAddExpenseOverlay} />
    )}
    <div className="pt-20 pb-4 h-full pr-2 flex flex-col flex-1">
      <div className="flex rounded-md flex-col items-center h-screen pr-4 p-4 bg-lime-200">
        <div className="bg-white rounded-md flex flex-row items-center justify-between w-full">
          <span className="m-4 text-stone-400 text-xl font-bold">Groups</span>
          <div className="flex flex-row items-center">
            <button 
              onClick={toggleAddExpenseOverlay}
              className="mr-4 text-xs p-2 rounded-full text-white bg-stone-400 hover:bg-stone-500"
            >
              Add Expense
            </button>
          </div>
        </div>
        <div className="bg-white rounded-md w-full h-full mt-4 p-4 overflow-y-scroll no-scrollbar">
          <div className="items-start justify-center w-full">
            { groups.length > 0 ? (
              <>
              {ownerGroups.length > 0 &&
                <>
                  <h2 className="text-stone-400 text-lg font-bold mb-2">Groups you are the owner</h2>
                  {ownerGroups.map((group, index) => {
                    return (
                      <div key={index} className="mb-5 justify-between items-center flex text-s p-2 rounded-md text-white bg-stone-400 w-full" >
                        <div className="ml-4">
                          {group.name}
                        </div>
                        <div>
                          <button 
                            onClick={() => {toggleInspectGroupOverlay(group)}}
                            className="mr-4 text-xs py-2 px-4 rounded-full text-white bg-stone-500 hover:bg-stone-600"
                          >
                              Inspect
                          </button>
                          <button
                            onClick={() => {deleteGroup(group._id)}}
                            className="mr-4 text-xs py-2 px-4 rounded-full text-white bg-stone-500 hover:bg-stone-600"
                          >
                            Delete
                          </button>
                        </div>
                        {inspectGroupOverlay === group && (
                          <InspectGroup group={group} toggleInspectGroupOverlay={toggleInspectGroupOverlay} />
                        )}
                      </div>
                    )
                  })}
                </>
              }
              {memberGroups.length > 0 &&
                <>
                  <h2 className="text-stone-400 text-lg font-bold">Groups you are a member</h2>
                  {memberGroups.map((group, index) =>{
                    return (
                      <div key={index} className="mb-5 justify-between items-center flex text-s p-2 rounded-md text-white bg-stone-400 w-full" >
                        <div className="ml-4">
                          {group.name}
                        </div>
                        <div>
                          <button 
                            onClick={() => {toggleInspectGroupOverlay(group)}}
                            className="mr-4 text-xs py-2 px-4 rounded-full text-white bg-stone-500 hover:bg-stone-600"
                          >
                              Inspect
                          </button>
                          <button
                            onClick={() => {deleteGroup(group._id)}}
                            className="mr-4 text-xs py-2 px-4 rounded-full text-white bg-stone-500 hover:bg-stone-600"
                          >
                            Delete
                          </button>
                        </div>
                        {inspectGroupOverlay === group && (
                          <InspectGroup group={group} toggleInspectGroupOverlay={toggleInspectGroupOverlay} />
                        )}
                      </div>
                    )
                  })}
                </>
              }
              </>
              ) : (
                <div className="text-stone-400 text-xl font-bold">
                  You have no groups
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

export default Groups;
