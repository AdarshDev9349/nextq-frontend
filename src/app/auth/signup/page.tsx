'use client'

import Link from 'next/link'
import React, { useEffect,useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const [FormData,SetFormData]=useState({
    username: '',
    email: '',
    password: '',
  })
  const router = useRouter()

  const handlesubmit= (e:React.FormEvent  )=>{
    e.preventDefault()
    if(FormData.username && FormData.email && FormData.password){
      router.push('/auth/login')
      
     
    }
    else{
      alert("Please fill all fields")
    }
  }

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

        {/* Google Sign In */}
        <div className="mt-6">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-300 hover:text-black transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 256 262"
              className="h-4 w-4"
            >
              <path
                fill="#4285f4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              />
              <path
                fill="#34a853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              />
              <path
                fill="#fbbc05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
              />
              <path
                fill="#eb4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              />
            </svg>
            <span>Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <hr className="border border-dashed border-zinc-600" />
          <span className="text-xs text-zinc-400">Or continue with</span>
          <hr className="border border-dashed border-zinc-600" />
        </div>

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
              placeholder="yourusername"
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
            className="w-full rounded-md bg-zinc-600 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-300 hover:text-black transition"
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
