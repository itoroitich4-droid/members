import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }

    if (
      email === "admin@pixelforge.com" &&
      password === "123456"
    ) {
      localStorage.setItem("loggedIn", "true");
      navigate("/products");
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="signin-page">
      <div className="signin-box">
        <h1>Tuniv Studios</h1>

        <p>Game Management Portal</p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">
            Sign In
          </button>
        </form>

        <div className="demo-login">
          <p>
            <strong>Demo Login</strong>
          </p>

          <p>Email: admin@pixelforge.com</p>
          <p>Password: 123456</p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;