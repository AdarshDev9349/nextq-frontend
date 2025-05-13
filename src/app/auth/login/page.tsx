'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

const handleclick = async (e: React.FormEvent) => {
  e.preventDefault();
type User = {
  id: string;
  username: string;
  password: string;
};

  try {
    const res = await fetch('https://68238d0a65ba058033972501.mockapi.io/api/users');
    const users = await res.json();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const matchedUser = users.find(
      (user:User) =>
        user.username === formData.username && user.password === formData.password
    );

    if (matchedUser) {
      // ✅ Mock JWT
      const token = btoa(JSON.stringify({ id: matchedUser.id, username: matchedUser.username }));

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(matchedUser));
      window.location.href = '/profile'; // or use router.push('/profile')
    } else {
      alert('❌ Invalid credentials');
    }
  } catch (err) {
    alert('Something went wrong. Please try again.');
    console.error(err);
  }
};



  return (
    <section className="flex min-h bg-background px-4 py-24  md:py-14 dark:bg-black">
      <form className="max-w-md m-auto w-full bg-black shadow-lg rounded-2xl p-6 md:p-8">
        <div className="text-start">
          <Link href="/" aria-label="go home">
            <div className="text-2xl font-bold text-white">NextQ</div>
          </Link>
          <h1 className="mt-4 text-xl font-semibold text-white">Sign In to NextQ</h1>
          <p className="text-sm text-zinc-400">Welcome back! Sign in to continue</p>
        </div>

        <div className="mt-6">
          <div className="space-y-6">
            <div className="space-y-1.5">
              <label htmlFor="username" className="block text-sm font-medium text-zinc-300">
                Username
              </label>
              <input
                type="text"
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                name="username"
                id="username"
                required
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="yourusername"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                Password
              </label>
              <input
                type="password"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                name="password"
                id="password"
                required
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
              onClick={(e) => {handleclick(e)}}
            >
              Sign In
            </button>
          </div>
        </div>

        <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <hr className="border border-dashed border-zinc-600" />
          <span className="text-xs text-zinc-400">Or continue with</span>
          <hr className="border border-dashed border-zinc-600" />
        </div>

        <div>
          <button
            type="button"
            className="flex items-center justify-center w-full gap-2 rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262">
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

        <div className="p-3">
          <p className="text-center text-sm text-zinc-400">
           Don&apos;t have an account?
            <Link href="/auth/signup" className="text-blue-600 hover:underline ml-1">Create account</Link>
          </p>
        </div>
      </form>
    </section>
  )
}
