"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "../../context/StoreContext";
import { C } from "../../lib/data";

export default function SignupPage() {
  const { setUser } = useStore();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate signup by automatically logging them in and redirecting
    setUser({ email, name: firstName, phone: "+91 90000 00000" });
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col justify-center py-12 sm:px-6 lg:px-8" style={{ fontFamily: "Inter, sans-serif" }}>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block text-3xl tracking-widest uppercase mb-6 hover:opacity-70 transition-opacity" style={{ fontFamily: "Fraunces, serif", color: C.ink }}>
          AAVARAN
        </Link>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: "Fraunces, serif" }}>
          Create an Account
        </h2>
        <p className="text-sm text-gray-500 tracking-widest uppercase mb-8">
          Join us for an elevated experience
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 border border-gray-100">
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input 
                  type="text" 
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="peer w-full border-b border-gray-300 py-2 placeholder-transparent focus:outline-none focus:border-black transition-colors bg-transparent text-sm"
                  placeholder="First Name"
                />
                <label 
                  htmlFor="firstName"
                  className="absolute left-0 -top-3.5 text-xs text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black"
                >
                  First Name
                </label>
              </div>

              <div className="relative">
                <input 
                  type="text" 
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="peer w-full border-b border-gray-300 py-2 placeholder-transparent focus:outline-none focus:border-black transition-colors bg-transparent text-sm"
                  placeholder="Last Name"
                />
                <label 
                  htmlFor="lastName"
                  className="absolute left-0 -top-3.5 text-xs text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black"
                >
                  Last Name
                </label>
              </div>
            </div>

            <div className="relative">
              <input 
                type="email" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="peer w-full border-b border-gray-300 py-2 placeholder-transparent focus:outline-none focus:border-black transition-colors bg-transparent text-sm"
                placeholder="Email Address"
              />
              <label 
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-xs text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black"
              >
                Email Address
              </label>
            </div>

            <div className="relative">
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="peer w-full border-b border-gray-300 py-2 placeholder-transparent focus:outline-none focus:border-black transition-colors bg-transparent text-sm"
                placeholder="Password"
              />
              <label 
                htmlFor="password"
                className="absolute left-0 -top-3.5 text-xs text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black"
              >
                Password
              </label>
            </div>

            <div>
              <button 
                type="submit" 
                className="w-full flex justify-center py-4 px-4 border border-transparent shadow-sm text-xs font-semibold tracking-widest uppercase text-white bg-black hover:bg-black/90 transition-colors"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button 
                onClick={() => {
                  // We could trigger the LoginModal here, or just redirect home
                  router.push("/");
                }}
                className="text-xs text-black border-b border-black pb-0.5 hover:opacity-70 transition-opacity uppercase tracking-widest"
              >
                Sign in instead
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
