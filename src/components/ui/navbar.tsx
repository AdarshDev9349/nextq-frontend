"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", link: "#" },
  { name: "FAQ", link: "#faq" },
  { name: "Contact", link: "#contact" },
  { name: "About", link: "#about" },
];

const NavbarDemo = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUsername(parsed.username);
      } catch (e) {
        console.error("Invalid user JSON in localStorage");
      }
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <motion.nav
        className={`fixed top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl px-6 py-3 rounded-3xl backdrop-blur-lg z-50 border border-white/10 transition-colors ${
          scrolled
            ? "bg-[oklch(0.2_0_0/0.8)] shadow-xl"
            : "bg-[oklch(0.2_0_0/0.5)]"
        }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between text-white">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src="https://assets.aceternity.com/logo-dark.png"
              alt="logo"
              className="h-8 w-8"
              animate={{ rotate: scrolled ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            />
            <span className="text-xl font-bold">NextQ</span>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item, idx) => (
              <motion.a
                key={item.name}
                href={item.link}
                className="relative px-3 py-2 text-sm font-medium group"
                onMouseEnter={() => setActiveItem(idx)}
                onMouseLeave={() => setActiveItem(null)}
                whileHover={{ y: -2 }}
              >
                {item.name}
                <motion.span
                  className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-500 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeItem === idx ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {username ? (
              <>
                <span className="text-sm text-zinc-300">
                  Welcome,{" "}
                  <span className="font-semibold text-white">{username}</span>
                </span>
                <button
                  className="ml-4 text-zinc-300 hover:text-white transition duration-300 ease-in"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");

                    router.push("/auth/login");
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-white hover:text-blue-500 transition"
                  onClick={() => router.push("/auth/login")}
                >
                  Login
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-500 text-white transition"
                  onClick={() => router.push("/auth/signup")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="text-white focus:outline-none"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Bars3Icon className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm pt-24 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[oklch(0.2_0_0)] p-6 rounded-2xl border border-white/10 space-y-6"
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              exit={{ y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {navItems.map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.link}
                  className="block text-white text-lg font-medium"
                  whileHover={{ x: 4, color: "#3b82f6" }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}

              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                {username ? (
                  <>
                    <span className="text-white text-center">
                      welcome, <strong>{username}</strong>
                    </span>
                    <button
                      className="ml-4 text-zinc-300 hover:text-white transition duration-300 ease-in"
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");

                        router.push("/auth/login");
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="default"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Button>
                    <Button
                      className="bg-blue-600 text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarDemo;
