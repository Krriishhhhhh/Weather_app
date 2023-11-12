import { useState } from "react";
import axios from 'axios';

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:5001/user/signup", {
        username,
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("response", response.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      username
      <input
        type="text"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <br />
      Email
      <input
        type="text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      Password
      <input
        type="text"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />

      <button 
      onClick={handleSignUp}
      >Sign up</button>
    </div>
  );
}
