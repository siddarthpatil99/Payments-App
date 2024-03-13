import React from 'react'
import { Link } from 'react-router-dom';

const Signin = () => {
  return (
    <section className="h-screen w-full bg-[#161616] flex items-center justify-center">
      <div className="bg-slate-50 w-[350px] md:w-[380px] h-[500px] rounded-md py-4 px-8 border border-slate-300">
        <div className="text-center text-3xl font-extrabold">Sign In</div>
        <p className="text-center text-base text-gray-600 pt-3 font-medium">
          Enter your credentials to access your account
        </p>
        <div className="flex flex-col gap-y-6 pt-8">
          <div className="flex flex-col gap-y-3">
            <label for="email" className="text-sm font-bold">
              Email
            </label>
            <input
              type="text"
              placeholder="johndoe@gmail.com"
              className="p-2 border border-slate-300"
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label for="password" className="text-sm font-bold">
              Password
            </label>
            <input type="password" className="p-2 border border-slate-300" />
          </div>
          <button className="bg-black text-white p-2 rounded-md w-full">
            Sign In
          </button>
          <div className="flex gap-4">
            <p className="text-center font-semibold">Don't have an account?</p>
            <Link className="underline" to="/signup">Sign Up</Link>
            {/* <span className="underline text-center">Sign Up?</span> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signin
