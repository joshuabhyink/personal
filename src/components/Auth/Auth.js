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
    <div className='auth'>
      <form>
        <div className='header'>
          <h1 className='title'>Miles Tracker 2.0</h1>
          <br/>
          <div className='signup'>
              <button className= 'signup-btn' onClick={() => props.history.push('/signup')}>Sign Up Here!</button>
          </div>
          <br/>
          <h2>The world's easiest oil tracking website!</h2>
          <br/>
          <h4>{message}</h4>
        </div>
          <div className='login'>
            <input
            className='emailinput'
            placeholder='Email...'
            type='text'
            value={email}
            onChange={e => setEmail(e.target.value)}/>
            <input
            className='psswrdinput'
            placeholder='Password...'
            value={password}
            type='password'
            onChange={e => setPassword(e.target.value)}/>
          </div>
            <div className='loginbtn'>
              <button className='lgnbutton' onClick={login}>Login</button>
            </div>
            <div className='footer'>
              <h1 className='ftrtxt'>Powered by Gatorade and WiFi</h1>
            </div>
      </form>
    </div>
  );
};

const mapStateToProps = (store) => {
  return store.authReducer;
};

export default connect(mapStateToProps, { setUser })(Auth);
