import React, { useState, useContext } from "react";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import {useNavigate } from "react-router-dom";

import { FireBaseContext } from "../../store/Context";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

export default function Signup() {
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Password, setPassword] = useState("");
  const { auth } = useContext(FireBaseContext);
  const { db } = useContext(FireBaseContext);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({}); // To store validation errors

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validation checks
    const validationErrors = {};

    if (!userName) {
      validationErrors.userName = "Username is required";
    }

    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email is not valid";
    }

    if (!Phone) {
      validationErrors.Phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(Phone)) {
      validationErrors.Phone = "Phone number is not valid";
    }

    if (!Password) {
      validationErrors.Password = "Password is required";
    } else if (Password.length < 6) {
      validationErrors.Password = "Password must be at least 6 characters";
    }

    if (Object.keys(validationErrors).length === 0) {
      // If there are no validation errors, proceed with user creation
      createUserWithEmailAndPassword(auth, email, Password)
        .then((result) => {
          updateProfile(result.user, { displayName: userName }).then(() => {
            addDoc(collection(db, "users"), {
              id: result.user.uid,
              profileName: userName,
              phoneNumber: Phone,
            }).then(() => {
              navigate("/login");
            });
          });
        })
        .catch((error) => {
          // Handle any authentication errors here
          console.error("Authentication error:", error);
        });
    } else {
      // Update the state with validation errors
      setErrors(validationErrors);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            defaultValue="John"
          />
          <div className="error-message">{errors.userName}</div>
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            defaultValue="John"
          />
          <div className="error-message">{errors.email}</div>
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
            defaultValue="Doe"
          />
          <div className="error-message">{errors.Phone}</div>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            defaultValue="Doe"
          />
          <div className="error-message">{errors.Password}</div>
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={() => navigate("/login")}>Login</a>
      </div>
    </div>
  );
}
