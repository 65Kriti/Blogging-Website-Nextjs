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
          <nav className="hidden items-center space-x-4 md:inline-flex text-sm font-medium text-slate-600 dark:text-slate-300">
            <a
              href="https://www.instagram.com/kriti_effect"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2 text-xs font-bold transition-all duration-300 shadow-sm hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="https://www.linkedin.com/in/kriti-singh-47b281217"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2 text-xs font-bold transition-all duration-300 shadow-sm hover:bg-[#0077b5] hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LinkedIn</span>
            </a>
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
        </div>
      </div>
    </header>
  )
}

export default Header
