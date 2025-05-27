'use client'

import Link from 'next/link'
import React, {useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const [FormData,SetFormData]=useState({
    username: '',
    email: '',
    password: '',
  })
  const router = useRouter()

const handlesubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { username, email, password } = FormData;

  if (!username || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await fetch('https://68238d0a65ba058033972501.mockapi.io/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to create user');
    }

    alert('✅ Account created successfully!');
    router.push('/auth/login');
  } catch (err) {
    console.error(err);
    alert('Something went wrong. Please try again.');
  }
};


  return (
    <section className="flex min-h-screen items-center justify-center bg-background px-4 ">
      <form className="w-full max-w-md rounded-2xl bg-black p-6 shadow-xl">
        {/* Logo + Headings */}
        <div>
          <Link href="/" aria-label="go home">
            <div className="text-2xl font-bold text-white">NextQ</div>
          </Link>
          <h1 className="mt-4 text-xl font-semibold text-white">
            Create a NextQ Account
          </h1>
          <p className="text-sm text-zinc-400">
            Welcome! Create an account to get started
          </p>
        </div>

       

     <br />

        {/* Fields */}
        <div className="space-y-5">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-zinc-300"
            >
              Username
            </label>
            <input
              type="text"
              onChange={(e) => SetFormData({ ...FormData, username: e.target.value })}
              name="username"
              id="username"
              required
              className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your username"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-300"
            >
              Email
            </label>
            <input
              type="email"
              onChange={(e) => SetFormData({ ...FormData, email: e.target.value })}
              name="email"
              id="email"
              required
              className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-300"
            >
              Password
            </label>
            <input
              type="password"
              onChange={(e) => SetFormData({ ...FormData, password: e.target.value })}
              name="password"
              id="password"
              required
              className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={(e)=> handlesubmit(e)}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-zinc-400">
          Have an account?
          <Link href="/auth/login" className="ml-1 text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </section>
  )
}
