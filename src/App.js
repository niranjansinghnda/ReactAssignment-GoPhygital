import React, { useState } from "react";
import { users } from "./data/users";
import bcrypt from "bcryptjs";
import "./App.css";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleLogin = () => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Invalid email format");
      return;
    }
    if (!password.trim()) {
      setError("Password cannot be empty");
      return;
    }

    const foundUser = users.find((u) => u.email === email);
    if (!foundUser || !bcrypt.compareSync(password, foundUser.password)) {
      setError("Invalid credentials");
      return;
    }

    setError("");
    setLoggedInUser(foundUser);
  };

  const filteredStudents = users.filter(
    (u) =>
      u.userType === "student" &&
      (u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.subjects.some((s) =>
          s.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  );

  return (
    <div className="app">
      {!loggedInUser ? (
        <div className="login-container">
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : loggedInUser.userType === "admin" ? (
        <div className="admin-page">
          <h2>Welcome, Admin</h2>
          <input
            type="text"
            placeholder="Search by name or subject"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subjects</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, i) => (
                <tr key={i}>
                  <td>{student.username}</td>
                  <td>{student.email}</td>
                  <td>{student.subjects.join(", ")}</td>
                  <td>
                    <button onClick={() => setSelectedUser(student)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedUser && (
            <div className="modal">
              <div className="modal-content">
                <h3>{selectedUser.username}</h3>
                <p>Email: {selectedUser.email}</p>
                <p>Language: {selectedUser.language}</p>
                <p>Address: {selectedUser.address}</p>
                <p>Standard: {selectedUser.standard}</p>
                <p>Subjects: {selectedUser.subjects.join(", ")}</p>
                <button onClick={() => setSelectedUser(null)}>Close</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="student-page">
          <h2>Welcome, {loggedInUser.username}</h2>
          <p>Email: {loggedInUser.email}</p>
          <p>Language: {loggedInUser.language}</p>
          <p>Address: {loggedInUser.address}</p>
          <p>Standard: {loggedInUser.standard}</p>
          <p>Subjects: {loggedInUser.subjects.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
