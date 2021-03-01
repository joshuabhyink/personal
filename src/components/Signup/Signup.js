import { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../redux/authReducer";

const Signup = (props) => {
  let [email, setEmail] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const register = (e) => {
      e.preventDefault()
      setMessage('')
      if(!email || !username || !password){
          setMessage('Information incorrect or insufficient! Try again.')
          return 
      }
    axios.post("/auth/register", { email, username, password }).then((res) => {
      props.setUser(res.data);
      setEmail("");
      setUsername("");
      setPassword("");
      props.history.push("/main");
    }).catch(err => {
        setMessage(err.response.data)
    });
  };

  return (
    <div>
      <form>
        <h2>Register a new account with us!</h2>
        {message}
        <input
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Password..."
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={register}>Register Here!</button>
      </form>
      <button onClick={() => props.history.push("/")}>
        Already a user? Sign in here!
      </button>
    </div>
  );
};

export default Signup;
