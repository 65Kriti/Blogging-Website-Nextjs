import { useState, useEffect } from 'react'
import Link from 'next/link'

function Header() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
      setTheme('dark')
      document.documentElement.classList.add('dark')
    } else {
      setTheme('light')
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
      document.documentElement.classList.add('dark')
    } else {
      setTheme('light')
      localStorage.setItem('theme', 'light')
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-800/50 py-3 transition-colors duration-300">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-5 md:px-8">
        <div className="flex items-center space-x-8">
          <Link href="/">
            <img
              className="w-16 h-16 cursor-pointer object-contain hover:scale-105 transition-all duration-300 dark:invert"
              src="/KS.svg"
              alt="Logo"
            />
          </Link>
          <nav className="hidden items-center space-x-6 md:inline-flex text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link href="/">
              <a className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 cursor-pointer">
                About
              </a>
            </Link>
            <Link href="/">
              <a className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 cursor-pointer">
                Contact
              </a>
            </Link>
            <span className="rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-4 py-1.5 text-xs font-semibold cursor-pointer hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition-all duration-300 shadow-sm">
              Follow
            </span>
          </nav>
        </div>

        <div className="flex items-center space-x-4 text-sm font-medium">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:scale-105 active:scale-95 transition-all duration-200 border border-slate-200/30 dark:border-slate-700/30"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <span className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors duration-200">
            Sign In
          </span>
          <span className="rounded-full bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white cursor-pointer hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-100 dark:hover:shadow-indigo-900/30 active:scale-95 transition-all duration-300">
            Get Started
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
