const InspectFriend = ({ friend, toggleInspectFriendOverlay }) => {

    return (
      <div className=" fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 justify-center bg-black opacity-30"></div>
        <div className="w-80 bg-white rounded-lg shadow-lg p-8 z-50 relative justify-center items-center">
          <div className="flex justify-center">
            <h2 className="text-xl text-stone-500 font-semibold mb-4">Your Friend</h2>
          </div>
          <div className="items-center flex flex-col p-4 rounded-md bg-stone-400">
            <img src="/user.png"/>
            <div className="text-white text-xl mb-8">
              {friend.username}
            </div>
          </div>
          <button onClick={toggleInspectFriendOverlay} className="absolute top-1 right-4 text-gray-500 hover:text-gray-800">
            x
          </button>
        </div>
      </div>
    );
};

export default InspectFriend;