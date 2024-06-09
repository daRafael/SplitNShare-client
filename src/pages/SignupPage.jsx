import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../../services/auth.service";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    // Create an object representing the request body

    const requestBody = { email, password, username };

    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state

    authService
      .signup(requestBody)
      .then((response) => {
        authService
          .login(requestBody)
          .then((response) => {
            storeToken(response.data.authToken);
            authenticateUser();
            navigate('/');
          })
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  return (
    <div>
      <div className="hidden md:flex flex-col ml-14 justify-center">
        <h1 className="text-6xl p-6 mt-44 text-stone-400 font-bold">SplitNShare</h1>
        <h1 className="text-6xl p-6 text-stone-400 font-bold">Fair and Square!</h1>
      </div>
      <div className="bg-lime-200 p-8 rounded-md absolute top-20 bottom-20 left-66 right-40 flex-col flex items-center justify-between">
        <h1 className="items-center flex-col text-xl px-8 py-4 text-white">Sign Up</h1>
        <form className="flex items-center flex-col p-6" onSubmit={handleSignupSubmit}>
          <input
            className="rounded-full mt-4 p-2 border focus:outline-stone-500 hover:border-stone-500"
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
            placeholder='  username'
          />

          <input
            className="rounded-full mt-4 p-2 border focus:outline-stone-500 hover:border-stone-500"
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            placeholder='  user@mail.com'
          />

          <input
            className="rounded-full mt-4 p-2 border focus:outline-stone-500 hover:border-stone-500"
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            placeholder='  ********'
          />

          <button className="mt-4 items-center flex-col text-l p-2 rounded-full text-white bg-stone-400 hover:bg-stone-500" type="submit">Sign Up</button>
        </form>
        { errorMessage && <p className="error-message text-stone-400">{errorMessage}</p> }
        <p className="text-white mb-1">Already have account?</p>
        <Link to={"/login"} className="text-stone-400 rounded-full p-1 bg-white"> Login</Link>
      </div>
    </div>
  )
}
export default SignupPage;