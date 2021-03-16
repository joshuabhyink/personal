import { useState } from "react";
import axios from "axios"
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
      console.log(err)
        // setMessage(err.response.data)
    });
  };

  return (
    <div>
      <form>
        <div className='header'>
          <h2 className='headertxt'>Register a new account with us!</h2>
            <br/>
            <h4>{message}</h4>
          <div className='signinbtn'>
            <button className='signbutton' onClick={() => props.history.push("/")}>
              Already a user? Sign in here!
            </button>
          </div>
        </div>
        <div className='body'>
          <div>
            <input
              className='email'
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className='username'
              placeholder="Username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              className='password'
              placeholder="Password..."
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
          <div className='register'>
            <button className='registerbtn' onClick={register}>Register Here!</button>
          </div>
      </form>
    </div>
  );
};

const mapStateToProps = store => store.userReducer

export default connect(mapStateToProps, {setUser})(Signup);
