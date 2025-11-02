import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-950 to-black text-white">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-white">404</h1>
        <h2 className="text-2xl font-semibold text-zinc-300">Page Not Found</h2>
        <p className="text-zinc-400 max-w-md">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
