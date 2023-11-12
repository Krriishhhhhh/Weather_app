import { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async()=>{
    try{
        const response =await axios.post("http://localhost:5001/user/login",{
            username,
            password
        },{
            headers: {
                'Content-Type': 'application/json',
              },
        })
        console.log("response: ", response.data)
      }catch(err){
        console.error(err);
    }
    }
    
  return (
    <div>
      username{" "}
      <input
        type="text"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <br />
      password{" "}
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
