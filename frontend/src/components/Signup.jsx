import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({
    type: "invisible-msg",
    data: "Dummy msg",
  });

  function handleInput(event) {
    setUserDetails((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(userDetails);

    fetch("http://localhost:8000/api/v1/user/signup", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section className="h-screen w-full bg-[#161616] flex items-center justify-center">
      <form
        // contentEditable="true"
        onSubmit={handleSubmit}
        className="bg-slate-50 w-[350px] md:w-[380px] h-[600px] rounded-md py-4 px-8 border border-slate-300"
      >
        <div className="text-center text-3xl font-extrabold">Sign Up</div>
        <p className="text-center text-base text-gray-600 pt-3 font-medium">
          Enter your information to create an account
        </p>
        <div className="flex flex-col gap-y-4 pt-8">
          <div className="flex flex-col gap-y-2">
            <label for="name" className="text-sm font-bold">
              Full Name
            </label>
            <input
              type="text"
              required
              name="name"
              placeholder="John Doe"
              onChange={handleInput}
              value={userDetails.name}
              className="border border-slate-300 p-2"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label for="email" className="text-sm font-bold">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              placeholder="johndoe@gmail.com"
              onChange={handleInput}
              value={userDetails.email}
              className="border border-slate-300 p-2"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label for="password" className="text-sm font-bold">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              minLength={5}
              onChange={handleInput}
              value={userDetails.password}
              className="border border-slate-300 p-2"
            />
          </div>
          <button className="w-full bg-black text-white rounded-md p-2">
            Sign Up
          </button>
          <div className="flex gap-4">
            <p className="text-center font-semibold">
              Already have an account?
            </p>
            {/* <span className="underline text-center">
            <a href="/signin">Login</a>
          </span> */}
            <Link className="underline" to="/signin">
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Signup;
