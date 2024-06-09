import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="pt-20 pb-4 pr-2 flex flex-col flex-1 md:h-full ">
      <div className="flex rounded-md flex-col items-center pr-4 p-4 bg-lime-200 md:h-full">
        <div className="bg-white rounded-md flex flex-row items-center justify-center w-full">
          <span className="m-4 text-stone-400 text-xl font-bold">About</span>
        </div>

        <div className="bg-white rounded-md flex flex-col items-center justify-around gap-10 w-full h-full mt-4 md:flex-row py-5 px-5">
            <div className=" flex flex-row text-s p-2 rounded-md text-white bg-stone-300" >
                <div className="flex flex-col justify-between h-full items-center">
                    <div className="text-xl font-bold mt-5">
                    Manuele Vancin
                    </div>

                    <div className="mt-8">
                        <img className="w-44 rounded-md" src="/manu.png"/>
                    </div>

                    <div className="flex flex-row">
                        <Link to="https://github.com/mfvancin">
                            <a className="rounded-md flex items-center mr-2 mt-2 text-white hover:bg-stone-400">
                            <img src="/github.png" className=" w-32" alt="GitHub"/>
                            </a>
                        </Link>
                        <Link to="https://www.linkedin.com/in/manuele-vancin-80793b2b1/" className="rounded-md flex items-center px-4 mt-2 text-white hover:bg-stone-400">
                            <img src="/linkedin.png" className=" w-24"></img>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex flex-row text-s p-2 rounded-md text-white bg-stone-300" >
                <div className="flex flex-col justify-between h-full items-center">
                    <div className="text-xl font-bold mt-5">
                    Rafael Guerra
                    </div>

                    <div className="mt-8">
                        <img className="w-44 rounded-md" src="/rafa.png"/>
                    </div>

                    <div className="flex flex-row">
                        <Link to="https://github.com/daRafael">
                            <a className="rounded-md flex items-center mr-2 mt-2 text-white hover:bg-stone-400">
                            <img src="/github.png" className=" w-32" alt="GitHub"/>
                            </a>
                        </Link>
                        <Link to="https://www.linkedin.com/in/rafael-guerra-full-stack-developer/" className="rounded-md flex items-center px-4 mt-2 text-white hover:bg-stone-400">
                            <img src="/linkedin.png" className=" w-24"></img>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
