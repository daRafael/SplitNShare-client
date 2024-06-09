import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const User = () => {
  const { logoutUser, user } = useContext(AuthContext)

  return (
    <div className="pt-20 pb-4 h-full pr-2 flex flex-col flex-1">
      <div className="flex rounded-md flex-col items-center h-screen pr-4 p-4 bg-lime-200">
        <div className="w-full h-full items-center justify-center flex-col flex text-s p-2 rounded-md text-white bg-white" > 
            <div className=" w-60 items-center flex flex-col p-4 rounded-md bg-stone-400" >
              <div className="w-56"> 
                <img src="/user.png"/>
              </div>
              <div className="text-white mb-8">
                {user.username}
              </div>
                
              <Link to='/login'>
              <div>
                <button onClick={logoutUser} className="mx-12 my-1 text-xs p-2 rounded-full text-white bg-stone-500 hover:bg-stone-600">
                  Logout
                </button>
              </div>
              </Link>
            
            </div>
        </div>
      </div>
    </div>
  );
};

export default User;
