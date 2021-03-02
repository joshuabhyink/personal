import { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../redux/authReducer";

const Auth = (props) => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState('')

  const login = (e) => {
    e.preventDefault()
    setMessage('')
    if(!email || !password){
      setMessage('Incorrect or insufficient information! Try again.')
      return 
    } 
    axios.post("/auth/login", { email, password }).then((res) => {
      props.setUser(res.data);
      setEmail("");
      setPassword("");
      props.history.push("/main");
    }).catch(err => {
      console.log(err.response)
        setMessage(err.response.data)
    })
  };

  return (
    <div>
      <form>
          <h1>Miles Tracker</h1>
          <h3>The world's easiest oil tracking website!</h3>
          {message}
          <input
          placeholder='Email...'
          type='text'
          value={email}
          onChange={e => setEmail(e.target.value)}/>
          <input
          placeholder='Password...'
          value={password}
          type='password'
          onChange={e => setPassword(e.target.value)}/>
          <button onClick={login}>LogIn!</button>
      </form>
      <button onClick={() => props.history.push('/signup')}>Sign Up Here!</button>
    </div>
  );
};

const mapStateToProps = (store) => {
  return store.authReducer;
};

export default connect(mapStateToProps, { setUser })(Auth);
