'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const router = useRouter()

const handleclick = async (e: React.FormEvent) => {
  e.preventDefault();
  // Only fetch the user that matches the username (if your mock API supports filtering)
  try {
    // Define User type inline for filtering
    type User = { id: string; username: string; password: string };
    const res = await fetch(`https://68238d0a65ba058033972501.mockapi.io/api/users?username=${encodeURIComponent(formData.username)}`);
    const users: User[] = await res.json();
    const matchedUser = users.find(
      (user) =>
        user.username === formData.username && user.password === formData.password
    );

    if (matchedUser) {
      const token = btoa(JSON.stringify({ id: matchedUser.id, username: matchedUser.username }));

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ id: matchedUser.id, username: matchedUser.username }));
      router.push('/features')
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

<br />
  

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
