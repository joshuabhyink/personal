import { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../redux/authReducer";

const Auth = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    axios.post("/auth/login", { email, password }).then((res) => {
      props.setUser(res.data);
      props.history.push("/");
      setEmail("");
      setPassword("");
    });
  };

  return (
    <div>
      <form>
          <input
          placeholder='Email...'
          value={email}
          onChange={e => setEmail=(e.target.value)}/>
          <input
          placeholder='Password...'
          value={password}
          type='password'
          onChange={e => setPassword(e.target.value)}/>
          <button onClick={login}>LogIn!</button>
      </form>
      <button onClick={props.history.push('/signup')}>Sign Up Here!</button>
    </div>
  );
};

const mapStateToProps = (store) => {
  return store.authReducer;
};

export default connect(mapStateToProps, { setUser })(Auth);
