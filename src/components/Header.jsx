import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between absolute top-0 left-0 right-0 h-16 space-x bg-orange-300">
        <div className="flex flex-row items-center">
            <Link to='/'>
              <img className="w-36" src="/logo.png"/>
            </Link>
            <span className="text-white font-semibold">SplitNShare</span>
        </div>
        <Link to='/user'>
          <div>
            <img className="w-28" src="/user.png"/>
          </div>
        </Link>
     
    </div>
  );
};

export default Header;


