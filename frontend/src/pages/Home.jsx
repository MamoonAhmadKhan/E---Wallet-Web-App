import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col">
      <header className="w-full flex justify-between items-center shadow px-4 sm:px-14 py-4 bg-slate-900">
        <div className="text-xl sm:text-2xl font-bold text-white">
          Mamoon's E-Wallet
        </div>
        <div className="flex justify-between items-center gap-2">
          <button
            onClick={() => navigate("/signup")}
            className="rounded-md bg-slate-700 hover:bg-slate-900 text-white border border-slate-700 py-2 font-medium px-5 hover:cursor-pointer focus:outline-none"
          >
            Signup
          </button>
          <button
            onClick={() => navigate("/signin")}
            className="rounded-md bg-slate-700 hover:bg-slate-900 text-white border border-slate-700 py-2 font-medium px-5 hover:cursor-pointer focus:outline-none"
          >
            Signin
          </button>
        </div>
      </header>
      <main className="flex-grow bg-slate-800 flex flex-col justify-center items-center text-center px-4">
        <h1 className="font-extrabold text-3xl mb-2 text-white">
          Welcome to Mamoon's E-Wallet App
        </h1>
        <p className="text-lg mb-4 text-fuchsia-500 italic">
          A safe and secure way to transfer your hard-earned money.
        </p>
        <p className="text-base mb-4 text-rose-500 italic">
          With our app, you can easily manage your finances, track your
          spending, and make transactions with just a few clicks.
        </p>
        <p className="text-base mb-4 text-pink-500 italic">
          You can manage your transactions without having bank account.
          All your payments in  one place.
        </p>
      </main>
      <footer className="w-full bg-slate-900 py-4 flex justify-center items-center shadow-inner">
        <div className="text-sm text-white">
          © 2024 Mamoon's E-Wallet App. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
