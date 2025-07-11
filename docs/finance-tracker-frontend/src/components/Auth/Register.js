import React, { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, fullName, email }),
      });

      if (response.ok) {
        setMessage("✅ Registration successful!");
      } else {
        const data = await response.text(); // Try reading actual backend error
        console.error("Error:", data);
        setMessage("❌ Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setMessage("❌ Registration failed");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <p style={{ color: message.startsWith("❌") ? "red" : "green" }}>{message}</p>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          required
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
