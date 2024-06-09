import { useContext, useState } from "react";
import usersService from "../../services/users.service";
import { AuthContext } from "../context/auth.context";

const AddFriend = ({ toggleFriendOverlay }) => {
    const { user } = useContext(AuthContext)
    const [ friendInput, setFriendInput ] = useState('')

    const handleSaveFriend = async () => {
        try {

            const Gotuser = (await usersService.getUser(user._id)).data;
            console.log(Gotuser)

            if (friendInput === Gotuser.username || friendInput === Gotuser.email) {
                alert("Cannot add yourself as a friend.");
                return;
            }

            const isAlreadyFriend = Gotuser.friends.some((friend) => {
                return friendInput === friend.username || friendInput === friend.email;
            });
    
            if (isAlreadyFriend) {
                alert("You already have this user as a friend.");
                return;
            }
            
            
            await usersService.addFriend({friendInput});
            toggleFriendOverlay();
        } catch (error) {
            console.error("Error adding friend:", error);
        }
    };

    const handleAddFriendInput = (e) => {
        setFriendInput(e.target.value)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 justify-center bg-black opacity-50"></div>
            <div className="bg-white rounded-lg shadow-lg p-8 z-50 relative">
                <h2 className="text-xl pl-16 flex text-stone-500 font-semibold mb-4">New Friend</h2>
                <div className="flex flex-col ">
                    <input
                        className="rounded-md m-4 p-2 border focus:border-none focus:outline-stone-500 hover:border-stone-500"
                        type="text"
                        name="group"
                        placeholder="  ..."
                        onChange={handleAddFriendInput}
                    />
                    <button 
                        className="px-4 py-2 bg-stone-400 text-white rounded-lg hover:bg-stone-500"
                        onClick={handleSaveFriend}
                    >
                        Save
                    </button>
                </div>
                <button onClick={toggleFriendOverlay} className="absolute top-1 right-4 text-gray-500 hover:text-gray-800">
                    X
                </button>
            </div>
        </div>
    );
};

export default AddFriend;