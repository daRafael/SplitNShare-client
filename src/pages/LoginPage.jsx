import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../../services/auth.service";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };
  
  return (
    <div>
      <div className="hidden md:flex relative top-60 bottom-8 left-14 right-6 items-center justify-center">
        <h1 className="flex-col justify-center items-center text-6xl p-4 text-stone-400 font-bold">Welcome back! </h1>
      </div>
      <div className="bg-lime-200 p-8 rounded-md absolute top-20 bottom-20 left-66 right-40 flex-col flex items-center justify-between">
        <h1 className="items-center flex-col text-xl px-8 py-4 text-white">Login</h1>
        <form className="flex items-center flex-col p-6" onSubmit={handleLoginSubmit}>
          <input
            className="rounded-full mt-4 p-2 border focus:outline-stone-500 hover:border-stone-500"
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            placeholder="  user@mail.com"
          />
          <input
          className="rounded-full mt-4 p-2 border focus:outline-stone-500 hover:border-stone-500"
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            placeholder="  ********"
          />
          <button className="m-6 items-center flex-col text-l p-2 rounded-full text-white bg-stone-400 hover:bg-stone-500" type="submit">Login</button>
        </form>
        { errorMessage && <p className="error-message text-stone-400">{errorMessage}</p> }
        <p className="text-white mb-1">Don't have an account yet?</p>
        <Link to={"/signup"} className="text-stone-400 rounded-full p-1 bg-white"> Sign Up</Link>
      </div>
    </div>
  )
}
export default LoginPage;