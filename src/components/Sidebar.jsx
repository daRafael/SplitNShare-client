import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import AddGroup from "./AddGroup";
import AddFriend from "./AddFriend";

const Sidebar = () => {
  const [addGroupOverlay, setAddGroupOverlay] = useState(false);
  const [addFriendOverlay, setAddFriendOverlay] = useState(false);

  const toggleGroupOverlay = () => {
    setAddGroupOverlay(!addGroupOverlay);
  };

  const toggleFriendOverlay = () => {
    setAddFriendOverlay(!addFriendOverlay);
  };

  return (
    <div className="ml-0 flex h-screen pt-16 pr-2 bg-white">
        <div className="hidden md:flex flex-col w-64 bg-white">
            <div className="flex flex-col flex-1 overflow-y-auto">
                <nav className="flex-1 px-2 py-4 bg-stone-300">
                    
                    <Link to='/'>
                        <div 
                            className="flex items-center rounded-md px-4 text-white hover:bg-stone-400"
                        >
                        <img src="/home.png" className="w-16"></img>
                            Homepage
                        </div>
                    </Link>

                    <Link to='/recents'> 
                        <div
                            className="flex items-center rounded-md px-4 mt-2 text-white hover:bg-stone-400"
                        >
                        <img src="/recent.png" className="w-16"></img>
                            Recent activity
                        </div>
                    </Link>
                
                    <Link to='/expenses'>
                        <div
                        className="flex items-center rounded-md px-4 mt-2 text-white hover:bg-stone-400"
                        >
                        <img src="/expenses.png" className="w-16"></img>
                            All expenses
                        </div>
                    </Link>

                    <Link to='/groups'>
                        <div
                            className="flex items-center rounded-md px-4 mt-2 text-white hover:bg-stone-400"
                        >
                        <img src="/groups.png" className=" w-16"></img>
                            Groups
                        </div>
                    </Link>
                    <button className="mx-12 my-2 text-xs py-2 px-4 rounded-full text-white bg-stone-400 hover:bg-stone-500"
                        onClick={toggleGroupOverlay}
                    >
                        Add
                    </button>

                    {addGroupOverlay &&
                        <AddGroup toggleGroupOverlay={toggleGroupOverlay} />
                    }

                    <Link to='/friends'>
                        <div
                            className="flex items-center rounded-md px-4 mt-2 text-white hover:bg-stone-400"
                        >
                        <img src="/friends.png" className="w-16"></img>
                            Friends
                        </div>
                    </Link>
                    <button className="mx-12 my-2 text-xs py-2 px-4 rounded-full text-white bg-stone-400 hover:bg-stone-500"
                        onClick={toggleFriendOverlay}
                    >
                        Add
                    </button>

                    {addFriendOverlay &&
                        <AddFriend toggleFriendOverlay={toggleFriendOverlay} />
                    }

                    </nav>
                    <nav className="bg-stone-300">
                    
                    <Link to='/about'>
                        <div>
                            <button className="mx-12 mb-10 text-xs py-2 px-4  rounded-full text-white bg-stone-400 hover:bg-stone-500">
                                About
                            </button>
                        </div>
                    </Link>
                    

                    
                    </nav>
            </div>
        </div>
    </div>
  );
};  

export default Sidebar;
