import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/user/signup",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response", response.data);

      // If signup is successful, navigate to the login page
      router.push("/login");
    } catch (err:any) {
      console.error(err);

      // Extract and set a more user-friendly error message
      if (err.response && err.response.data) {
        setError(err.response.data.message || "An error occurred during signup");
      } else {
        setError("An error occurred during signup");
      }
    }
  };

  return (
    <div>
      <div>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="text"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button onClick={handleSignUp}>Sign up</button>

      {error && <div style={{ color: "red" }}>{error}</div>}
      <br/><br/><br/><br/>

      already signed up <button onClick={()=>router.push('/login')}>login</button> 
    </div>
  );
}

export default SignUp;
